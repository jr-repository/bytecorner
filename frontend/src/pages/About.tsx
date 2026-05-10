import { Hero } from "@/components/Hero";
import { SectionHeader, SectionLabel, GlassCard } from "@/components/GlassCard";
import { LinkButton } from "@/components/Button";
import { useLang } from "@/contexts/LangContext";
import {
  Heart, Sparkles, Target, Users, Eye, Compass, ShieldCheck, Zap,
  Lightbulb, Trophy, Rocket, MessageSquare, PenTool, Code2, BarChart3,
  Linkedin, Mail, Quote,
} from "lucide-react";

const BYTECORNER_LOGO = "https://gallery.bytecorner.site/uploads/2026-05-09/80635211a9ef6f4cde714c92fa9a3a2c_1778356173.png";

export default function About() {
  const { lang } = useLang();
  return (
    <>
      <Hero
        eyebrow={<SectionLabel>{lang === "id" ? "Tentang Kami" : "About Us"}</SectionLabel>}
        title={lang === "id" ? <>Membangun bisnis digital <span className="text-teal-gradient">bersama Anda</span></> : <>Building digital businesses <span className="text-teal-gradient">with you</span></>}
        subtitle={lang === "id" ? "ByteCorner.id adalah agency digital yang lahir dari keyakinan bahwa setiap brand berhak punya kehadiran digital yang kuat." : "ByteCorner.id was born from the belief that every brand deserves a strong digital presence."}
        compact
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img src="https://gallery.bytecorner.site/uploads/2026-05-10/1cba393860b8e9a5f80b5a4690b0a9b4_1778400657.png" alt="" className="rounded-3xl w-full object-cover aspect-[4/3]" />
          <div>
            <SectionHeader eyebrow="Our Story" title={lang === "id" ? "Cerita di balik ByteCorner.id" : "The story behind ByteCorner.id"} subtitle={lang === "id" ? "Berdiri sejak 2019, kami telah membantu lebih dari 100 brand membangun kehadiran digital yang berdampak. Setiap proyek adalah perjalanan kolaborasi." : "Since 2019, we've helped 100+ brands build impactful digital presence. Every project is a collaborative journey."} />
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[["150+", "Projects"], ["5+", "Years"], ["98%", "Satisfaction"], ["100+", "Clients"]].map(([v, l]) => (
                <GlassCard key={v} className="!p-5">
                  <p className="font-display text-2xl font-bold text-teal-deep">{v}</p>
                  <p className="text-xs text-muted">{l}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeader align="center" eyebrow="Core Values" title={lang === "id" ? "Nilai yang kami pegang" : "Values we live by"} />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { i: Heart, t: "Empathy", d: "Kami memahami sebelum membangun." },
            { i: Sparkles, t: "Craftsmanship", d: "Detail adalah identitas kami." },
            { i: Target, t: "Impact", d: "Hasil nyata yang terukur." },
            { i: Users, t: "Partnership", d: "Tumbuh bersama klien." },
          ].map(({ i: Icon, t, d }) => (
            <GlassCard key={t}>
              <div className="size-12 rounded-xl bg-teal/15 grid place-items-center text-teal-deep mb-4"><Icon className="size-5" /></div>
              <h4 className="font-display font-semibold">{t}</h4>
              <p className="mt-1 text-sm text-muted">{d}</p>
            </GlassCard>
          ))}
        </div>
      </section>


      {/* Filosofi ByteCorner */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          align="center"
          eyebrow="Brand Philosophy"
          title={lang === "id" ? "Filosofi ByteCorner" : "The ByteCorner Philosophy"}
          subtitle={lang === "id" ? "Setiap elemen dari nama dan logo kami memiliki makna yang mendalam." : "Every element of our name and logo carries deep meaning."}
        />
        <div className="mt-12 grid lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-2 relative">
            <div className="absolute inset-0 bg-brand-gradient rounded-[2.5rem] blur-3xl opacity-40" />
            <div className="relative glass-strong rounded-[2rem] p-10 flex items-center justify-center aspect-square">
              <div className="absolute inset-6 rounded-[1.5rem] bg-gradient-to-br from-white/40 to-teal/10 border border-white/60" />
              <img src={BYTECORNER_LOGO} alt="ByteCorner.id Logo" className="relative w-3/5 object-contain animate-float drop-shadow-xl" />
            </div>
            <div className="absolute -bottom-4 -right-4 size-24 rounded-3xl bg-teal-gradient shadow-brand opacity-90 hidden md:block" />
            {/* <div className="absolute -top-4 -left-4 size-16 rounded-2xl bg-ink shadow-lg hidden md:block" /> */}
          </div>
          <div className="lg:col-span-3 space-y-5">
            <GlassCard>
              <div className="flex items-start gap-4">
                <div className="size-11 rounded-xl bg-ink text-white grid place-items-center shrink-0"><Code2 className="size-5" /></div>
                <div>
                  <h4 className="font-display text-xl font-semibold">Byte</h4>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{lang === "id" ? "Mewakili teknologi, kode, sistem, dan transformasi digital — fondasi setiap solusi yang kami bangun." : "Represents technology, code, systems, and digital transformation — the foundation of every solution we build."}</p>
                </div>
              </div>
            </GlassCard>
            <GlassCard>
              <div className="flex items-start gap-4">
                <div className="size-11 rounded-xl bg-teal-gradient text-white grid place-items-center shrink-0"><Compass className="size-5" /></div>
                <div>
                  <h4 className="font-display text-xl font-semibold">Corner</h4>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{lang === "id" ? "Ruang strategis tempat ide, brand, dan tujuan bisnis dibentuk menjadi solusi digital yang berdampak." : "A strategic space where ideas, brands, and business goals are shaped into impactful digital solutions."}</p>
                </div>
              </div>
            </GlassCard>
            <div className="grid sm:grid-cols-3 gap-3">
              <GlassCard className="!p-4">
                <div className="size-3 rounded-full bg-ink mb-3" />
                <p className="text-xs font-semibold uppercase tracking-wider text-ink">{lang === "id" ? "Sisi Gelap" : "Dark Side"}</p>
                <p className="mt-1 text-xs text-muted">{lang === "id" ? "Fondasi kuat, profesionalisme, stabilitas." : "Strong foundation, professionalism, stability."}</p>
              </GlassCard>
              <GlassCard className="!p-4">
                <div className="size-3 rounded-full bg-teal mb-3" />
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-deep">{lang === "id" ? "Sisi Cyan" : "Cyan Side"}</p>
                <p className="mt-1 text-xs text-muted">{lang === "id" ? "Inovasi, kreativitas, pertumbuhan digital modern." : "Innovation, creativity, modern digital growth."}</p>
              </GlassCard>
              <GlassCard className="!p-4">
                <div className="h-3 w-6 rounded-full bg-gradient-to-r from-ink to-teal mb-3" />
                <p className="text-xs font-semibold uppercase tracking-wider text-ink">{lang === "id" ? "Bentuk Lengkung" : "Curved Shape"}</p>
                <p className="mt-1 text-xs text-muted">{lang === "id" ? "Fleksibilitas, kolaborasi, solusi adaptif." : "Flexibility, collaboration, adaptive solutions."}</p>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeader align="center" eyebrow="Vision & Mission" title={lang === "id" ? "Arah dan tujuan kami" : "Our direction and purpose"} />
        <div className="mt-10 grid lg:grid-cols-2 gap-6">
          <div className="relative rounded-3xl bg-brand-gradient p-8 overflow-hidden">
            <div className="absolute -right-10 -top-10 size-48 rounded-full bg-white/30 blur-2xl" />
            <div className="relative">
              <h3 className="font-display text-2xl font-bold">{lang === "id" ? "Visi" : "Vision"}</h3>
              <p className="mt-3 text-ink/80 leading-relaxed">{lang === "id" ? "Menjadi mitra digital terpercaya yang membantu brand Indonesia tumbuh dan bersaing di panggung global melalui teknologi dan kreativitas." : "To become a trusted digital partner that helps Indonesian brands grow and compete globally through technology and creativity."}</p>
            </div>
          </div>
          <GlassCard className="!p-8">
            <h3 className="font-display text-2xl font-bold">{lang === "id" ? "Misi" : "Mission"}</h3>
            <ul className="mt-4 space-y-3">
              {[
                lang === "id" ? "Memberikan solusi digital end-to-end yang strategis dan terukur." : "Deliver end-to-end strategic and measurable digital solutions.",
                lang === "id" ? "Menumbuhkan kolaborasi jangka panjang dengan setiap klien." : "Foster long-term collaboration with every client.",
                lang === "id" ? "Mendorong inovasi dengan teknologi dan desain modern." : "Drive innovation through modern technology and design.",
                lang === "id" ? "Membangun tim yang berempati, kreatif, dan berdampak." : "Build a team that is empathetic, creative, and impactful.",
              ].map((m) => (
                <li key={m} className="flex items-start gap-3 text-sm text-ink/80">
                  <span className="mt-1 size-2 rounded-full bg-teal-gradient shrink-0" />{m}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* Why Choose ByteCorner */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeader align="center" eyebrow="Why Choose Us" title={lang === "id" ? "Mengapa memilih ByteCorner?" : "Why choose ByteCorner?"} />
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { i: ShieldCheck, t: lang === "id" ? "Tim Berpengalaman" : "Experienced Team", d: lang === "id" ? "Profesional lintas disiplin dengan jam terbang nyata." : "Cross-disciplinary professionals with real expertise." },
            { i: Zap, t: lang === "id" ? "Eksekusi Cepat" : "Fast Execution", d: lang === "id" ? "Sprint mingguan, transparan, dan terukur." : "Weekly sprints, transparent, and measurable." },
            { i: Lightbulb, t: lang === "id" ? "Pendekatan Strategis" : "Strategic Approach", d: lang === "id" ? "Tidak sekadar membangun — kami menyusun strategi." : "We don't just build — we strategize first." },
            { i: Sparkles, t: lang === "id" ? "Desain Premium" : "Premium Design", d: lang === "id" ? "Estetika modern yang memperkuat brand Anda." : "Modern aesthetics that elevate your brand." },
            { i: Trophy, t: lang === "id" ? "Hasil Terukur" : "Measurable Results", d: lang === "id" ? "Setiap proyek dievaluasi dengan KPI yang jelas." : "Every project is evaluated with clear KPIs." },
            { i: Heart, t: lang === "id" ? "Dukungan Penuh" : "Full Support", d: lang === "id" ? "Pendampingan setelah peluncuran tanpa batas waktu." : "Post-launch support without arbitrary limits." },
          ].map(({ i: Icon, t, d }) => (
            <GlassCard key={t} className="group hover:-translate-y-1 transition-transform">
              <div className="size-12 rounded-xl bg-gradient-to-br from-cream to-teal/30 grid place-items-center text-teal-deep mb-4 group-hover:scale-110 transition-transform"><Icon className="size-5" /></div>
              <h4 className="font-display text-lg font-semibold">{t}</h4>
              <p className="mt-1 text-sm text-muted leading-relaxed">{d}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeader align="center" eyebrow="How We Work" title={lang === "id" ? "Alur kerja kami" : "Our workflow"} subtitle={lang === "id" ? "Proses kolaboratif lima tahap yang mengubah ide menjadi produk digital." : "A five-stage collaborative process that turns ideas into digital products."} />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { i: MessageSquare, t: "Discovery", d: lang === "id" ? "Riset, brief, dan pemahaman mendalam." : "Research, brief, and deep understanding." },
            { i: Lightbulb, t: "Strategy", d: lang === "id" ? "Perencanaan dan arah kreatif." : "Planning and creative direction." },
            { i: PenTool, t: "Design", d: lang === "id" ? "UI/UX dan visual yang konsisten." : "Consistent UI/UX and visuals." },
            { i: Code2, t: "Develop", d: lang === "id" ? "Implementasi modern dan stabil." : "Modern and stable implementation." },
            { i: BarChart3, t: "Launch & Grow", d: lang === "id" ? "Peluncuran, optimasi, dan pertumbuhan." : "Launch, optimization, and growth." },
          ].map(({ i: Icon, t, d }, idx) => (
            <div key={t} className="relative">
              <GlassCard className="h-full !p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="size-10 rounded-xl bg-teal-gradient text-white grid place-items-center"><Icon className="size-5" /></div>
                  <span className="font-display text-2xl font-bold text-teal-deep/30">0{idx + 1}</span>
                </div>
                <h4 className="font-display font-semibold">{t}</h4>
                <p className="mt-1 text-xs text-muted leading-relaxed">{d}</p>
              </GlassCard>
              {idx < 4 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-teal to-transparent" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeader align="center" eyebrow="Our Journey" title={lang === "id" ? "Perjalanan ByteCorner" : "ByteCorner's journey"} />
        <div className="mt-12 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal via-teal-deep to-transparent md:-translate-x-px" />
          {[
            { y: "2019", t: lang === "id" ? "Awal Perjalanan" : "The Beginning", d: lang === "id" ? "ByteCorner.id berdiri sebagai studio kecil dengan misi besar." : "ByteCorner.id founded as a small studio with a big mission." },
            { y: "2021", t: lang === "id" ? "Ekspansi Layanan" : "Service Expansion", d: lang === "id" ? "Menambahkan layanan branding dan pengembangan web menyeluruh." : "Added branding and full web development services." },
            { y: "2023", t: lang === "id" ? "100+ Klien" : "100+ Clients", d: lang === "id" ? "Mencapai 100 klien lintas industri di Indonesia." : "Reached 100 clients across industries in Indonesia." },
            { y: "2025", t: lang === "id" ? "Transformasi Digital" : "Digital Transformation", d: lang === "id" ? "Fokus pada produk digital, AI, dan otomasi bisnis." : "Focus on digital products, AI, and business automation." },
            { y: "2026", t: lang === "id" ? "Go Global" : "Going Global", d: lang === "id" ? "Memulai kolaborasi dengan klien internasional." : "Beginning collaborations with international clients." },
          ].map((m, idx) => (
            <div key={m.y} className={`relative mb-8 md:mb-12 md:grid md:grid-cols-2 md:gap-12 ${idx % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}>
              <div className={`pl-12 md:pl-0 ${idx % 2 === 0 ? "md:text-right md:pr-8" : "md:pl-8"}`}>
                <GlassCard>
                  <p className="font-display text-2xl font-bold text-teal-gradient">{m.y}</p>
                  <h4 className="mt-1 font-display text-lg font-semibold">{m.t}</h4>
                  <p className="mt-1 text-sm text-muted">{m.d}</p>
                </GlassCard>
              </div>
              <div className="hidden md:block" />
              <div className="absolute left-4 md:left-1/2 top-6 size-4 rounded-full bg-teal-gradient ring-4 ring-white shadow-brand md:-translate-x-1/2" />
            </div>
          ))}
        </div>
      </section>

      {/* Founder / Team */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeader align="center" eyebrow="Meet The Team" title={lang === "id" ? "Orang-orang di balik ByteCorner" : "The people behind ByteCorner"} />
        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 relative rounded-3xl bg-brand-gradient p-8 overflow-hidden">
            <div className="absolute -bottom-12 -right-12 size-56 rounded-full bg-white/30 blur-2xl" />
            <div className="relative grid sm:grid-cols-[auto_1fr] gap-6 items-center">
              <div className="relative">
                <div className="size-32 rounded-3xl glass-strong grid place-items-center">
                  <img src={BYTECORNER_LOGO} alt="" className="w-2/3 object-contain" />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-deep">Founder & CEO</p>
                <h3 className="mt-1 font-display text-2xl font-bold">BytePoeople.</h3>
                <p className="mt-2 text-sm text-ink/70 leading-relaxed">{lang === "id" ? "“Kami percaya teknologi terbaik adalah yang membuat bisnis tumbuh tanpa kompromi pada estetika dan pengalaman pengguna.”" : "“We believe the best technology grows businesses without compromising aesthetics and user experience.”"}</p>
                <div className="mt-4 flex gap-2">
                  <a href="#" className="size-9 rounded-full glass grid place-items-center hover:bg-white"><Linkedin className="size-4 text-teal-deep" /></a>
                  <a href="#" className="size-9 rounded-full glass grid place-items-center hover:bg-white"><Mail className="size-4 text-teal-deep" /></a>
                </div>
              </div>
            </div>
          </div>
          <GlassCard className="!p-8 flex flex-col">
            <Quote className="size-8 text-teal-deep/40" />
            <p className="mt-3 text-sm text-ink/80 leading-relaxed flex-1">{lang === "id" ? "Tim kami terdiri dari desainer, developer, strategist, dan content creator yang bekerja sebagai satu unit terpadu." : "Our team consists of designers, developers, strategists, and content creators working as one integrated unit."}</p>
            <div className="mt-5 flex -space-x-3">
              {[1,2,3,4,5].map((n) => (
                <div key={n} className="size-10 rounded-full bg-gradient-to-br from-cream to-teal ring-2 ring-white grid place-items-center text-xs font-semibold text-ink">
                  {String.fromCharCode(64 + n)}
                </div>
              ))}
              <div className="size-10 rounded-full glass-strong ring-2 ring-white grid place-items-center text-xs font-semibold text-teal-deep">+12</div>
            </div>
            <p className="mt-3 text-xs text-muted">{lang === "id" ? "17 talenta digital aktif di tim inti." : "17 active digital talents in our core team."}</p>
          </GlassCard>
        </div>
      </section>

      {/* Stronger Final CTA */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-3xl bg-brand-gradient p-10 text-center">
          <h3 className="font-display text-3xl font-bold">{lang === "id" ? "Mari berkolaborasi" : "Let's collaborate"}</h3>
          <p className="mt-2 text-ink/70 max-w-xl mx-auto">{lang === "id" ? "Diskusikan ide Anda dengan tim kami." : "Discuss your idea with our team."}</p>
          <LinkButton to="/contact" arrow className="mt-6">{lang === "id" ? "Hubungi Kami" : "Contact Us"}</LinkButton>
        </div>
      </section>

      {/* Big CTA Banner */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink p-10 md:p-14 text-white">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-teal-gradient blur-3xl opacity-50" />
          <div className="absolute -left-20 -bottom-20 size-72 rounded-full bg-cream blur-3xl opacity-30" />
          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <SectionLabel>
                <span className="text-white">
                  {lang === "id" ? "Siap Berkembang?" : "Ready to grow?"}
                </span>
              </SectionLabel>              
              <h3 className="mt-4 font-display text-3xl md:text-4xl font-bold leading-tight">
                {lang === "id" ? <>Wujudkan brand digital Anda <span className="text-teal-gradient">bersama ByteCorner</span></> : <>Build your digital brand <span className="text-teal-gradient">with ByteCorner</span></>}
              </h3>
              <p className="mt-3 text-white/70 max-w-lg">{lang === "id" ? "Konsultasi awal gratis. Kami bantu memetakan langkah digital terbaik untuk bisnis Anda." : "Free initial consultation. We'll help map the best digital path for your business."}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <LinkButton to="/contact" arrow>{lang === "id" ? "Konsultasi Gratis" : "Free Consultation"}</LinkButton>
                <LinkButton to="/portfolio" variant="outline" className="!text-white !bg-white/10 hover:!bg-white/20">{lang === "id" ? "Lihat Portofolio" : "View Portfolio"}</LinkButton>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: "100+", l: lang === "id" ? "Klien Bahagia" : "Happy Clients" },
                { v: "150+", l: lang === "id" ? "Proyek Selesai" : "Projects Done" },
                { v: "5+", l: lang === "id" ? "Tahun Berkarya" : "Years Active" },
                { v: "24/7", l: "Support" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-5">
                  <p className="font-display text-2xl font-bold text-teal-gradient">{s.v}</p>
                  <p className="mt-1 text-xs text-white/70">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mt-8 flex items-center gap-3 text-white/60">
            <Rocket className="size-4" />
            <p className="text-xs">{lang === "id" ? "Bergerak cepat. Berdampak nyata." : "Move fast. Make impact."}</p>
          </div>
        </div>
      </section>
    </>
  );
}
