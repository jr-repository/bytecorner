import { useRef, type ChangeEvent, type ClipboardEvent } from "react";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result as string);
    fr.onerror = rej;
    fr.readAsDataURL(file);
  });
}

export function ImageInput({ value, onChange, className, label }: { value?: string; onChange: (v: string) => void; className?: string; label?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const handle = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    onChange(await fileToDataUrl(f));
  };
  const handlePaste = async (e: ClipboardEvent<HTMLDivElement>) => {
    const image = Array.from(e.clipboardData.files).find((file) => file.type.startsWith("image/"));
    if (image) {
      e.preventDefault();
      onChange(await fileToDataUrl(image));
      return;
    }

    const text = e.clipboardData.getData("text/plain");
    if (text && /^https?:\/\/.+/i.test(text.trim())) {
      onChange(text.trim());
    }
  };
  return (
    <div className={cn("space-y-2", className)} onPaste={handlePaste} tabIndex={0}>
      {label && <label className="text-sm font-medium block">{label}</label>}
      <div className="aspect-video w-full rounded-2xl bg-soft border border-dashed border-ink/15 grid place-items-center overflow-hidden">
        {value ? <img src={value} alt="" className="w-full h-full object-cover" />
          : <div className="text-center text-muted text-sm"><ImagePlus className="size-6 mx-auto mb-1" /> No image</div>}
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={() => ref.current?.click()} className="flex-1 rounded-full glass px-4 py-2 text-sm">
          Upload image
        </button>
        {value && (
          <button type="button" onClick={() => onChange("")} className="rounded-full glass px-3 py-2 text-sm">
            <X className="size-4" />
          </button>
        )}
      </div>
      <input type="file" ref={ref} accept="image/*" className="hidden" onChange={handle} />
      <input
        type="url"
        placeholder="…or paste image URL"
        value={value && value.startsWith("data:") ? "" : value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm"
      />
    </div>
  );
}

export function MultiImageInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const handle = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const urls = await Promise.all(files.map(fileToDataUrl));
    onChange([...value, ...urls]);
  };
  const handlePaste = async (e: ClipboardEvent<HTMLDivElement>) => {
    const images = Array.from(e.clipboardData.files).filter((file) => file.type.startsWith("image/"));
    if (images.length > 0) {
      e.preventDefault();
      const urls = await Promise.all(images.map(fileToDataUrl));
      onChange([...value, ...urls]);
      return;
    }

    const text = e.clipboardData.getData("text/plain");
    if (text && /^https?:\/\/.+/i.test(text.trim())) {
      onChange([...value, text.trim()]);
    }
  };
  return (
    <div className="space-y-2" onPaste={handlePaste} tabIndex={0}>
      <div className="grid grid-cols-3 gap-2">
        {value.map((src, i) => (
          <div key={i} className="relative group aspect-square rounded-xl overflow-hidden bg-soft">
            <img src={src} alt="" className="w-full h-full object-cover" />
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="absolute top-1 right-1 size-7 rounded-full bg-white/90 grid place-items-center opacity-0 group-hover:opacity-100">
              <X className="size-3.5" />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => ref.current?.click()}
          className="aspect-square rounded-xl border border-dashed border-ink/20 grid place-items-center text-muted hover:bg-white/60">
          <ImagePlus className="size-5" />
        </button>
      </div>
      <input type="file" ref={ref} accept="image/*" multiple className="hidden" onChange={handle} />
    </div>
  );
}
