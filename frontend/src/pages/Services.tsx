import { Link } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { GlassCard, SectionHeader, SectionLabel } from "@/components/GlassCard";
import { LinkButton } from "@/components/Button";
import { useLang } from "@/contexts/LangContext";
import { useData } from "@/contexts/DataContext";
import { Check } from "lucide-react";
import { useState } from "react";

const PROCESS = [
  { n: "01", t: "Discovery" }, { n: "02", t: "Strategy" }, { n: "03", t: "Design" },
  { n: "04", t: "Development" }, { n: "05", t: "Launch & Optimize" },
];

export default function Services() {
  const { lang, pick, t } = useLang();
  const { services } = useData();
  const featured = services.find((s) => s.featured) ?? services[0];
  const others = services.filter((s) => s.id !== featured?.id);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const faqs = [
    { q: "Berapa lama waktu pengerjaan proyek?", a: "Tergantung lingkup, umumnya 4–10 minggu." },
    { q: "Apakah harga bisa disesuaikan?", a: "Ya, kami menyesuaikan dengan kebutuhan." },
    { q: "Apakah ada support setelah proyek selesai?", a: "Tentu, kami menyediakan paket maintenance." },
    { q: "Teknologi apa yang digunakan?", a: "Stack modern: React, Next.js, Node.js, dll." },
  ];

  return (
    <>
      <Hero
        eyebrow={<SectionLabel>Digital Solutions</SectionLabel>}
        title={<>{lang === "id" ? "Layanan Digital" : "Digital Services"} <span className="text-teal-gradient">{lang === "id" ? "End-to-End" : "End-to-End"}</span></>}
        subtitle={lang === "id" ? "Kami menyediakan layanan digital terintegrasi untuk membantu bisnis tumbuh dengan solusi tepat, inovatif, dan terukur." : "Integrated digital services to help business grow with the right, innovative, measurable solutions."}
        actions={<LinkButton to="/contact" arrow>{t("cta_consult")}</LinkButton>}
        visual={
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80" alt="" className="rounded-3xl w-full" />
            <div className="absolute -bottom-4 -left-4 glass-strong rounded-2xl px-4 py-3 animate-float">
              <p className="text-xs text-muted">Business Growth</p>
              <p className="font-display text-xl font-bold text-teal-deep">+127%</p>
            </div>
            <div className="absolute -top-4 -right-4 glass-strong rounded-2xl px-4 py-3">
              <p className="text-xs text-muted">Client Satisfaction</p>
              <p className="font-display text-xl font-bold text-teal-deep">98%</p>
            </div>
          </div>
        }
      />

      {/* Featured + list */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-6">
          {featured && (
            <Link to={`/services/${featured.slug}`} className="rounded-3xl bg-teal-gradient text-white p-8 relative overflow-hidden group">
              <SectionLabel>Layanan Unggul</SectionLabel>
              <h3 className="mt-4 font-display text-3xl font-bold">{pick(featured.title)}</h3>
              <p className="mt-3 text-white/90 max-w-md">{pick(featured.description)}</p>
              <ul className="mt-6 space-y-2">
                {featured.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm"><Check className="size-4 mt-0.5" />{f}</li>
                ))}
              </ul>
              <span className="mt-6 inline-flex glass-dark rounded-full px-5 py-2 text-sm">Lihat Detail Layanan →</span>
            </Link>
          )}
          <div className="grid sm:grid-cols-2 gap-3">
            {others.slice(0, 6).map((s) => (
              <Link key={s.id} to={`/services/${s.slug}`} className="rounded-2xl glass p-5 hover:-translate-y-1 transition">
                <div className="size-10 rounded-xl bg-teal/15 grid place-items-center text-teal-deep mb-3 font-display font-bold">{pick(s.title).charAt(0)}</div>
                <h4 className="font-display font-semibold">{pick(s.title)}</h4>
                <p className="mt-1 text-xs text-muted line-clamp-2">{pick(s.excerpt)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeader eyebrow="How We Work" title={lang === "id" ? "Proses kerja yang transparan" : "A transparent process"} />
        <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-6">
          {PROCESS.map((p) => (
            <div key={p.n} className="text-center">
              <div className="mx-auto size-12 rounded-full glass grid place-items-center text-teal-deep font-display font-bold">{p.n}</div>
              <p className="mt-3 font-display font-semibold">{p.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeader eyebrow="Mengapa Memilih Kami" title="What You Get" />
        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-cream/50 p-6">
            <p className="font-display text-lg font-semibold text-teal-deep">Bersama ByteCorner.id</p>
            <ul className="mt-4 space-y-2 text-sm">
              {["Strategi digital yang terukur","Desain modern & berorientasi konversi","Teknologi terbaru & performa cepat","Tim profesional & berpengalaman","Support berkelanjutan","Hasil yang memberikan dampak nyata"].map((x) => (
                <li key={x} className="flex gap-2"><Check className="size-4 text-teal-deep mt-0.5" />{x}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl glass p-6">
            <p className="font-display text-lg font-semibold">Agensi Lain</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {["Tanpa strategi yang jelas","Desain generik & pasaran","Teknologi usang & lambat","Tim tidak berpengalaman","Support terbatas","Hasil kurang optimal"].map((x) => (
                <li key={x} className="flex gap-2"><span className="size-4 rounded-full border mt-0.5" />{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeader eyebrow="Pertanyaan Umum" title="FAQ" />
        <div className="mt-8 grid gap-3 max-w-3xl">
          {faqs.map((f, i) => (
            <button key={i} onClick={() => setOpenFAQ(openFAQ === i ? null : i)} className="rounded-2xl glass p-5 text-left">
              <div className="flex justify-between gap-3 items-center">
                <p className="font-medium">{f.q}</p>
                <span className="text-teal-deep">{openFAQ === i ? "−" : "+"}</span>
              </div>
              {openFAQ === i && <p className="mt-2 text-sm text-muted">{f.a}</p>}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-3xl bg-brand-gradient p-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold">Siap Memulai Proyek Digital?</h3>
            <p className="mt-2 text-ink/70">Diskusikan kebutuhan Anda dan temukan solusi terbaik.</p>
          </div>
          <LinkButton to="/contact" arrow size="lg">{t("cta_start_project")}</LinkButton>
        </div>
      </section>
    </>
  );
}
