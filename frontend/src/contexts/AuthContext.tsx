import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AdminUser } from "@/lib/storage";
import { authApi, getCachedUser, getToken, setCachedUser, setToken } from "@/lib/api";

interface AuthCtx {
  user: AdminUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (name: string, email: string, password: string) => Promise<string | null>;
  updateProfile: (payload: Partial<AdminUser> & { password?: string; avatar?: string }) => Promise<string | null>;
  logout: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [tokenState, setTokenState] = useState<string | null>(() => getToken());
  const [user, setUser] = useState<AdminUser | null>(() => getCachedUser<AdminUser>());

  useEffect(() => {
    let alive = true;
    if (!tokenState) return;
    authApi.profile()
      .then((profile) => {
        if (!alive) return;
        setUser(profile);
        setCachedUser(profile);
      })
      .catch(() => {
        if (!alive) return;
        setToken(null);
        setTokenState(null);
        setUser(null);
        setCachedUser(null);
      });
    return () => { alive = false; };
  }, [tokenState]);

  const login = async (email: string, password: string) => {
    try {
      const data = await authApi.login(email, password);
      setToken(data.token);
      setTokenState(data.token);
      setUser(data.user);
      setCachedUser(data.user);
      return null;
    } catch (e) {
      return e instanceof Error ? e.message : "Invalid credentials";
    }
  };
  const signup = async (name: string, email: string, password: string) => {
    try {
      const data = await authApi.signup(name, email, password);
      setToken(data.token);
      setTokenState(data.token);
      setUser(data.user);
      setCachedUser(data.user);
      return null;
    } catch (e) {
      return e instanceof Error ? e.message : "Unable to create account";
    }
  };
  const logout = async () => {
    try { if (tokenState) await authApi.logout(); } catch {}
    setToken(null);
    setTokenState(null);
    setUser(null);
    setCachedUser(null);
  };
  const updateProfile = async (payload: Partial<AdminUser> & { password?: string; avatar?: string }) => {
    try {
      const updated = await authApi.updateProfile({ ...user, ...payload, role: payload.role || user?.role || "Editor", status: (payload as any).status || "active" });
      setUser(updated);
      setCachedUser(updated);
      return null;
    } catch (e) {
      return e instanceof Error ? e.message : "Unable to update profile";
    }
  };

  return <Ctx.Provider value={{ user, token: tokenState, login, signup, updateProfile, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx); if (!c) throw new Error("AuthProvider missing"); return c;
}
