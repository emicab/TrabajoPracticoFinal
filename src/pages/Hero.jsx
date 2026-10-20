import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "../lib/fetch";
import ProductCard from "../components/ProductCard";

const Hero = () => {
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getFeaturedProducts()
      .then((data) => {
        if (data) {
          setProductosDestacados(data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  console.log(productosDestacados);

  return (
    <>
      <section className="flex px-4 lg:max-h-[500px]">
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
        {!loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-4 gap-4">
            {productosDestacados.map((pd, i) => (
              <ProductCard key={i} p={pd} />
            ))}
          </div>
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
    </>
  );
};

export default Hero;
