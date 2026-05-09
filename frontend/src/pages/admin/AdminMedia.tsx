import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/admin/PageHeader";
import { Trash2, Upload, Image as ImageIcon, Copy } from "lucide-react";
import { toast } from "sonner";
import { useRef } from "react";

export default function AdminMedia() {
  const { media, setMedia } = useData();
  const fileRef = useRef<HTMLInputElement>(null);

  const onUpload = async (files: FileList | null) => {
    if (!files) return;
    const next = [...media];
    for (const file of Array.from(files)) {
      const url = await new Promise<string>((res) => {
        const r = new FileReader();
        r.onload = () => res(r.result as string);
        r.readAsDataURL(file);
      });
      next.unshift({ id: crypto.randomUUID(), name: file.name, url, uploadedAt: new Date().toISOString() });
    }
    setMedia(next);
    toast.success("Uploaded");
  };

  return (
    <>
      <PageHeader
        title="Media Library"
        description="Centralized storage for images you can reuse across services, portfolio and articles."
        icon={<ImageIcon className="size-5" />}
        action={
          <>
            <Button onClick={() => fileRef.current?.click()}><Upload className="w-4 h-4" /> Upload</Button>
            <input ref={fileRef} type="file" multiple accept="image/*" hidden onChange={(e) => onUpload(e.target.files)} />
          </>
        }
      />

      {media.length === 0 ? (
        <div className="glass-strong rounded-2xl p-12 text-center text-muted">
          <ImageIcon className="size-10 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No media yet</p>
          <p className="text-sm mt-1">Upload your first image to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {media.map((m) => (
            <div key={m.id} className="glass-strong rounded-2xl p-2 group relative">
              <img src={m.url} alt={m.name} className="w-full aspect-square object-cover rounded-xl" />
              <p className="text-xs mt-2 px-1 truncate">{m.name}</p>
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                <button onClick={() => { navigator.clipboard.writeText(m.url); toast.success("URL copied"); }} className="size-8 grid place-items-center bg-white/90 rounded-lg"><Copy className="size-3.5" /></button>
                <button onClick={() => { setMedia(media.filter((x) => x.id !== m.id)); toast.success("Deleted"); }} className="size-8 grid place-items-center bg-white/90 rounded-lg text-destructive"><Trash2 className="size-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
