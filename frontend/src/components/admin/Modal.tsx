import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  onSave?: () => void;
  saveLabel?: string;
  size?: "md" | "lg" | "xl";
  children: ReactNode;
  hideFooter?: boolean;
}

const sizes = { md: "max-w-xl", lg: "max-w-3xl", xl: "max-w-5xl" };

export function Modal({ open, title, description, onClose, onSave, saveLabel = "Save", size = "lg", children, hideFooter }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={cn("modal-shell", sizes[size])} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="font-display text-xl font-bold leading-tight">{title}</h2>
            {description && <p className="text-sm text-ink/70 mt-1">{description}</p>}
          </div>
          <button onClick={onClose} className="size-9 rounded-full bg-white/60 hover:bg-white grid place-items-center shrink-0">
            <X className="size-4" />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {!hideFooter && (
          <div className="modal-footer">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            {onSave && <Button onClick={onSave}>{saveLabel}</Button>}
          </div>
        )}
      </div>
    </div>
  );
}
