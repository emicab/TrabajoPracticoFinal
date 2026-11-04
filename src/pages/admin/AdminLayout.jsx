import { NavLink, Outlet } from "react-router-dom";

const menuItems = [
  { to: "/admin", label: "Inicio", end: true },
  { to: "/admin/productos", label: "Productos" },
  { to: "/admin/categorias", label: "Categorías" },
  { to: "/admin/tags", label: "Tags" },
];

const AdminLayout = () => (
  <main className="mx-auto my-8 flex max-w-7xl flex-col gap-8 px-4 md:flex-row">
    <aside className="md:w-56 md:shrink-0">
      <h1 className="mb-4 text-2xl font-bold">Administración</h1>
      <nav className="flex flex-wrap gap-2 md:flex-col">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `px-3 py-2 font-semibold ${
                isActive
                  ? "bg-accents text-white"
                  : "bg-gray-100 text-foreground hover:bg-gray-200"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
    <section className="min-w-0 flex-1">
      <Outlet />
    </section>
  </main>
);

export default AdminLayout;
