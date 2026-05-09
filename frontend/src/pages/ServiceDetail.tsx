import { useParams, Navigate } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { useLang } from "@/contexts/LangContext";
import { Hero } from "@/components/Hero";
import { GlassCard, SectionHeader, SectionLabel } from "@/components/GlassCard";
import { LinkButton } from "@/components/Button";
import { Check } from "lucide-react";
import { useState } from "react";

export default function ServiceDetail() {
  const { slug } = useParams();
  const { services } = useData();
  const { pick, lang } = useLang();
  const s = services.find((x) => x.slug === slug);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  if (!s) return <Navigate to="/services" replace />;
  const related = services.filter((x) => x.id !== s.id).slice(0, 3);

  return (
    <>
      <Hero
        compact
        eyebrow={<SectionLabel>{s.category}</SectionLabel>}
        title={<>{pick(s.title)}</>}
        subtitle={pick(s.excerpt)}
        actions={<LinkButton to="/contact" arrow>Konsultasi Gratis</LinkButton>}
        visual={<img src={s.image} alt="" className="rounded-3xl w-full max-h-[420px] object-cover" />}
      />
      <section className="mx-auto max-w-7xl px-6 py-14 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <GlassCard>
            <h3 className="font-display text-xl font-semibold">Overview</h3>
            <p className="mt-3 text-muted leading-relaxed">{pick(s.description)}</p>
          </GlassCard>
          <GlassCard>
            <h3 className="font-display text-xl font-semibold">Benefits</h3>
            <ul className="mt-4 grid sm:grid-cols-2 gap-2">
              {s.features.map((f) => <li key={f} className="flex gap-2 text-sm"><Check className="size-4 text-teal-deep mt-0.5" />{f}</li>)}
            </ul>
          </GlassCard>
          {s.faq.length > 0 && (
            <div>
              <SectionHeader eyebrow="FAQ" title="Pertanyaan Umum" />
              <div className="mt-5 space-y-3">
                {s.faq.map((f, i) => (
                  <button key={i} onClick={() => setOpenFAQ(openFAQ === i ? null : i)} className="block w-full rounded-2xl glass p-5 text-left">
                    <div className="flex justify-between"><span className="font-medium">{f.q}</span><span className="text-teal-deep">{openFAQ === i ? "−" : "+"}</span></div>
                    {openFAQ === i && <p className="mt-2 text-sm text-muted">{f.a}</p>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <aside className="space-y-4">
          <GlassCard>
            <h4 className="font-display font-semibold">Related Services</h4>
            <ul className="mt-3 space-y-2">
              {related.map((r) => (
                <li key={r.id}><a href={`/services/${r.slug}`} className="block rounded-xl p-3 hover:bg-white/60"><p className="font-medium text-sm">{pick(r.title)}</p><p className="text-xs text-muted line-clamp-1">{pick(r.excerpt)}</p></a></li>
              ))}
            </ul>
          </GlassCard>
          <div className="rounded-3xl bg-teal-gradient text-white p-6">
            <h4 className="font-display text-lg font-bold">Mulai proyek Anda</h4>
            <p className="mt-1 text-sm text-white/90">Diskusi gratis dengan tim kami.</p>
            <LinkButton to="/contact" variant="outline" arrow className="mt-4 !bg-white !text-ink">Hubungi Kami</LinkButton>
          </div>
        </aside>
      </section>
    </>
  );
}
