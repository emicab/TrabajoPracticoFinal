import React from "react";
import { Link } from "react-router-dom";
import { links } from "../utils/links";
import { Link as Link2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="flex flex-col mt-6 justify-evenly items-center w-full h-60 bg-foreground text-white">
      <h2 className="text-4xl font-bold text-accents mb-2">PlantCo.</h2>
      <nav className="flex flex-col gap-1">
        <p className="text-xl text-center mb-1">Navegación</p>
        <div className="flex gap-4">
          {links.map((l, i) => (
            <div key={i} className="flex items-center gap-1">
              <Link2 size={12} />
              <Link to={l.url} className="text-lg">
                {l.name}
              </Link>
            </div>
          ))}
        </div>
      </nav>
      <p className="text-base">© 2026 PlantCo.</p>
    </footer>
  );
};

export default Footer;
