import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";
import { useAuth } from "../../context/useAuth";
import { getAdminProducts } from "../../services/adminService";

const AdminProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    getAdminProducts(user)
      .then((data) => {
        if (active) setProducts(data);
      })
      .catch((err) => {
        if (active) {
          setError(err.message || "No se pudieron cargar los productos.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [user]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h2 className="mb-4 text-3xl font-bold">Productos</h2>
      <p className="mb-4">La edición de productos estará disponible próximamente.</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="p-3">ID</th>
              <th className="p-3">Título</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Categoría</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-200">
                <td className="p-3">{product.id}</td>
                <td className="p-3">{product.title}</td>
                <td className="p-3">${product.price}</td>
                <td className="p-3">{product.category?.title ?? product.category_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
