import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/productos?q=${encodeURIComponent(searchText.trim())}`);
  };

  useEffect(() => {
    let activo = true;

    getProducts()
      .then((data) => {
        if (activo) {
          setProductosDestacados(
            data.filter((product) =>
              product.tags?.some((tag) => tag.title === "Destacado"),
            ),
          );
        }
      })
      .catch((err) => {
        if (activo) {
          setError(err.message || "No se pudieron cargar los productos destacados.");
        }
      })
      .finally(() => {
        if (activo) {
          setLoading(false);
        }
      });

    return () => {
      activo = false;
    };
  }, []);

  return (
    <>
      <section className="flex px-4 lg:max-h-125">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col mb-6">
            <h1 className="text-6xl font-bold text-foreground mb-4">
              VEGETACIÓN ARQUITECTÓNICA PARA ESPACIOS MODERNOS
            </h1>
            <p className="text-2xl text-gray-700">
              Plantas estructurales y minimalistas seleccionadas por su
              integridad visual y facilidad de mantenimiento. Eleva tus entornos
              con diseños vivos.
            </p>
          </div>
          <Link
            to={"/productos"}
            className="px-4 py-2 uppercase max-w-60 bg-accents text-white font-bold text-center focus:outline-foreground hover:bg-accents-hover"
          >
            Comprar Ahora
          </Link>
          <form onSubmit={handleSearch} className="mt-4 flex max-w-lg gap-2">
            <label className="sr-only" htmlFor="home-product-search">
              Buscar productos
            </label>
            <input
              id="home-product-search"
              type="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Buscar productos"
              className="min-w-0 flex-1 border border-gray-300 bg-white px-3 py-2"
            />
            <button
              type="submit"
              className="bg-accents px-4 py-2 font-bold text-white hover:bg-accents-hover"
            >
              Buscar
            </button>
          </form>
        </div>
        <img
          src="/hero-img.png"
          className="w-4/6 object-cover"
          alt="Diseño de interiores moderno decorado con plantas verdes colgantes y de repisa"
        />
      </section>
      <aside className="flex flex-col mt-8 mx-4 px-4 py-4 bg-gray-200 text-accents">
        <h2 className="text-xl font-bold italic text-accents mb-2">
          ¡Envío gratis en compras mayores a $15.000!
        </h2>
        <p className="text-gray-700 m-0">
          Entregamos tus plantas con el máximo cuidado directamente en la puerta
          de tu hogar o lugar de trabajo.
        </p>
      </aside>
      <div className="flex flex-col items-center justify-center my-8">
        <h2 className="text-4xl font-bold uppercase mb-6">
          Productos Destacados
        </h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : productosDestacados.length === 0 ? (
          <p className="text-center">No hay productos destacados para mostrar.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-4 gap-4">
            {productosDestacados.map((producto) => (
              <ProductCard key={producto.id} p={producto} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
