import React from "react";
import { Link } from "react-router-dom";
import { URL_API } from "../utils/URL_API";
import { ShoppingCart, ShoppingCartPlus } from "lucide-react";

const ProductCard = ({ p }) => {
  console.log(p);

  return (
    <Link
      to={`/productos/${p.id}`}
      className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-[380px] max-h-[400px] md:max-h-[490px] bg-slate-50 border-1 hover:ring-2 hover:ring-accents p-4 relative flex flex-col justify-between"
    >
      <div className=" flex flex-col">
        <div className="absolute right-4 flex gap-2">
          {p.tags.map((t, i) => (
            <p key={i} className="bg-accents text-white font-bold px-2 py-0.5">
              {t.title}
            </p>
          ))}
        </div>
        <img
          src={`${URL_API}/${p.pictures?.[0]}`}
          alt={p.title}
          className="w-100 m-auto mb-2"
        />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-foreground">{p.title}</h2>
        </div>
        <div className="flex flex-col justify-between items-stretch"></div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-2xl font-bold">${p.price}</p>
        <div className="flex items-center gap-1">
          <button
            className="p-2 bg-accents"
            onClick={() => console.log("Carrito", p.id)}
          >
            <ShoppingCartPlus className="text-white" size={20} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
