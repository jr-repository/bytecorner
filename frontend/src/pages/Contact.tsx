import { Hero } from "@/components/Hero";
import { GlassCard, SectionLabel } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import { useLang } from "@/contexts/LangContext";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";
import { WHATSAPP_PHONE_DISPLAY, whatsappUrl } from "@/lib/whatsapp";

export default function Contact() {
  const { lang, pick } = useLang();
  const { services } = useData();
  const [form, setForm] = useState({ name: "", email: "", subject: "", service: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const service = form.service || "Other";
    const message = [
      "Halo ByteCorner.id, saya ingin berkonsultasi.",
      "",
      `Nama: ${form.name}`,
      `Email: ${form.email}`,
      `Service: ${service}`,
      `Subject: ${form.subject || "-"}`,
      `Pesan: ${form.message}`,
    ].join("\n");
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    toast.success(lang === "id" ? "WhatsApp dibuka dengan pesan Anda." : "WhatsApp opened with your message.");
    setForm({ name: "", email: "", subject: "", service: "", message: "" });
  };
  return (
    <>
      <Hero
        compact
        eyebrow={<SectionLabel>{lang === "id" ? "Hubungi Kami" : "Contact"}</SectionLabel>}
        title={<>{lang === "id" ? "Mari mulai" : "Let's start"} <span className="text-teal-gradient">{lang === "id" ? "proyek Anda" : "your project"}</span></>}
        subtitle={lang === "id" ? "Tim kami siap mendiskusikan kebutuhan digital Anda." : "Our team is ready to discuss your digital needs."}
      />
      <section className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <GlassCard>
            <h4 className="font-display font-semibold">Office</h4>
            <p className="mt-2 text-sm text-muted flex gap-2"><MapPin className="size-4 mt-0.5 text-teal-deep" />Jl. Sudirman No.123, Jakarta Selatan, Indonesia 12190</p>
          </GlassCard>
          <GlassCard>
            <h4 className="font-display font-semibold">Email</h4>
            <p className="mt-2 text-sm flex gap-2"><Mail className="size-4 mt-0.5 text-teal-deep" />hello@bytecorner.id</p>
          </GlassCard>
          <GlassCard>
            <h4 className="font-display font-semibold">Phone</h4>
            <a href={whatsappUrl("Halo ByteCorner.id, saya ingin berkonsultasi.")} target="_blank" rel="noreferrer" className="mt-2 text-sm flex gap-2 hover:text-teal-deep"><Phone className="size-4 mt-0.5 text-teal-deep" />{WHATSAPP_PHONE_DISPLAY}</a>
          </GlassCard>
        </div>
        <div className="lg:col-span-2">
          <GlassCard>
            <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Nama" className="rounded-xl border border-ink/10 px-4 py-3 bg-white text-sm" />
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required type="email" placeholder="Email" className="rounded-xl border border-ink/10 px-4 py-3 bg-white text-sm" />
              <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject" className="sm:col-span-2 rounded-xl border border-ink/10 px-4 py-3 bg-white text-sm" />
              <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="sm:col-span-2 rounded-xl border border-ink/10 px-4 py-3 bg-white text-sm">
                <option value="">Other</option>
                {services.map((service) => <option key={service.id} value={pick(service.title)}>{pick(service.title)}</option>)}
              </select>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required placeholder="Pesan Anda" rows={6} className="sm:col-span-2 rounded-xl border border-ink/10 px-4 py-3 bg-white text-sm" />
              <div className="sm:col-span-2"><Button type="submit" arrow>Kirim Pesan</Button></div>
            </form>
          </GlassCard>
          <div className="mt-4 rounded-3xl overflow-hidden h-64 bg-soft">
            <iframe title="map" className="w-full h-full" src="https://maps.google.com/maps?q=Jakarta&t=&z=11&ie=UTF8&iwloc=&output=embed" />
          </div>
        </div>
      </section>
    </>
  );
}
