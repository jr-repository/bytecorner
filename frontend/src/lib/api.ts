const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api").replace(/\/$/, "");
const TOKEN_KEY = "bytecorner.authToken";
const USER_KEY = "bytecorner.authUser";

export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
  errors: unknown;
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function getCachedUser<T>() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as T) : null;
}

export function setCachedUser<T>(user: T | null) {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers);
  const body = options.body;

  if (!(body instanceof FormData) && body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  headers.set("Accept", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const envelope = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok || !envelope?.success) {
    const message = envelope?.message || `Request failed (${response.status})`;
    throw Object.assign(new Error(message), { status: response.status, errors: envelope?.errors });
  }

  return envelope.data;
}

export const publicApi = {
  services: () => apiRequest<any[]>("/services"),
  portfolio: () => apiRequest<any[]>("/portfolio"),
  articles: () => apiRequest<any[]>("/articles"),
  logos: () => apiRequest<any[]>("/client-logos"),
};

export const authApi = {
  login: (email: string, password: string) => apiRequest<{ token: string; user: any }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }),
  signup: (name: string, email: string, password: string) => apiRequest<{ token: string; user: any }>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, role: "Editor" }),
  }),
  profile: () => apiRequest<any>("/admin/profile"),
  updateProfile: (item: any) => apiRequest<any>("/admin/profile", { method: "PUT", body: JSON.stringify(stripClientOnly(item, true)) }),
  logout: () => apiRequest<null>("/admin/logout", { method: "POST" }),
};

export const adminApi = {
  dashboard: () => apiRequest<any>("/admin/dashboard"),
  services: crud("/admin/services"),
  portfolio: crud("/admin/portfolio"),
  articles: crud("/admin/articles"),
  logos: crud("/admin/client-logos"),
  users: crud("/admin/users", true),
  media: {
    list: () => apiRequest<any[]>("/admin/media"),
    create: (item: any) => apiRequest<any>("/admin/media", { method: "POST", body: JSON.stringify({ name: item.name, image: item.url || item.image }) }),
    delete: (id: string) => apiRequest<null>(`/admin/media/${id}`, { method: "DELETE" }),
  },
};

function crud(path: string, keepPassword = false) {
  return {
    list: () => apiRequest<any[]>(path),
    create: (item: any) => apiRequest<any>(path, { method: "POST", body: JSON.stringify(stripClientOnly(item, keepPassword)) }),
    update: (id: string, item: any) => apiRequest<any>(`${path}/${id}`, { method: "PUT", body: JSON.stringify(stripClientOnly(item, keepPassword)) }),
    delete: (id: string) => apiRequest<null>(`${path}/${id}`, { method: "DELETE" }),
  };
}

function stripClientOnly(item: any, keepPassword = false) {
  const { createdAt, updatedAt, uploadedAt, password, ...rest } = item || {};
  return keepPassword ? { ...rest, password } : rest;
}
