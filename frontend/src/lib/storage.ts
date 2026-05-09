// localStorage-backed data layer. Easy to swap for a backend later.
const PREFIX = "bytecorner.";

export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, value: T) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {}
  },
  remove(key: string) {
    localStorage.removeItem(PREFIX + key);
  },
};

export type Bilingual = { id: string; en: string };

export interface Service {
  id: string;
  slug: string;
  category: string;
  title: { id: string; en: string };
  excerpt: { id: string; en: string };
  description: { id: string; en: string };
  icon: string; // lucide name
  image: string;
  features: string[];
  faq: { q: string; a: string }[];
  status: "published" | "draft";
  featured?: boolean;
}

export interface PortfolioItem {
  id: string;
  slug: string;
  client: string;
  category: string;
  title: { id: string; en: string };
  description: { id: string; en: string };
  overview: { id: string; en: string };
  challenge: { id: string; en: string };
  solution: { id: string; en: string };
  techStack: string[];
  date: string;
  url?: string;
  featured?: boolean;
  cover: string;
  gallery: string[];
  status: "published" | "draft";
  metrics?: { label: string; value: string }[];
}

export interface Article {
  id: string;
  slug: string;
  title: { id: string; en: string };
  excerpt: { id: string; en: string };
  content: { id: string; en: string }; // HTML
  category: string;
  author: string;
  authorAvatar?: string;
  date: string;
  cover: string;
  tags: string[];
  featured?: boolean;
  readingTime: number;
  status: "published" | "draft";
}

export interface ClientLogo {
  id: string;
  name: string;
  image: string; // url or base64
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Editor" | "Author";
  password: string;
  avatar?: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
}

export interface IGDraft {
  id: string;
  title: string;
  caption: string;
  image: string;
  createdAt: string;
}
