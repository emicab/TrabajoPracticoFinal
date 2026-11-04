import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { getCategories } from "../services/categoryService";
import { getProductById } from "../services/productService";

const ProductDetail = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    let active = true;

    Promise.all([getProductById(id), getCategories()])
      .then(([data, categories]) => {
        if (active) {
          setResult({
            id,
            product: data,
            category:
              categories.find(
                (item) => Number(item.id) === Number(data?.category_id),
              ) ?? null,
          });
        }
      })
      .catch((err) => {
        if (active) {
          setResult({
            id,
            error: err.message || "No se pudo cargar el producto.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (!result || result.id !== id) return <Loader />;
  if (result.error) return <ErrorMessage message={result.error} />;

  const { product, category } = result;

  if (!product) {
    return (
      <main className="my-8 flex flex-col items-center gap-6">
        <p className="text-center">No se encontró el producto.</p>
        <Link
          to="/productos"
          className="bg-accents px-4 py-2 font-bold text-white hover:bg-accents-hover"
        >
          Volver al catálogo
        </Link>
      </main>
    );
  }

  const picture = product.pictures?.[0];
  const imageSrc =
    picture && !/^https?:\/\//i.test(picture)
      ? picture.startsWith("/")
        ? picture
        : `/${picture}`
      : "/hero-img.png";

  return (
    <main className="mx-auto my-8 grid max-w-6xl gap-8 px-4 md:grid-cols-2">
      <img
        src={imageSrc}
        alt={product.title}
        className="max-h-150 w-full object-contain"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = "/hero-img.png";
        }}
      />
      <section className="flex flex-col items-start gap-5">
        <h1 className="text-4xl font-bold text-foreground">{product.title}</h1>
        <p className="text-2xl font-bold">${product.price}</p>
        <p className="text-lg text-gray-700">
          {product.description || "No hay una descripción disponible."}
        </p>
        <p>
          <span className="font-bold">Categoría:</span>{" "}
          {category?.title ?? "Sin categoría"}
        </p>
        <div>
          <h2 className="mb-2 font-bold">Tags</h2>
          {product.tags?.length ? (
            <ul className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <li
                  key={`${tag.title}-${index}`}
                  className="bg-accents px-2 py-1 font-bold text-white"
                >
                  {tag.title}
                </li>
              ))}
            </ul>
          ) : (
            <p>Sin tags</p>
          )}
        </div>
        <div>
          <h2 className="mb-2 font-bold">Instrucciones de cuidado</h2>
          {product.care_instructions?.length ? (
            <ul className="list-disc space-y-1 pl-5">
              {product.care_instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          ) : (
            <p>No hay instrucciones de cuidado disponibles.</p>
          )}
        </div>
        <Link
          to="/productos"
          className="mt-2 bg-accents px-4 py-2 font-bold text-white hover:bg-accents-hover"
        >
          Volver al catálogo
        </Link>
      </section>
    </main>
  );
};

export default ProductDetail;
