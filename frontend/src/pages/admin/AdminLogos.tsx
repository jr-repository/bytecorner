import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/Button";
import { ImageInput } from "@/components/ImageInput";
import { PageHeader } from "@/components/admin/PageHeader";
import { Modal } from "@/components/admin/Modal";
import { Trash2, Plus, Building2, Pencil } from "lucide-react";
import { toast } from "sonner";
import type { ClientLogo } from "@/lib/storage";

export default function AdminLogos() {
  const { logos, setLogos } = useData();
  const [editing, setEditing] = useState<ClientLogo | null>(null);

  const save = () => {
    if (!editing) return;
    if (!editing.name || !editing.image) return toast.error("Name and image required");
    const exists = logos.some((l) => l.id === editing.id);
    setLogos(exists ? logos.map((l) => (l.id === editing.id ? editing : l)) : [...logos, editing]);
    setEditing(null);
    toast.success("Saved");
  };

  return (
    <>
      <PageHeader
        title="Clients & Logos"
        description="Logos that appear in the trust marquee on the public homepage."
        icon={<Building2 className="size-5" />}
        action={<Button onClick={() => setEditing({ id: crypto.randomUUID(), name: "", image: "" })}><Plus className="w-4 h-4" /> New Logo</Button>}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {logos.map((l) => (
          <div key={l.id} className="glass-strong rounded-2xl p-4 flex flex-col items-center gap-3 group">
            <div className="h-20 w-full grid place-items-center bg-white/60 rounded-xl">
              <img src={l.image} alt={l.name} className="max-h-14 object-contain" />
            </div>
            <p className="text-sm font-medium truncate w-full text-center">{l.name}</p>
            <div className="flex gap-1 w-full">
              <button onClick={() => setEditing(l)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg hover:bg-white/60 text-xs"><Pencil className="size-3" /> Edit</button>
              <button onClick={() => { setLogos(logos.filter((x) => x.id !== l.id)); toast.success("Removed"); }} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg hover:bg-red-50 text-xs text-destructive"><Trash2 className="size-3" /> Delete</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={!!editing} title={editing && logos.some((l) => l.id === editing.id) ? "Edit Logo" : "New Logo"} onClose={() => setEditing(null)} onSave={save} size="md">
        {editing && (
          <div className="space-y-4">
            <div className="field-group"><label className="form-label">Client name</label><input className="glass-input" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
            <ImageInput value={editing.image} onChange={(v) => setEditing({ ...editing, image: v })} label="Logo image" />
          </div>
        )}
      </Modal>
    </>
  );
}
