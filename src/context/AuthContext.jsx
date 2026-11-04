import { useCallback, useMemo, useState } from "react";
import { users } from "../data/users";
import { AuthContext } from "./auth-context";

const STORAGE_KEY = "user";

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (!storedUser) return null;

    const user = JSON.parse(storedUser);
    if (
      user &&
      typeof user.id === "number" &&
      typeof user.name === "string" &&
      typeof user.email === "string" &&
      ["admin", "cliente"].includes(user.role)
    ) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    }

    localStorage.removeItem(STORAGE_KEY);
    return null;
  } catch (error) {
    console.error("No se pudo restaurar la sesión guardada.", error);
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);

  const login = useCallback((email, password) => {
    const foundUser = users.find(
      (candidate) =>
        candidate.email.toLowerCase() === email.trim().toLowerCase() &&
        candidate.password === password,
    );

    if (!foundUser) return false;

    const sessionUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
    } catch (error) {
      console.error("No se pudo guardar la sesión.", error);
      return false;
    }

    setUser(sessionUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("No se pudo cerrar la sesión guardada.", error);
    }
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
