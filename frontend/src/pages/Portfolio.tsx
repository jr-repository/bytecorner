import { useMemo, useState } from "react";
import { Hero } from "@/components/Hero";
import { SectionLabel } from "@/components/GlassCard";
import { LinkButton } from "@/components/Button";
import { useData } from "@/contexts/DataContext";
import { useLang } from "@/contexts/LangContext";
import { PortfolioCard } from "@/components/Cards";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Portfolio() {
  const { portfolio } = useData();
  const { lang, t } = useLang();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const cats = useMemo(() => ["all", ...Array.from(new Set(portfolio.map((p) => p.category)))], [portfolio]);
  const filtered = portfolio.filter((p) => (cat === "all" || p.category === cat) && (
    !q || p.title[lang].toLowerCase().includes(q.toLowerCase()) || p.client.toLowerCase().includes(q.toLowerCase())
  ));

  return (
    <>
      <Hero
        compact
        eyebrow={<SectionLabel>Our Portfolio</SectionLabel>}
        title={<>{lang === "id" ? "Portfolio Kami" : "Our Portfolio"}<br /><span className="text-teal-gradient">{lang === "id" ? "Solusi Digital yang Memberi Dampak Nyata" : "Digital Solutions With Real Impact"}</span></>}
        subtitle={lang === "id" ? "Karya terbaik kami untuk membantu brand berkembang melalui desain, teknologi, dan strategi digital yang tepat." : "Our best work helping brands grow through the right design, technology and digital strategy."}
        visual={<img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80" className="rounded-3xl w-full" alt="" />}
      />
      <section className="mx-auto max-w-7xl px-6 py-10 space-y-6">
        <div className="rounded-full glass p-2 flex items-center gap-2 max-w-2xl">
          <Search className="size-4 ml-3 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={lang === "id" ? "Cari proyek, klien, atau kategori..." : "Search projects..."} className="flex-1 bg-transparent outline-none text-sm py-2" />
        </div>
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={cn("rounded-full px-4 py-1.5 text-xs font-semibold transition", cat === c ? "bg-teal-gradient text-white shadow-brand" : "glass text-ink/70")}>
              {c === "all" ? t("all") : c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((p) => <PortfolioCard key={p.id} item={p} variant="stack" />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[["150+", "Proyek Selesai"], ["98%", "Tingkat Kepuasan"], ["30+", "Industri Terlayani"], ["2019", "Tahun Berdiri"]].map(([v, l]) => (
          <div key={v} className="rounded-3xl glass p-6"><p className="font-display text-3xl font-bold text-teal-deep">{v}</p><p className="text-sm text-muted">{l}</p></div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl bg-brand-gradient p-10 flex flex-wrap items-center justify-between gap-6">
          <div><h3 className="font-display text-2xl md:text-3xl font-bold">Punya Proyek Digital?</h3><p className="text-ink/70">Mari wujudkan bersama tim kami.</p></div>
          <LinkButton to="/contact" arrow size="lg">Mulai Proyek Sekarang</LinkButton>
        </div>
      </section>
    </>
  );
}
