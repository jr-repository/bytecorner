import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/Button";
import { ImageInput } from "@/components/ImageInput";
import { PageHeader } from "@/components/admin/PageHeader";
import { Trash2, Plus, Copy, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminIG() {
  const { igDrafts, setIGDrafts } = useData();
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");

  const generate = () => {
    if (!title) return toast.error("Add a title first");
    const auto = `✨ ${title}\n\n${caption || "Discover how ByteCorner.id helps brands craft modern, strategic web experiences."}\n\n#ByteCorner #DigitalAgency #WebDevelopment #Indonesia`;
    setCaption(auto);
    toast.success("Caption generated");
  };

  const save = () => {
    if (!title || !caption) return toast.error("Title and caption required");
    setIGDrafts([{ id: crypto.randomUUID(), title, caption, image, createdAt: new Date().toISOString() }, ...igDrafts]);
    setTitle(""); setCaption(""); setImage("");
    toast.success("Draft saved");
  };

  return (
    <>
      <PageHeader
        title="Content Generator"
        description="Compose Instagram-ready posts with auto captions, hashtags and a live preview."
        icon={<Sparkles className="size-5" />}
      />

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glass-strong rounded-2xl p-6 space-y-4">
          <h2 className="font-display text-lg font-semibold">New Post</h2>
          <div className="field-group"><label className="form-label">Title / Theme</label><input className="glass-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Strategy beats template" /></div>
          <div className="field-group"><label className="form-label">Caption</label><textarea className="glass-input" rows={6} value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Write your caption…" /></div>
          <ImageInput value={image} onChange={setImage} label="Visual" />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={generate}><Wand2 className="size-4" /> Auto-generate</Button>
            <Button onClick={save}><Plus className="size-4" /> Save Draft</Button>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-6 space-y-4">
          <h2 className="font-display text-lg font-semibold">Preview</h2>
          <div className="aspect-square bg-brand-soft rounded-2xl overflow-hidden grid place-items-center">
            {image ? (
              <img src={image} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-8">
                <p className="font-display text-xl font-bold text-ink/80">{title || "Your title here"}</p>
                <p className="text-xs text-muted mt-2">@bytecorner.id</p>
              </div>
            )}
          </div>
          <p className="text-sm whitespace-pre-wrap text-ink/80 max-h-48 overflow-y-auto">{caption || "Your caption will appear here…"}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="font-display text-lg font-semibold">Saved Drafts <span className="text-muted text-sm">({igDrafts.length})</span></h2>
        {igDrafts.length === 0 ? (
          <p className="text-sm text-muted glass-strong rounded-2xl p-8 text-center">No drafts yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {igDrafts.map((d) => (
              <div key={d.id} className="glass-strong rounded-2xl p-3 space-y-2">
                {d.image ? (
                  <img src={d.image} alt={d.title} className="w-full aspect-square object-cover rounded-xl" />
                ) : (
                  <div className="aspect-square rounded-xl bg-brand-soft grid place-items-center text-xs text-muted">No image</div>
                )}
                <h3 className="font-semibold text-sm truncate">{d.title}</h3>
                <p className="text-xs text-muted line-clamp-3 whitespace-pre-wrap">{d.caption}</p>
                <div className="flex gap-1 pt-1 border-t border-ink/5">
                  <button onClick={() => { navigator.clipboard.writeText(d.caption); toast.success("Copied"); }} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg hover:bg-white/60 text-xs"><Copy className="size-3" /> Copy</button>
                  <button onClick={() => { setIGDrafts(igDrafts.filter((x) => x.id !== d.id)); toast.success("Deleted"); }} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg hover:bg-red-50 text-xs text-destructive"><Trash2 className="size-3" /> Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
