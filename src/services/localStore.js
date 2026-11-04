import { apiGet } from "./apiClient";

const PRODUCTS_KEY = "plantco-products";
const CATEGORIES_KEY = "plantco-categories";
const TAGS_KEY = "plantco-tags";

const readStoredArray = (key) => {
  const value = localStorage.getItem(key);
  if (value === null) return null;

  const data = JSON.parse(value);
  if (!Array.isArray(data)) {
    throw new Error("Los datos guardados localmente no tienen un formato válido.");
  }

  return data;
};

const storeArray = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const normalizeProductTags = (products) => {
  const tagIds = new Map();
  let nextId = 1;

  return products.map((product) => ({
    ...product,
    tags: (product.tags ?? []).map((tag) => {
      const title = typeof tag === "string" ? tag : tag.title;
      if (!title) return null;

      let id = typeof tag === "object" ? tag.id : null;
      if (id == null) {
        if (!tagIds.has(title)) tagIds.set(title, nextId++);
        id = tagIds.get(title);
      } else {
        tagIds.set(title, id);
      }

      return { id, title };
    }).filter(Boolean),
  }));
};

export const getLocalProducts = async () => {
  const stored = readStoredArray(PRODUCTS_KEY);
  let products;
  if (stored) {
    products = normalizeProductTags(stored);
    if (JSON.stringify(products) !== JSON.stringify(stored)) {
      storeArray(PRODUCTS_KEY, products);
    }
  } else {
    const fetchedProducts = await apiGet("/api-fake.json");
    if (!Array.isArray(fetchedProducts)) {
      throw new Error("La respuesta de productos no es válida.");
    }

    products = normalizeProductTags(fetchedProducts);
    storeArray(PRODUCTS_KEY, products);
  }

  const categories = await getLocalCategories();
  const categoriesById = new Map(
    categories.map((category) => [Number(category.id), category]),
  );
  return products.map((product) => ({
    ...product,
    category: categoriesById.get(Number(product.category_id)) ?? null,
  }));
};

export const getLocalCategories = async () => {
  const stored = readStoredArray(CATEGORIES_KEY);
  if (stored) return stored;

  const categories = await apiGet("/categories-fake.json");
  if (!Array.isArray(categories)) {
    throw new Error("La respuesta de categorías no es válida.");
  }

  storeArray(CATEGORIES_KEY, categories);
  return categories;
};

export const getLocalTags = async () => {
  const stored = readStoredArray(TAGS_KEY);
  if (stored) return stored;

  const products = await getLocalProducts();
  const tags = [
    ...new Map(
      products.flatMap((product) => product.tags).map((tag) => [tag.id, tag]),
    ).values(),
  ];
  storeArray(TAGS_KEY, tags);
  return tags;
};

export const saveLocalProducts = (products) => storeArray(PRODUCTS_KEY, products);
export const saveLocalCategories = (categories) =>
  storeArray(CATEGORIES_KEY, categories);
export const saveLocalTags = (tags) => storeArray(TAGS_KEY, tags);
