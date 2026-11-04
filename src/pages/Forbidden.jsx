import { Link } from "react-router-dom";

const Forbidden = () => (
  <main className="my-12 flex flex-col items-center gap-4 text-center">
    <h1 className="text-4xl font-bold text-foreground">403 - Acceso denegado</h1>
    <p>Tu cuenta no tiene permisos para acceder al panel de administración.</p>
    <Link
      to="/"
      className="bg-accents px-4 py-2 font-bold text-white hover:bg-accents-hover"
    >
      Volver al inicio
    </Link>
  </main>
);

export default Forbidden;
