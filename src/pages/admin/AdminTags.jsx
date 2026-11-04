import { useCallback, useEffect, useRef, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";
import { useAuth } from "../../context/useAuth";
import {
  createTag,
  deleteTag,
  getAdminTags,
  updateTag,
} from "../../services/adminService";

const AdminTags = () => {
  const { user } = useAuth();
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const activeRef = useRef(true);

  const loadTags = useCallback(async (isActive = () => activeRef.current) => {
    try {
      const data = await getAdminTags(user);
      if (isActive()) {
        setTags(data);
        setError(null);
      }
    } catch (err) {
      if (isActive()) {
        setError(err.message || "No se pudieron cargar los tags.");
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
    getAdminTags(user)
      .then((data) => {
        if (active) setTags(data);
      })
      .catch((err) => {
        if (active) setError(err.message || "No se pudieron cargar los tags.");
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
        await createTag(user, { title });
      } else {
        await updateTag(user, editingId, { title });
      }
      setTitle("");
      setEditingId(null);
      await loadTags();
    } catch (err) {
      setError(err.message || "No se pudo guardar el tag.");
    }
  };

  const handleDelete = async (tag) => {
    if (!window.confirm(`¿Eliminar el tag "${tag.title}" de todos los productos?`)) {
      return;
    }

    setError(null);
    try {
      await deleteTag(user, tag.id);
      if (editingId === tag.id) {
        setEditingId(null);
        setTitle("");
      }
      await loadTags();
    } catch (err) {
      setError(err.message || "No se pudo eliminar el tag.");
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="mb-4 text-3xl font-bold">Tags</h2>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit} className="mb-8 flex flex-wrap items-end gap-3">
        <label className="flex min-w-64 flex-col gap-1 font-semibold">
          Título *
          <input
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="border border-gray-300 px-3 py-2 font-normal"
          />
        </label>
        <button className="bg-accents px-4 py-2 font-bold text-white">
          {editingId === null ? "Crear tag" : "Guardar cambios"}
        </button>
        {editingId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setTitle("");
            }}
            className="bg-gray-200 px-4 py-2 font-semibold"
          >
            Cancelar
          </button>
        )}
      </form>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="p-3">ID</th>
              <th className="p-3">Título</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr key={tag.id} className="border-b border-gray-200">
                <td className="p-3">{tag.id}</td>
                <td className="p-3">{tag.title}</td>
                <td className="flex gap-4 p-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(tag.id);
                      setTitle(tag.title);
                    }}
                    className="font-semibold text-accents underline"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(tag)}
                    className="font-semibold text-red-700 underline"
                  >
                    Eliminar
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

export default AdminTags;
