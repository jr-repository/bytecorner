import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { storage, type Service, type PortfolioItem, type Article, type ClientLogo, type AdminUser, type MediaItem, type IGDraft } from "@/lib/storage";
import { seedServices, seedPortfolio, seedArticles, seedLogos, seedUsers, seedMedia, seedIG } from "@/lib/seed";

interface DataState {
  services: Service[];
  portfolio: PortfolioItem[];
  articles: Article[];
  logos: ClientLogo[];
  users: AdminUser[];
  media: MediaItem[];
  igDrafts: IGDraft[];
  setServices: (v: Service[]) => void;
  setPortfolio: (v: PortfolioItem[]) => void;
  setArticles: (v: Article[]) => void;
  setLogos: (v: ClientLogo[]) => void;
  setUsers: (v: AdminUser[]) => void;
  setMedia: (v: MediaItem[]) => void;
  setIGDrafts: (v: IGDraft[]) => void;
  resetAll: () => void;
}

const DataContext = createContext<DataState | null>(null);

function useStored<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => storage.get(key, fallback));
  const update = useCallback((v: T) => {
    setValue(v);
    storage.set(key, v);
  }, [key]);
  return [value, update] as const;
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useStored("services", seedServices);
  const [portfolio, setPortfolio] = useStored("portfolio", seedPortfolio);
  const [articles, setArticles] = useStored("articles", seedArticles);
  const [logos, setLogos] = useStored("logos", seedLogos);
  const [users, setUsers] = useStored("users", seedUsers);
  const [media, setMedia] = useStored("media", seedMedia);
  const [igDrafts, setIGDrafts] = useStored("igDrafts", seedIG);

  useEffect(() => {
    // ensure seeded once
    if (!storage.get("seeded", false)) {
      storage.set("services", seedServices);
      storage.set("portfolio", seedPortfolio);
      storage.set("articles", seedArticles);
      storage.set("logos", seedLogos);
      storage.set("users", seedUsers);
      storage.set("seeded", true);
    }
  }, []);

  const resetAll = () => {
    setServices(seedServices); setPortfolio(seedPortfolio); setArticles(seedArticles);
    setLogos(seedLogos); setUsers(seedUsers); setMedia(seedMedia); setIGDrafts(seedIG);
  };

  return (
    <DataContext.Provider value={{
      services, portfolio, articles, logos, users, media, igDrafts,
      setServices, setPortfolio, setArticles, setLogos, setUsers, setMedia, setIGDrafts,
      resetAll,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside DataProvider");
  return ctx;
}
