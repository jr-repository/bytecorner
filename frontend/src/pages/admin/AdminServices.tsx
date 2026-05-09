import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/Button";
import { ImageInput } from "@/components/ImageInput";
import { PageHeader } from "@/components/admin/PageHeader";
import { Modal } from "@/components/admin/Modal";
import { Pencil, Trash2, Plus, Briefcase } from "lucide-react";
import { toast } from "sonner";
import type { Service } from "@/lib/storage";

const empty = (): Service => ({
  id: crypto.randomUUID(),
  slug: "new-service",
  category: "Web",
  title: { id: "Layanan Baru", en: "New Service" },
  excerpt: { id: "", en: "" },
  description: { id: "", en: "" },
  icon: "Sparkles",
  image: "",
  features: [],
  faq: [],
  status: "draft",
});

export default function AdminServices() {
  const { services, setServices } = useData();
  const [editing, setEditing] = useState<Service | null>(null);

  const save = () => {
    if (!editing) return;
    const exists = services.some((s) => s.id === editing.id);
    setServices(exists ? services.map((s) => (s.id === editing.id ? editing : s)) : [editing, ...services]);
    setEditing(null);
    toast.success("Service saved");
  };

  return (
    <>
      <PageHeader
        title="Services"
        description="Manage the services your agency offers. Published items appear on the public site."
        icon={<Briefcase className="size-5" />}
        action={
          <Button onClick={() => setEditing(empty())}>
            <Plus className="w-4 h-4" /> New Service
          </Button>
        }
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {services.map((s) => (
          <div key={s.id} className="glass-strong rounded-2xl p-5 flex flex-col gap-3 hover:-translate-y-0.5 transition">
            <div className="aspect-video rounded-xl bg-brand-soft overflow-hidden">
              {s.image ? <img src={s.image} alt={s.title.en} className="w-full h-full object-cover" /> : <div className="w-full h-full grid place-items-center text-muted text-xs">No image</div>}
            </div>
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold truncate">{s.title.en}</h3>
                <p className="text-xs text-muted mt-0.5">{s.category}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${s.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                {s.status}
              </span>
            </div>
            <p className="text-sm text-muted line-clamp-2">{s.excerpt.en || s.excerpt.id}</p>
            <div className="flex gap-1 mt-auto pt-2 border-t border-ink/5">
              <button onClick={() => setEditing(s)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-white/60 text-sm">
                <Pencil className="size-3.5" /> Edit
              </button>
              <button onClick={() => { setServices(services.filter((x) => x.id !== s.id)); toast.success("Deleted"); }} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-red-50 text-sm text-destructive">
                <Trash2 className="size-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={!!editing}
        title={editing && services.some((s) => s.id === editing.id) ? "Edit Service" : "New Service"}
        description="Bilingual content shown on the public services pages."
        onClose={() => setEditing(null)}
        onSave={save}
      >
        {editing && (
          <div className="space-y-5">
            <section className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">General</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="field-group"><label className="form-label">Slug</label><input className="glass-input" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} /></div>
                <div className="field-group"><label className="form-label">Category</label><input className="glass-input" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} /></div>
                <div className="field-group"><label className="form-label">Icon (Lucide name)</label><input className="glass-input" value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} /></div>
                <div className="field-group"><label className="form-label">Status</label>
                  <select className="glass-input" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as Service["status"] })}>
                    <option value="draft">Draft</option><option value="published">Published</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Content</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="field-group"><label className="form-label">Title (ID)</label><input className="glass-input" value={editing.title.id} onChange={(e) => setEditing({ ...editing, title: { ...editing.title, id: e.target.value } })} /></div>
                <div className="field-group"><label className="form-label">Title (EN)</label><input className="glass-input" value={editing.title.en} onChange={(e) => setEditing({ ...editing, title: { ...editing.title, en: e.target.value } })} /></div>
                <div className="field-group sm:col-span-2"><label className="form-label">Excerpt (EN)</label><textarea rows={2} className="glass-input" value={editing.excerpt.en} onChange={(e) => setEditing({ ...editing, excerpt: { ...editing.excerpt, en: e.target.value, id: editing.excerpt.id || e.target.value } })} /></div>
                <div className="field-group sm:col-span-2"><label className="form-label">Description (EN)</label><textarea rows={4} className="glass-input" value={editing.description.en} onChange={(e) => setEditing({ ...editing, description: { ...editing.description, en: e.target.value, id: editing.description.id || e.target.value } })} /></div>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Cover Image</h3>
              <ImageInput value={editing.image} onChange={(v) => setEditing({ ...editing, image: v })} />
            </section>
          </div>
        )}
      </Modal>
    </>
  );
}
