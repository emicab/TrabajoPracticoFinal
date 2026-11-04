import {
  getLocalCategories,
  getLocalProducts,
  getLocalTags,
  saveLocalCategories,
  saveLocalProducts,
  saveLocalTags,
} from "./localStore";

export const assertAdmin = (user) => {
  if (user?.role !== "admin") {
    throw new Error("No tenés permisos para realizar esta operación.");
  }
};

const validateTitle = (title, items, currentId = null) => {
  const normalizedTitle = typeof title === "string" ? title.trim() : "";
  if (!normalizedTitle) {
    throw new Error("El título es obligatorio.");
  }
  if (
    items.some(
      (item) =>
        Number(item.id) !== Number(currentId) &&
        item.title.trim().toLocaleLowerCase() ===
          normalizedTitle.toLocaleLowerCase(),
    )
  ) {
    throw new Error("Ya existe un elemento con ese título.");
  }
  return normalizedTitle;
};

export const getAdminProducts = async (user) => {
  assertAdmin(user);
  return getLocalProducts();
};

export const getAdminCategories = async (user) => {
  assertAdmin(user);
  return getLocalCategories();
};

export const getAdminTags = async (user) => {
  assertAdmin(user);
  const tags = await getLocalTags();
  return tags.sort((a, b) => a.title.localeCompare(b.title));
};

export const createCategory = async (user, values) => {
  assertAdmin(user);
  const categories = await getLocalCategories();
  const title = validateTitle(values.title, categories);
  const category = {
    id: Math.max(0, ...categories.map((item) => Number(item.id) || 0)) + 1,
    title,
    description: (values.description ?? "").trim(),
    image: (values.image ?? "").trim(),
  };
  await saveLocalCategories([...categories, category]);
  return category;
};

export const updateCategory = async (user, id, values) => {
  assertAdmin(user);
  const [categories, products] = await Promise.all([
    getLocalCategories(),
    getLocalProducts(),
  ]);
  const existing = categories.find((item) => Number(item.id) === Number(id));
  if (!existing) throw new Error("No se encontró la categoría.");

  const category = {
    ...existing,
    title: validateTitle(values.title, categories, existing.id),
    description: (values.description ?? "").trim(),
    image: (values.image ?? "").trim(),
  };
  await saveLocalCategories(
    categories.map((item) => (item.id === existing.id ? category : item)),
  );
  await saveLocalProducts(
    products.map((product) =>
      Number(product.category_id) === Number(existing.id)
        ? { ...product, category }
        : product,
    ),
  );
  return category;
};

export const createTag = async (user, values) => {
  assertAdmin(user);
  const tags = await getLocalTags();
  const title = validateTitle(values.title, tags);
  const tag = {
    id: Math.max(0, ...tags.map((item) => Number(item.id) || 0)) + 1,
    title,
  };
  await saveLocalTags([...tags, tag]);
  return tag;
};

export const updateTag = async (user, id, values) => {
  assertAdmin(user);
  const [tags, products] = await Promise.all([
    getLocalTags(),
    getLocalProducts(),
  ]);
  const existing = tags.find((tag) => Number(tag.id) === Number(id));
  if (!existing) throw new Error("No se encontró el tag.");
  const tag = {
    ...existing,
    title: validateTitle(values.title, tags, existing.id),
  };
  await saveLocalTags(
    tags.map((item) => (Number(item.id) === Number(existing.id) ? tag : item)),
  );
  await saveLocalProducts(
    products.map((product) => ({
      ...product,
      tags: product.tags.map((item) =>
        Number(item.id) === Number(existing.id) ? tag : item,
      ),
    })),
  );
  return tag;
};

export const deleteTag = async (user, id) => {
  assertAdmin(user);
  const [tags, products] = await Promise.all([
    getLocalTags(),
    getLocalProducts(),
  ]);
  if (!tags.some((tag) => Number(tag.id) === Number(id))) {
    throw new Error("No se encontró el tag.");
  }

  await saveLocalTags(
    tags.filter((tag) => Number(tag.id) !== Number(id)),
  );
  await saveLocalProducts(
    products.map((product) => ({
      ...product,
      tags: product.tags.filter((tag) => Number(tag.id) !== Number(id)),
    })),
  );
};
