import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { storage, type AdminUser } from "@/lib/storage";
import { useData } from "./DataContext";

interface AuthCtx {
  user: AdminUser | null;
  login: (email: string, password: string) => string | null; // null on success, error msg on fail
  signup: (name: string, email: string, password: string) => string | null;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { users, setUsers } = useData();
  const [user, setUser] = useState<AdminUser | null>(() => storage.get<AdminUser | null>("auth", null));

  useEffect(() => { storage.set("auth", user); }, [user]);

  const login = (email: string, password: string) => {
    const u = users.find((x) => x.email.toLowerCase() === email.toLowerCase() && x.password === password);
    if (!u) return "Invalid credentials";
    setUser(u); return null;
  };
  const signup = (name: string, email: string, password: string) => {
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) return "Email already registered";
    const u: AdminUser = { id: "u" + Date.now(), name, email, password, role: "Editor", avatar: `https://i.pravatar.cc/120?u=${email}` };
    setUsers([...users, u]); setUser(u); return null;
  };
  const logout = () => setUser(null);

  return <Ctx.Provider value={{ user, login, signup, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx); if (!c) throw new Error("AuthProvider missing"); return c;
}
