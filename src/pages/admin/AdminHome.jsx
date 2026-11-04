import { Link } from "react-router-dom";

const AdminHome = () => (
  <div>
    <h2 className="mb-3 text-3xl font-bold">Panel de administración</h2>
    <p className="mb-6">Elegí un módulo para administrar la tienda.</p>
    <div className="flex flex-wrap gap-3">
      <Link className="bg-accents px-4 py-2 font-bold text-white" to="productos">
        Productos
      </Link>
      <Link className="bg-accents px-4 py-2 font-bold text-white" to="categorias">
        Categorías
      </Link>
      <Link className="bg-accents px-4 py-2 font-bold text-white" to="tags">
        Tags
      </Link>
    </div>
  </div>
);

export default AdminHome;
