import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { storage, type Service, type PortfolioItem, type Article, type ClientLogo, type AdminUser, type MediaItem, type IGDraft } from "@/lib/storage";
import { seedIG } from "@/lib/seed";
import { adminApi, publicApi } from "@/lib/api";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

interface DataState {
  services: Service[];
  portfolio: PortfolioItem[];
  articles: Article[];
  logos: ClientLogo[];
  users: AdminUser[];
  media: MediaItem[];
  igDrafts: IGDraft[];
  loading: boolean;
  setServices: (v: Service[]) => void;
  setPortfolio: (v: PortfolioItem[]) => void;
  setArticles: (v: Article[]) => void;
  setLogos: (v: ClientLogo[]) => void;
  setUsers: (v: AdminUser[]) => void;
  setMedia: (v: MediaItem[]) => void;
  setIGDrafts: (v: IGDraft[]) => void;
  resetAll: () => void;
  refreshAll: () => Promise<void>;
}

const DataContext = createContext<DataState | null>(null);

function useLocalStored<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => storage.get(key, fallback));
  const update = useCallback((v: T) => {
    setValue(v);
    storage.set(key, v);
  }, [key]);
  return [value, update] as const;
}

export function DataProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const [services, setServicesState] = useState<Service[]>([]);
  const [portfolio, setPortfolioState] = useState<PortfolioItem[]>([]);
  const [articles, setArticlesState] = useState<Article[]>([]);
  const [logos, setLogosState] = useState<ClientLogo[]>([]);
  const [users, setUsersState] = useState<AdminUser[]>([]);
  const [media, setMediaState] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [igDrafts, setIGDrafts] = useLocalStored("igDrafts", seedIG);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    const useAdminApi = Boolean(token && isAdminRoute);
    if (!useAdminApi) {
      setServicesState((items) => items.filter((item) => item.status === "published"));
      setPortfolioState((items) => items.filter((item) => item.status === "published"));
      setArticlesState((items) => items.filter((item) => item.status === "published"));
    }
    const [nextServices, nextPortfolio, nextArticles, nextLogos] = useAdminApi
      ? await Promise.all([adminApi.services.list(), adminApi.portfolio.list(), adminApi.articles.list(), adminApi.logos.list()])
      : await Promise.all([publicApi.services(), publicApi.portfolio(), publicApi.articles(), publicApi.logos()]);

    setServicesState(nextServices);
    setPortfolioState(nextPortfolio);
    setArticlesState(nextArticles);
    setLogosState(nextLogos);

    if (useAdminApi) {
      const [nextUsers, nextMedia] = await Promise.all([adminApi.users.list(), adminApi.media.list()]);
      setUsersState(nextUsers);
      setMediaState(nextMedia);
    } else {
      setUsersState([]);
      setMediaState([]);
    }
    setLoading(false);
  }, [token, isAdminRoute]);

  useEffect(() => {
    refreshAll().catch((error) => {
      setLoading(false);
      toast.error(error instanceof Error ? error.message : "Failed to load data");
    });
  }, [refreshAll]);

  const setServices = (next: Service[]) => reconcile(services, next, adminApi.services, setServicesState, refreshAll);
  const setPortfolio = (next: PortfolioItem[]) => reconcile(portfolio, next, adminApi.portfolio, setPortfolioState, refreshAll);
  const setArticles = (next: Article[]) => reconcile(articles, next, adminApi.articles, setArticlesState, refreshAll);
  const setLogos = (next: ClientLogo[]) => reconcile(logos, next, adminApi.logos, setLogosState, refreshAll);
  const setUsers = (next: AdminUser[]) => reconcile(users, next, adminApi.users, setUsersState, refreshAll);
  const setMedia = (next: MediaItem[]) => reconcile(media, next, adminApi.media, setMediaState, refreshAll);

  const resetAll = () => {
    refreshAll();
    setIGDrafts(seedIG);
  };

  return (
    <DataContext.Provider value={{
      services, portfolio, articles, logos, users, media, igDrafts, loading,
      setServices, setPortfolio, setArticles, setLogos, setUsers, setMedia, setIGDrafts,
      resetAll, refreshAll,
    }}>
      {children}
    </DataContext.Provider>
  );
}

function reconcile<T extends { id: string }>(
  current: T[],
  next: T[],
  api: { create: (item: T) => Promise<T>; update?: (id: string, item: T) => Promise<T>; delete: (id: string) => Promise<null> },
  setState: (items: T[]) => void,
  refreshAll: () => Promise<void>,
) {
  setState(next);

  const run = async () => {
    const currentIds = new Set(current.map((item) => item.id));
    const nextIds = new Set(next.map((item) => item.id));

    for (const item of current) {
      if (!nextIds.has(item.id)) await api.delete(item.id);
    }

    for (const item of next) {
      if (!currentIds.has(item.id)) {
        await api.create(item);
        continue;
      }

      const before = current.find((candidate) => candidate.id === item.id);
      if (api.update && before && JSON.stringify(before) !== JSON.stringify(item)) {
        await api.update(item.id, item);
      }
    }

    await refreshAll();
  };

  run().catch((error) => {
    toast.error(error instanceof Error ? error.message : "Failed to save changes");
    refreshAll();
  });
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside DataProvider");
  return ctx;
}
