import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from ?? "/";

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Completá el email y la contraseña.");
      return;
    }

    if (login(email, password)) {
      navigate(from, { replace: true });
      return;
    }

    setError("Email o contraseña incorrectos.");
  };

  return (
    <main className="mx-auto my-12 w-full max-w-md px-4">
      <h1 className="mb-6 text-center text-4xl font-bold text-foreground">
        Iniciar sesión
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 font-semibold">
          Email
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="border border-gray-300 bg-white px-3 py-2 font-normal"
            required
          />
        </label>
        <label className="flex flex-col gap-1 font-semibold">
          Contraseña
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="border border-gray-300 bg-white px-3 py-2 font-normal"
            required
          />
        </label>
        {error && (
          <p className="text-red-700" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="bg-accents px-4 py-2 font-bold text-white hover:bg-accents-hover"
        >
          Entrar
        </button>
      </form>

      <aside className="mt-8 bg-gray-100 p-4 text-sm">
        <h2 className="mb-2 font-bold">Cuentas demo</h2>
        <p>
          Admin: <code>admin@plantco.test</code> / <code>admin123</code>
        </p>
        <p>
          Cliente: <code>cliente@plantco.test</code> / <code>cliente123</code>
        </p>
        <p className="mt-2 text-gray-700">
          Credenciales ficticias para la demostración local.
        </p>
      </aside>
    </main>
  );
};

export default Login;
