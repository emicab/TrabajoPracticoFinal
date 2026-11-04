class ApiError extends Error {}

export async function apiGet(url, options = {}) {
  let response;

  try {
    response = await fetch(url, options);
  } catch (error) {
    throw new Error(
      "No se pudo conectar con el servidor. Revisá tu conexión a internet e intentá de nuevo.",
      { cause: error },
    );
  }

  if (response.status === 401 || response.status === 403) {
    throw new ApiError("No tenés permiso para ver esta información.");
  }

  if (response.status === 404) {
    throw new ApiError("No encontramos lo que buscás.");
  }

  if (!response.ok) {
    throw new ApiError(
      `No se pudo cargar la información (error del servidor ${response.status}). Intentá de nuevo.`,
    );
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error(
      "El servidor devolvió una respuesta inválida. Intentá de nuevo.",
      { cause: error },
    );
  }
}
