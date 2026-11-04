import { getLocalCategories } from "./localStore";

export const getCategories = async () => {
  return getLocalCategories();
};
