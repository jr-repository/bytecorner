import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/Button";
import { ImageInput } from "@/components/ImageInput";
import { RichTextEditor } from "@/components/RichTextEditor";
import { PageHeader } from "@/components/admin/PageHeader";
import { Modal } from "@/components/admin/Modal";
import { Pencil, Trash2, Plus, FileText } from "lucide-react";
import { toast } from "sonner";
import type { Article } from "@/lib/storage";

const empty = (): Article => ({
  id: crypto.randomUUID(),
  slug: "new-article",
  title: { id: "Artikel Baru", en: "New Article" },
  excerpt: { id: "", en: "" },
  content: { id: "", en: "" },
  category: "Tech",
  author: "Admin",
  date: new Date().toISOString().slice(0, 10),
  cover: "",
  tags: [],
  readingTime: 3,
  status: "draft",
});

const TABS = ["Meta", "Content", "Cover"] as const;

export default function AdminArticles() {
  const { articles, setArticles } = useData();
  const [editing, setEditing] = useState<Article | null>(null);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Meta");

  const open = (a: Article) => { setEditing(a); setTab("Meta"); };

  const save = () => {
    if (!editing) return;
    const exists = articles.some((a) => a.id === editing.id);
    setArticles(exists ? articles.map((a) => (a.id === editing.id ? editing : a)) : [editing, ...articles]);
    setEditing(null);
    toast.success("Saved");
  };

  return (
    <>
      <PageHeader
        title="Articles"
        description="Editorial content, blog posts and insights — bilingual ID/EN with rich text."
        icon={<FileText className="size-5" />}
        action={<Button onClick={() => open(empty())}><Plus className="w-4 h-4" /> New Article</Button>}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {articles.map((a) => (
          <div key={a.id} className="glass-strong rounded-2xl overflow-hidden flex flex-col hover:-translate-y-0.5 transition">
            <div className="aspect-video bg-brand-soft">
              {a.cover ? <img src={a.cover} alt={a.title.en} className="w-full h-full object-cover" /> : <div className="w-full h-full grid place-items-center text-muted text-xs">No cover</div>}
            </div>
            <div className="p-4 flex flex-col gap-2 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold truncate">{a.title.en}</h3>
                  <p className="text-xs text-muted truncate">{a.author} · {a.category}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${a.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{a.status}</span>
              </div>
              <p className="text-xs text-muted">{a.date} · {a.readingTime} min read</p>
              <div className="flex gap-1 mt-auto pt-2 border-t border-ink/5">
                <button onClick={() => open(a)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-white/60 text-sm"><Pencil className="size-3.5" /> Edit</button>
                <button onClick={() => { setArticles(articles.filter((x) => x.id !== a.id)); toast.success("Deleted"); }} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-red-50 text-sm text-destructive"><Trash2 className="size-3.5" /> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={!!editing}
        title={editing && articles.some((a) => a.id === editing.id) ? "Edit Article" : "New Article"}
        description="Switch tabs to manage meta, body content and cover image."
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

            {tab === "Meta" && (
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="field-group"><label className="form-label">Slug</label><input className="glass-input" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} /></div>
                <div className="field-group"><label className="form-label">Category</label><input className="glass-input" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} /></div>
                <div className="field-group"><label className="form-label">Author</label><input className="glass-input" value={editing.author} onChange={(e) => setEditing({ ...editing, author: e.target.value })} /></div>
                <div className="field-group"><label className="form-label">Date</label><input type="date" className="glass-input" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} /></div>
                <div className="field-group"><label className="form-label">Reading time (min)</label><input type="number" className="glass-input" value={editing.readingTime} onChange={(e) => setEditing({ ...editing, readingTime: Number(e.target.value) || 0 })} /></div>
                <div className="field-group"><label className="form-label">Status</label>
                  <select className="glass-input" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as Article["status"] })}>
                    <option value="draft">Draft</option><option value="published">Published</option>
                  </select>
                </div>
                <div className="field-group"><label className="form-label">Title (ID)</label><input className="glass-input" value={editing.title.id} onChange={(e) => setEditing({ ...editing, title: { ...editing.title, id: e.target.value } })} /></div>
                <div className="field-group"><label className="form-label">Title (EN)</label><input className="glass-input" value={editing.title.en} onChange={(e) => setEditing({ ...editing, title: { ...editing.title, en: e.target.value } })} /></div>
                <div className="field-group sm:col-span-2"><label className="form-label">Excerpt (ID)</label><textarea rows={2} className="glass-input" value={editing.excerpt.id} onChange={(e) => setEditing({ ...editing, excerpt: { ...editing.excerpt, id: e.target.value } })} /></div>
                <div className="field-group sm:col-span-2"><label className="form-label">Excerpt (EN)</label><textarea rows={2} className="glass-input" value={editing.excerpt.en} onChange={(e) => setEditing({ ...editing, excerpt: { en: e.target.value, id: editing.excerpt.id || e.target.value } })} /></div>
                <div className="field-group sm:col-span-2"><label className="form-label">Tags (comma-separated)</label>
                  <input className="glass-input" value={editing.tags.join(", ")} onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
                </div>
              </div>
            )}

            {tab === "Content" && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="form-label">Body (ID)</label>
                  <RichTextEditor value={editing.content.id} onChange={(v) => setEditing({ ...editing, content: { ...editing.content, id: v } })} />
                </div>
                <div className="space-y-2">
                  <label className="form-label">Body (EN)</label>
                  <RichTextEditor value={editing.content.en} onChange={(v) => setEditing({ ...editing, content: { en: v, id: editing.content.id || v } })} />
                </div>
              </div>
            )}

            {tab === "Cover" && <ImageInput value={editing.cover} onChange={(v) => setEditing({ ...editing, cover: v })} label="Cover Image" />}
          </div>
        )}
      </Modal>
    </>
  );
}
