import { Hero } from "@/components/Hero";
import { LinkButton } from "@/components/Button";
import { GlassCard, SectionHeader, SectionLabel } from "@/components/GlassCard";
import { useLang } from "@/contexts/LangContext";
import { useData } from "@/contexts/DataContext";
import { PortfolioCard, ArticleCard } from "@/components/Cards";
import { Link } from "react-router-dom";
import { Star, Check, ArrowRight } from "lucide-react";

const PROCESS = [
  { n: "01", t: "Discovery", d: "Memahami kebutuhan bisnis dan tujuan Anda" },
  { n: "02", t: "Strategy", d: "Menyusun strategi digital yang tepat & efektif" },
  { n: "03", t: "Design", d: "Merancang solusi digital yang menarik & fungsional" },
  { n: "04", t: "Development", d: "Membangun dengan teknologi modern & best practice" },
  { n: "05", t: "Launch & Optimize", d: "Meluncurkan & terus mengoptimalkan performa" },
];

export default function Home() {
  const { t, lang, pick } = useLang();
  const { services, portfolio, articles, logos } = useData();
  const featuredPortfolio = portfolio.find((p) => p.featured) ?? portfolio[0];
  const restPortfolio = portfolio.filter((p) => p.id !== featuredPortfolio?.id).slice(0, 3);

  return (
    <>
      <Hero
        eyebrow={<SectionLabel>{t("hero_tag")}</SectionLabel>}
        title={
          <>
            {t("hero_title_a")} <span className="text-teal-gradient">{t("hero_title_b")}</span>{" "}
            {t("hero_title_c")}
          </>
        }
        subtitle={t("hero_sub")}
        actions={
          <>
            <LinkButton to="/services" arrow>{t("cta_view_services")}</LinkButton>
            <LinkButton to="/portfolio" variant="outline" arrow>{t("cta_view_portfolio")}</LinkButton>
          </>
        }
        visual={
          <div className="relative">
            <div className="relative rounded-3xl glass-strong p-3 animate-float-slow">
              <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80" alt="" className="rounded-2xl w-full" />
            </div>
            <div className="absolute -bottom-6 -left-4 glass-strong rounded-2xl p-4 w-48 animate-float">
              <p className="text-xs text-muted">Project Completed</p>
              <p className="font-display text-2xl font-bold">1,250+</p>
              <p className="text-[10px] text-teal-deep">Successfully delivered</p>
            </div>
            <div className="absolute -top-4 -right-4 glass-strong rounded-2xl p-4 w-44">
              <p className="text-xs text-muted">Performance</p>
              <p className="font-display text-xl font-bold text-teal-deep">+127%</p>
            </div>
          </div>
        }
      />

      {/* trust bar */}
      <section className="border-y border-ink/5 bg-white/40 py-8">
        <div className="mx-auto max-w-7xl overflow-hidden px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex -space-x-2">
              {[12, 32, 47, 5].map((i) => (
                <img key={i} src={`https://i.pravatar.cc/40?img=${i}`} alt="" className="size-8 rounded-full border-2 border-white" />
              ))}
            </div>
            <div>
              <p className="text-sm font-medium text-ink">{t("trusted")}</p>
              <div className="flex items-center gap-1 text-xs text-muted">
                {[...Array(5)].map((_, i) => <Star key={i} className="size-3 fill-amber-400 text-amber-400" />)}
                <span className="ml-1">4.9/5</span>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex gap-12 animate-marquee w-max">
              {[...logos, ...logos].map((l, i) => (
                <div key={i} className="h-10 w-32 grid place-items-center opacity-60 hover:opacity-100 transition">
                  <img src={l.image} alt={l.name} className="max-h-10 max-w-full object-contain grayscale hover:grayscale-0 transition" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* about teaser */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel>{t("section_about")}</SectionLabel>
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold leading-tight">
              {lang === "id" ? <>Kami bukan sekadar agency,<br /> kami adalah <span className="text-teal-deep">partner digital</span> Anda.</> : <>We aren't just an agency, we're your <span className="text-teal-deep">digital partner</span>.</>}
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              {lang === "id" ? "ByteCorner.id berdiri untuk membantu bisnis menghadapi tantangan digital dengan solusi yang relevan, inovatif, dan berdampak nyata." : "ByteCorner.id helps businesses tackle digital challenges with relevant, innovative, high-impact solutions."}
            </p>
            <div className="mt-6 grid grid-cols-4 gap-4">
              {[["150+", "Proyek Selesai"], ["5+", "Tahun Pengalaman"], ["98%", "Tingkat Kepuasan"], ["100+", "Klien Bahagia"]].map(([v, l]) => (
                <div key={v}>
                  <p className="font-display text-2xl font-bold text-teal-deep">{v}</p>
                  <p className="text-xs text-muted">{l}</p>
                </div>
              ))}
            </div>
            <LinkButton to="/about" variant="outline" arrow className="mt-6">{lang === "id" ? "Lebih Lanjut" : "Learn More"}</LinkButton>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" className="rounded-2xl row-span-2 h-full object-cover" alt="" />
            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80" className="rounded-2xl object-cover" alt="" />
            <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80" className="rounded-2xl object-cover" alt="" />
          </div>
        </div>
      </section>

      {/* services panel */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-6 rounded-3xl glass overflow-hidden">
          <div className="bg-teal-gradient text-white p-8 md:p-10">
            <SectionLabel>Layanan Kami</SectionLabel>
            <h3 className="mt-4 font-display text-3xl font-bold">Solusi Digital End-to-End</h3>
            <p className="mt-3 text-white/90">{lang === "id" ? "Kami menyediakan layanan terintegrasi untuk membantu bisnis Anda tumbuh." : "Integrated services to grow your business in the digital era."}</p>
            <LinkButton to="/services" variant="outline" arrow className="mt-6 !bg-white !text-ink">{t("cta_consult")}</LinkButton>
          </div>
          <div className="p-6 md:p-8 grid sm:grid-cols-2 gap-2">
            {services.slice(0, 6).map((s) => (
              <Link key={s.id} to={`/services/${s.slug}`} className="group rounded-2xl p-4 hover:bg-white/70 transition flex gap-3">
                <div className="size-10 shrink-0 rounded-xl bg-teal/15 grid place-items-center text-teal-deep font-display font-bold">{pick(s.title).charAt(0)}</div>
                <div>
                  <p className="font-display font-semibold text-ink group-hover:text-teal-deep transition">{pick(s.title)}</p>
                  <p className="text-xs text-muted line-clamp-1">{pick(s.excerpt)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* portfolio */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <SectionHeader eyebrow={t("section_portfolio")} title={lang === "id" ? "Karya yang Memberi Dampak Nyata" : "Work That Delivers Real Impact"} />
          <LinkButton to="/portfolio" variant="outline" arrow size="sm">{lang === "id" ? "Lihat Semua" : "View All"}</LinkButton>
        </div>
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2"><PortfolioCard item={featuredPortfolio} variant="featured" /></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-5">
            {restPortfolio.slice(0, 2).map((p) => <PortfolioCard key={p.id} item={p} variant="compact" />)}
          </div>
        </div>
      </section>

      {/* process */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeader eyebrow={t("section_process")} title={lang === "id" ? "Proses Terstruktur, Hasil Maksimal" : "Structured Process, Maximum Results"} />
        <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-6 relative">
          <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent" />
          {PROCESS.map((p) => (
            <div key={p.n} className="relative text-center">
              <div className="mx-auto size-12 rounded-full glass grid place-items-center text-teal-deep font-display font-bold">{p.n}</div>
              <h4 className="mt-3 font-display font-semibold">{p.t}</h4>
              <p className="mt-1 text-xs text-muted">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-3xl bg-brand-gradient p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight">{lang === "id" ? "Siap membawa bisnis Anda" : "Ready to take your business"}<br /> {lang === "id" ? "ke level berikutnya?" : "to the next level?"}</h3>
            <p className="mt-3 text-ink/70 max-w-xl">{lang === "id" ? "Mari berdiskusi dan temukan solusi digital terbaik." : "Let's discuss the best digital solution for your growth."}</p>
          </div>
          <LinkButton to="/contact" arrow size="lg">{t("cta_start_project")}</LinkButton>
        </div>
      </section>

      {/* articles */}
      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <SectionHeader eyebrow={t("section_articles")} title={lang === "id" ? "Wawasan Seputar Dunia Digital" : "Insights From The Digital World"} />
          <LinkButton to="/articles" variant="outline" arrow size="sm">{lang === "id" ? "Lihat Semua" : "View All"}</LinkButton>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {articles.slice(0, 3).map((a) => <ArticleCard key={a.id} item={a} />)}
        </div>
      </section>
    </>
  );
}
