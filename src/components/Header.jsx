import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { links } from "../utils/links";
import { useCart } from "../context/useCart";

const Header = () => {
  const { totalUnidades } = useCart();

  return (
    <header className="flex justify-between items-center px-8 py-6 mb-6 text-lg border-b-2 border-foreground">
      <Link to="/" className="font-bold text-xl text-accents">
        🍃 PlantCo.
      </Link>
      <nav className="flex gap-10   ">
        {links.map((l, i) => (
          <Link key={i} to={l.url} className="">
            {l.name}
          </Link>
        ))}
      </nav>
      <div>
        <Link
          to="/carrito"
          className="relative"
          aria-label={`Carrito, ${totalUnidades} unidades`}
        >
          <ShoppingCart />
          {totalUnidades > 0 && (
            <span className="absolute -right-2 -top-2 rounded-full bg-accents px-1.5 text-xs text-white">
              {totalUnidades}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
