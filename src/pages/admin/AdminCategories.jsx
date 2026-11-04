import { useCallback, useEffect, useRef, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";
import { useAuth } from "../../context/useAuth";
import {
  createCategory,
  getAdminCategories,
  updateCategory,
} from "../../services/adminService";

const emptyForm = { title: "", description: "", image: "" };

const AdminCategories = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const activeRef = useRef(true);

  const loadCategories = useCallback(async (isActive = () => activeRef.current) => {
    try {
      const data = await getAdminCategories(user);
      if (isActive()) {
        setCategories(data);
        setError(null);
      }
    } catch (err) {
      if (isActive()) {
        setError(err.message || "No se pudieron cargar las categorías.");
      }
    } finally {
      if (isActive()) {
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    let active = true;
    activeRef.current = true;
    getAdminCategories(user)
      .then((data) => {
        if (active) setCategories(data);
      })
      .catch((err) => {
        if (active) {
          setError(err.message || "No se pudieron cargar las categorías.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      activeRef.current = false;
    };
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      if (editingId === null) {
        await createCategory(user, form);
      } else {
        await updateCategory(user, editingId, form);
      }
      setForm(emptyForm);
      setEditingId(null);
      await loadCategories();
    } catch (err) {
      setError(err.message || "No se pudo guardar la categoría.");
    }
  };

  const startEditing = (category) => {
    setEditingId(category.id);
    setForm({
      title: category.title,
      description: category.description ?? "",
      image: category.image ?? "",
    });
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="mb-4 text-3xl font-bold">Categorías</h2>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit} className="mb-8 grid gap-3 md:grid-cols-2">
        <label className="flex flex-col gap-1 font-semibold">
          Título *
          <input
            required
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            className="border border-gray-300 px-3 py-2 font-normal"
          />
        </label>
        <label className="flex flex-col gap-1 font-semibold">
          Imagen (ruta o URL)
          <input
            value={form.image}
            onChange={(event) => setForm({ ...form, image: event.target.value })}
            className="border border-gray-300 px-3 py-2 font-normal"
          />
        </label>
        <label className="flex flex-col gap-1 font-semibold md:col-span-2">
          Descripción
          <textarea
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
            className="border border-gray-300 px-3 py-2 font-normal"
            rows="3"
          />
        </label>
        <div className="flex gap-2 md:col-span-2">
          <button className="bg-accents px-4 py-2 font-bold text-white">
            {editingId === null ? "Crear categoría" : "Guardar cambios"}
          </button>
          {editingId !== null && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="bg-gray-200 px-4 py-2 font-semibold"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="p-3">ID</th>
              <th className="p-3">Título</th>
              <th className="p-3">Descripción</th>
              <th className="p-3">Imagen</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b border-gray-200">
                <td className="p-3">{category.id}</td>
                <td className="p-3">{category.title}</td>
                <td className="p-3">{category.description || "—"}</td>
                <td className="p-3">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.title}
                      className="h-12 w-12 object-cover"
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-3">
                  <button
                    type="button"
                    onClick={() => startEditing(category)}
                    className="font-semibold text-accents underline"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategories;
