import { useParams, Navigate, Link } from "react-router-dom";
import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { useLang } from "@/contexts/LangContext";
import { Hero } from "@/components/Hero";
import { GlassCard, SectionLabel } from "@/components/GlassCard";
import { LinkButton } from "@/components/Button";

export default function PortfolioDetail() {
  const { slug } = useParams();
  const { portfolio } = useData();
  const { pick } = useLang();
  const item = portfolio.find((p) => p.slug === slug);
  const [active, setActive] = useState(0);
  if (!item) return <Navigate to="/portfolio" replace />;
  const related = portfolio.filter((p) => p.id !== item.id).slice(0, 3);

  return (
    <>
      <Hero
        compact
        eyebrow={<SectionLabel>{item.category}</SectionLabel>}
        title={pick(item.title)}
        subtitle={pick(item.description)}
        actions={item.url && <a href={item.url} target="_blank" rel="noreferrer" className="text-teal-deep underline text-sm">Visit live →</a>}
        visual={<img src={item.cover} alt="" className="rounded-3xl w-full max-h-[420px] object-cover" />}
      />
      <section className="mx-auto max-w-7xl px-6 py-14 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          <GlassCard>
            <div className="aspect-video rounded-2xl bg-soft overflow-hidden">
              <img src={item.gallery[active] || item.cover} alt="" className="w-full h-full object-contain bg-white" />
            </div>
            {item.gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {item.gallery.map((g, i) => (
                  <button key={i} onClick={() => setActive(i)} className={`aspect-video rounded-xl overflow-hidden border-2 ${active === i ? "border-teal" : "border-transparent"}`}>
                    <img src={g} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </GlassCard>
          {[
            ["Overview", pick(item.overview)],
            ["Challenge", pick(item.challenge)],
            ["Solution", pick(item.solution)],
          ].map(([h, c]) => c && (
            <GlassCard key={h}>
              <h3 className="font-display text-lg font-semibold">{h}</h3>
              <p className="mt-2 text-muted leading-relaxed">{c}</p>
            </GlassCard>
          ))}
        </div>
        <aside className="space-y-4">
          <GlassCard>
            <h4 className="font-display font-semibold">Project Info</h4>
            <dl className="mt-3 text-sm space-y-2">
              <div className="flex justify-between"><dt className="text-muted">Client</dt><dd>{item.client}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Category</dt><dd>{item.category}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Date</dt><dd>{new Date(item.date).toLocaleDateString()}</dd></div>
            </dl>
            <div className="mt-4">
              <p className="text-xs text-muted mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {item.techStack.map((t) => <span key={t} className="rounded-full bg-teal/15 text-teal-deep px-2.5 py-0.5 text-[11px] font-medium">{t}</span>)}
              </div>
            </div>
          </GlassCard>
          {item.metrics && (
            <GlassCard>
              <h4 className="font-display font-semibold">Key Results</h4>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {item.metrics.map((m) => (
                  <div key={m.label}><p className="font-display text-xl font-bold text-teal-deep">{m.value}</p><p className="text-[10px] text-muted">{m.label}</p></div>
                ))}
              </div>
            </GlassCard>
          )}
          <div className="rounded-3xl bg-teal-gradient text-white p-6">
            <h4 className="font-display font-bold">Punya proyek serupa?</h4>
            <LinkButton to="/contact" variant="outline" arrow className="mt-3 !bg-white !text-ink">Hubungi Kami</LinkButton>
          </div>
        </aside>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <h3 className="font-display text-2xl font-bold mb-6">Related Projects</h3>
        <div className="grid sm:grid-cols-3 gap-5">
          {related.map((r) => (
            <Link key={r.id} to={`/portfolio/${r.slug}`} className="rounded-2xl glass overflow-hidden group">
              <div className="aspect-video overflow-hidden"><img src={r.cover} alt="" className="w-full h-full object-cover group-hover:scale-105 transition" /></div>
              <div className="p-4"><p className="text-[10px] uppercase font-semibold text-teal-deep">{r.category}</p><p className="font-display font-semibold line-clamp-2 mt-1">{pick(r.title)}</p></div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
