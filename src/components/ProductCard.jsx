import { Link } from "react-router-dom";
import { ShoppingCartPlus } from "lucide-react";
import { useCart } from "../context/useCart";

const ProductCard = ({ p }) => {
  const { addToCart } = useCart();
  const picture = p.pictures?.[0];
  const imageSrc =
    picture && !/^https?:\/\//i.test(picture)
      ? picture.startsWith("/")
        ? picture
        : `/${picture}`
      : "/hero-img.png";

  return (
    <article className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-95 max-h-122.5 bg-slate-50 border hover:ring-2 hover:ring-accents p-4 relative flex flex-col justify-between">
      <Link to={`/productos/${p.id}`} className="flex flex-col">
        <div className="absolute right-4 flex gap-2">
          {p.tags?.map((t, i) => (
            <p key={i} className="bg-accents text-white font-bold px-2 py-0.5">
              {t.title}
            </p>
          ))}
        </div>
        <img
          src={imageSrc}
          alt={p.title}
          className="w-100 m-auto mb-2"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/hero-img.png";
          }}
        />
        <h2 className="text-xl font-bold text-foreground">{p.title}</h2>
        {p.category?.title && (
          <p className="text-sm text-gray-600">{p.category.title}</p>
        )}
        <p className="text-2xl font-bold">${p.price}</p>
      </Link>
      <div className="flex justify-between items-center mt-4">
        <button
          type="button"
          className="p-2 bg-accents"
          aria-label={`Agregar ${p.title} al carrito`}
          onClick={() => addToCart(p)}
        >
          <ShoppingCartPlus className="text-white" size={20} />
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
