import { useMemo, useState } from "react";
import { Hero } from "@/components/Hero";
import { SectionLabel } from "@/components/GlassCard";
import { useData } from "@/contexts/DataContext";
import { useLang } from "@/contexts/LangContext";
import { ArticleCard } from "@/components/Cards";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Articles() {
  const { articles } = useData();
  const { lang, t, pick } = useLang();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState<"latest" | "oldest">("latest");
  const cats = useMemo(() => ["all", ...Array.from(new Set(articles.map((a) => a.category)))], [articles]);
  const featured = articles.find((a) => a.featured) ?? articles[0];
  let list = articles.filter((a) => (cat === "all" || a.category === cat) && (!q || pick(a.title).toLowerCase().includes(q.toLowerCase())));
  list = list.sort((a, b) => sort === "latest" ? +new Date(b.date) - +new Date(a.date) : +new Date(a.date) - +new Date(b.date));
  const latest = list.filter((a) => a.id !== featured?.id);
  const popular = articles.slice(0, 6);

  return (
    <>
      <Hero
        compact
        eyebrow={<SectionLabel>Insight & Artikel</SectionLabel>}
        title={<>Insight & Artikel <span className="text-teal-gradient">Digital</span></>}
        subtitle={lang === "id" ? "Wawasan, strategi, dan inspirasi seputar teknologi, desain, dan pertumbuhan bisnis digital." : "Insights, strategy and inspiration on technology, design and digital business growth."}
        visual={
          <div className="rounded-3xl glass p-3 flex items-center gap-2 max-w-md">
            <Search className="size-4 ml-2 text-muted" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={lang === "id" ? "Cari artikel..." : "Search articles..."} className="flex-1 bg-transparent outline-none text-sm py-2" />
          </div>
        }
      />

      <section className="mx-auto max-w-7xl px-6 py-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={cn("rounded-full px-4 py-1.5 text-xs font-semibold", cat === c ? "bg-teal-gradient text-white shadow-brand" : "glass")}>
              {c === "all" ? t("all") : c}
            </button>
          ))}
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="glass rounded-full px-4 py-1.5 text-xs font-semibold">
          <option value="latest">Terbaru</option>
          <option value="oldest">Terlama</option>
        </select>
      </section>

      {featured && <section className="mx-auto max-w-7xl px-6 pb-10"><ArticleCard item={featured} variant="featured" /></section>}

      <section className="mx-auto max-w-7xl px-6 py-6">
        <h3 className="font-display text-2xl font-bold mb-6">{t("latest_articles")}</h3>
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2"><ArticleCard item={latest[0] || articles[0]} variant="featured" /></div>
          <div className="space-y-3">{latest.slice(1, 4).map((a) => <ArticleCard key={a.id} item={a} variant="side" />)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <h3 className="font-display text-2xl font-bold mb-6">{t("popular_insights")}</h3>
        <div className="grid lg:grid-cols-3 gap-5">
          <ArticleCard item={popular[0]} variant="dark" />
          <div className="space-y-4">
            {popular.slice(1, 3).map((a) => <ArticleCard key={a.id} item={a} />)}
          </div>
          <div className="space-y-3">
            {popular.slice(3, 6).map((a) => <ArticleCard key={a.id} item={a} variant="side" />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl bg-brand-gradient p-8 md:p-10 grid md:grid-cols-2 gap-6 items-center">
          <div><h3 className="font-display text-2xl md:text-3xl font-bold">{t("newsletter_title")}</h3><p className="mt-2 text-ink/70">{t("newsletter_sub")}</p></div>
          <form onSubmit={(e) => { e.preventDefault(); }} className="flex gap-2">
            <input placeholder={t("email_placeholder")} className="flex-1 rounded-full bg-white px-4 py-3 text-sm outline-none" />
            <button className="rounded-full bg-teal-gradient text-white px-5 text-sm font-medium shadow-brand">{t("subscribe")}</button>
          </form>
        </div>
      </section>
    </>
  );
}
