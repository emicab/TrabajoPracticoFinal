import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoria = searchParams.get("categoria") ?? "";
  const query = searchParams.get("q")?.trim().toLocaleLowerCase() ?? "";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const cargarProductos = async () => {
      try {
        const [products, categories] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        if (active) {
          setProductos(products);
          setCategorias(categories);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "No se pudieron cargar productos y categorías.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    cargarProductos();

    return () => {
      active = false;
    };
  }, []);

  const productosFiltrados = productos.filter(
    (producto) =>
      (categoria === "" ||
        Number(producto.category_id) === Number(categoria)) &&
      (query === "" ||
        `${producto.title} ${producto.description ?? ""}`
          .toLocaleLowerCase()
          .includes(query)),
  );

  return (
    <main className="flex flex-col items-center justify-center my-8">
      <h1 className="text-4xl font-bold uppercase mb-6">Catálogo</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : productos.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-3 font-semibold">
              Categoría
              <select
                value={categoria}
                onChange={(event) => {
                  const nextParams = new URLSearchParams(searchParams);
                  if (event.target.value) {
                    nextParams.set("categoria", event.target.value);
                  } else {
                    nextParams.delete("categoria");
                  }
                  setSearchParams(nextParams);
                }}
                className="border border-gray-300 bg-white px-3 py-2"
              >
                <option value="">Todas</option>
                {categorias.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>
            {query && (
              <p role="status">
                Resultados para: <strong>{searchParams.get("q")}</strong>
              </p>
            )}
          </div>
          {productosFiltrados.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-4 gap-4">
              {productosFiltrados.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Productos;
