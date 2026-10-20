import { ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { links } from "../utils/links";

const Header = () => {
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
        <Link to={"/checkout"}>
          <ShoppingCart />
        </Link>
      </div>
    </header>
  );
};

export default Header;
