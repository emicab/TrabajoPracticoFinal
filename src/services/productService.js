import { getLocalProducts } from "./localStore";

export const getProducts = async () => {
  return getLocalProducts();
};

export const getProductById = async (id) => {
  const products = await getProducts();
  return products.find((product) => product.id === Number(id)) ?? null;
};
