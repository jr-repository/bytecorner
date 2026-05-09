import { createContext, useContext, useState, type ReactNode } from "react";
import { storage } from "@/lib/storage";

export type Lang = "id" | "en";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof DICT["en"]) => string;
  pick: (b: { id: string; en: string } | undefined) => string;
}

const DICT = {
  id: {
    nav_home: "Beranda", nav_about: "Tentang Kami", nav_services: "Layanan",
    nav_portfolio: "Portfolio", nav_articles: "Artikel", nav_career: "Karier", nav_contact: "Hubungi Kami",
    cta_consult: "Konsultasi Gratis", cta_view_services: "Lihat Layanan Kami",
    cta_view_portfolio: "Lihat Portofolio", cta_start_project: "Mulai Proyek Sekarang",
    cta_read_more: "Baca Selengkapnya", cta_view_detail: "Lihat Detail",
    hero_tag: "Digital Solutions for Modern Business",
    hero_title_a: "Membangun Brand Besar dengan",
    hero_title_b: "Solusi Digital",
    hero_title_c: "yang Tepat & Strategis",
    hero_sub: "ByteCorner.id membantu bisnis berkembang di era digital melalui strategi, desain, dan teknologi yang terintegrasi.",
    trusted: "Dipercaya 100+ klien dari berbagai industri",
    section_about: "Tentang Kami", section_services: "Layanan Kami",
    section_portfolio: "Portfolio Kami", section_process: "Proses Kerja",
    section_articles: "Wawasan & Insight",
    why_us: "Mengapa Memilih Kami?", what_you_get: "What You Get",
    contact_us: "Hubungi Kami", search_placeholder: "Cari...",
    sort_latest: "Terbaru", featured_article: "Featured Article",
    latest_articles: "Latest Articles", popular_insights: "Popular Insights",
    newsletter_title: "Dapatkan Insight Digital Terbaru",
    newsletter_sub: "Berlangganan newsletter kami dan dapatkan artikel eksklusif setiap minggu.",
    subscribe: "Berlangganan", email_placeholder: "Masukkan email Anda...",
    all: "Semua", min_read: "menit baca",
  },
  en: {
    nav_home: "Home", nav_about: "About", nav_services: "Services",
    nav_portfolio: "Portfolio", nav_articles: "Articles", nav_career: "Career", nav_contact: "Contact",
    cta_consult: "Free Consultation", cta_view_services: "View Our Services",
    cta_view_portfolio: "View Portfolio", cta_start_project: "Start a Project",
    cta_read_more: "Read More", cta_view_detail: "View Detail",
    hero_tag: "Digital Solutions for Modern Business",
    hero_title_a: "Building Bigger Brands with",
    hero_title_b: "Digital Solutions",
    hero_title_c: "that are Strategic & Right",
    hero_sub: "ByteCorner.id helps businesses thrive in the digital era through integrated strategy, design and technology.",
    trusted: "Trusted by 100+ clients across industries",
    section_about: "About Us", section_services: "Our Services",
    section_portfolio: "Our Portfolio", section_process: "How We Work",
    section_articles: "Insights & Articles",
    why_us: "Why Choose Us?", what_you_get: "What You Get",
    contact_us: "Contact Us", search_placeholder: "Search...",
    sort_latest: "Latest", featured_article: "Featured Article",
    latest_articles: "Latest Articles", popular_insights: "Popular Insights",
    newsletter_title: "Get the Latest Digital Insights",
    newsletter_sub: "Subscribe to our newsletter and receive exclusive articles weekly.",
    subscribe: "Subscribe", email_placeholder: "Enter your email...",
    all: "All", min_read: "min read",
  },
} as const;

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => storage.get<Lang>("lang", "id"));
  const setLang = (l: Lang) => { setLangState(l); storage.set("lang", l); };
  const t: LangCtx["t"] = (key) => DICT[lang][key] ?? key;
  const pick: LangCtx["pick"] = (b) => (b ? b[lang] || b.en || b.id : "");
  return <Ctx.Provider value={{ lang, setLang, t, pick }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const c = useContext(Ctx);
  if (!c) throw new Error("LangProvider missing");
  return c;
}
