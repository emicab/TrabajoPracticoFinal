import { URL_API } from "../utils/URL_API";
import { getHeaders } from "./getHeaders";

export const getFeaturedProducts = async () => {
  try {
    const response = await fetch(`${URL_API}/products`, {
      method: "GET",
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error("No se pudo modificar el producto.");
    }
    const data = await response.json();
    console.log(data);
    return data.filter((p) =>
      p.tags?.some((tag) =>
        ["destacado", "nuevo"].includes(tag.title.toLowerCase()),
      ),
    );
  } catch (e) {
    console.log("Error", e);
  }
};
