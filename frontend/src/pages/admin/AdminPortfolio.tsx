import { useMemo, useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/Button";
import { ImageInput, MultiImageInput } from "@/components/ImageInput";
import { PageHeader } from "@/components/admin/PageHeader";
import { Modal } from "@/components/admin/Modal";
import { Pencil, Trash2, Plus, FolderOpen } from "lucide-react";
import { toast } from "sonner";
import type { PortfolioItem } from "@/lib/storage";

const empty = (): PortfolioItem => ({
  id: crypto.randomUUID(),
  slug: "new-project",
  client: "Client",
  category: "Web",
  title: { id: "Proyek Baru", en: "New Project" },
  description: { id: "", en: "" },
  overview: { id: "", en: "" },
  challenge: { id: "", en: "" },
  solution: { id: "", en: "" },
  techStack: [],
  date: new Date().toISOString().slice(0, 10),
  cover: "",
  gallery: [],
  status: "draft",
});

const TABS = ["General", "Content", "Media"] as const;

export default function AdminPortfolio() {
  const { portfolio, setPortfolio } = useData();
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [tab, setTab] = useState<(typeof TABS)[number]>("General");
  const categories = useMemo(() => Array.from(new Set(portfolio.map((p) => p.category).filter(Boolean))).sort(), [portfolio]);

  const open = (item: PortfolioItem) => { setEditing(item); setTab("General"); };

  const save = () => {
    if (!editing) return;
    const exists = portfolio.some((p) => p.id === editing.id);
    setPortfolio(exists ? portfolio.map((p) => (p.id === editing.id ? editing : p)) : [editing, ...portfolio]);
    setEditing(null);
    toast.success("Saved");
  };

  return (
    <>
      <PageHeader
        title="Portfolio"
        description="Showcase your best work. Each project supports gallery, tech stack and bilingual content."
        icon={<FolderOpen className="size-5" />}
        action={<Button onClick={() => open(empty())}><Plus className="w-4 h-4" /> New Project</Button>}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {portfolio.map((p) => (
          <div key={p.id} className="glass-strong rounded-2xl overflow-hidden hover:-translate-y-0.5 transition flex flex-col">
            <div className="aspect-video bg-brand-soft">
              {p.cover ? <img src={p.cover} alt={p.title.en} className="w-full h-full object-cover" /> : <div className="w-full h-full grid place-items-center text-muted text-xs">No cover</div>}
            </div>
            <div className="p-4 flex flex-col gap-2 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold truncate">{p.title.en}</h3>
                  <p className="text-xs text-muted truncate">{p.client} · {p.category}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${p.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{p.status}</span>
              </div>
              <div className="flex gap-1 mt-auto pt-2 border-t border-ink/5">
                <button onClick={() => open(p)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-white/60 text-sm"><Pencil className="size-3.5" /> Edit</button>
                <button onClick={() => { setPortfolio(portfolio.filter((x) => x.id !== p.id)); toast.success("Deleted"); }} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-red-50 text-sm text-destructive"><Trash2 className="size-3.5" /> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={!!editing}
        title={editing && portfolio.some((p) => p.id === editing.id) ? "Edit Project" : "New Project"}
        description="Project details, content sections and gallery images."
        onClose={() => setEditing(null)}
        onSave={save}
        size="xl"
      >
        {editing && (
          <div className="space-y-5">
            <div className="flex gap-1 p-1 rounded-full bg-soft w-fit">
              {TABS.map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${tab === t ? "bg-white shadow text-ink" : "text-muted"}`}>{t}</button>
              ))}
            </div>

            {tab === "General" && (
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="field-group"><label className="form-label">Slug</label><input className="glass-input" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} /></div>
                <div className="field-group"><label className="form-label">Client</label><input className="glass-input" value={editing.client} onChange={(e) => setEditing({ ...editing, client: e.target.value })} /></div>
                <div className="field-group"><label className="form-label">Category</label><input list="portfolio-category-options" className="glass-input" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} /><datalist id="portfolio-category-options">{categories.map((category) => <option key={category} value={category} />)}</datalist></div>
                <div className="field-group"><label className="form-label">Date</label><input type="date" className="glass-input" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} /></div>
                <div className="field-group"><label className="form-label">Title (ID)</label><input className="glass-input" value={editing.title.id} onChange={(e) => setEditing({ ...editing, title: { ...editing.title, id: e.target.value } })} /></div>
                <div className="field-group"><label className="form-label">Title (EN)</label><input className="glass-input" value={editing.title.en} onChange={(e) => setEditing({ ...editing, title: { ...editing.title, en: e.target.value } })} /></div>
                <div className="field-group"><label className="form-label">Live URL</label><input className="glass-input" value={editing.url || ""} onChange={(e) => setEditing({ ...editing, url: e.target.value })} placeholder="https://…" /></div>
                <div className="field-group"><label className="form-label">Status</label>
                  <select className="glass-input" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as PortfolioItem["status"] })}>
                    <option value="draft">Draft</option><option value="published">Published</option>
                  </select>
                </div>
                <div className="field-group sm:col-span-2"><label className="form-label">Tech Stack (comma-separated)</label>
                  <input className="glass-input" value={editing.techStack.join(", ")} onChange={(e) => setEditing({ ...editing, techStack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
                </div>
              </div>
            )}

            {tab === "Content" && (
              <div className="grid gap-3">
                <div className="field-group"><label className="form-label">Description (ID)</label><textarea rows={2} className="glass-input" value={editing.description.id} onChange={(e) => setEditing({ ...editing, description: { ...editing.description, id: e.target.value } })} /></div>
                <div className="field-group"><label className="form-label">Description (EN)</label><textarea rows={2} className="glass-input" value={editing.description.en} onChange={(e) => setEditing({ ...editing, description: { en: e.target.value, id: editing.description.id || e.target.value } })} /></div>
                <div className="field-group"><label className="form-label">Overview (ID)</label><textarea rows={4} className="glass-input" value={editing.overview.id} onChange={(e) => setEditing({ ...editing, overview: { ...editing.overview, id: e.target.value } })} /></div>
                <div className="field-group"><label className="form-label">Overview (EN)</label><textarea rows={4} className="glass-input" value={editing.overview.en} onChange={(e) => setEditing({ ...editing, overview: { en: e.target.value, id: editing.overview.id || e.target.value } })} /></div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="field-group"><label className="form-label">Challenge (ID)</label><textarea rows={4} className="glass-input" value={editing.challenge.id} onChange={(e) => setEditing({ ...editing, challenge: { ...editing.challenge, id: e.target.value } })} /></div>
                  <div className="field-group"><label className="form-label">Challenge (EN)</label><textarea rows={4} className="glass-input" value={editing.challenge.en} onChange={(e) => setEditing({ ...editing, challenge: { en: e.target.value, id: editing.challenge.id || e.target.value } })} /></div>
                  <div className="field-group"><label className="form-label">Solution (ID)</label><textarea rows={4} className="glass-input" value={editing.solution.id} onChange={(e) => setEditing({ ...editing, solution: { ...editing.solution, id: e.target.value } })} /></div>
                  <div className="field-group"><label className="form-label">Solution (EN)</label><textarea rows={4} className="glass-input" value={editing.solution.en} onChange={(e) => setEditing({ ...editing, solution: { en: e.target.value, id: editing.solution.id || e.target.value } })} /></div>
                </div>
              </div>
            )}

            {tab === "Media" && (
              <div className="space-y-4">
                <div><label className="form-label">Cover Image</label><ImageInput value={editing.cover} onChange={(v) => setEditing({ ...editing, cover: v })} /></div>
                <div><label className="form-label">Gallery</label><MultiImageInput value={editing.gallery} onChange={(v) => setEditing({ ...editing, gallery: v })} /></div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
