import { useEffect, useRef } from "react";
import { Bold, Italic, List, ListOrdered, Link2, Image as ImageIcon, Heading2, Heading3, Quote } from "lucide-react";

interface Props { value: string; onChange: (v: string) => void; }

export function RichTextEditor({ value, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || "";
    }
  }, [value]);

  const exec = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    if (ref.current) onChange(ref.current.innerHTML);
  };
  const promptLink = () => {
    const url = prompt("URL?"); if (url) exec("createLink", url);
  };
  const insertImage = () => {
    const url = prompt("Image URL?"); if (url) exec("insertImage", url);
  };

  return (
    <div className="rounded-2xl border border-ink/10 overflow-hidden bg-white">
      <div className="flex flex-wrap items-center gap-1 border-b border-ink/10 bg-soft px-2 py-1.5">
        {[
          { icon: Bold, cmd: "bold" },
          { icon: Italic, cmd: "italic" },
          { icon: Heading2, cmd: "formatBlock", val: "h2" },
          { icon: Heading3, cmd: "formatBlock", val: "h3" },
          { icon: Quote, cmd: "formatBlock", val: "blockquote" },
          { icon: List, cmd: "insertUnorderedList" },
          { icon: ListOrdered, cmd: "insertOrderedList" },
        ].map(({ icon: Icon, cmd, val }, i) => (
          <button key={i} type="button" onClick={() => exec(cmd, val)}
            className="size-8 rounded-lg hover:bg-white grid place-items-center">
            <Icon className="size-4" />
          </button>
        ))}
        <button type="button" onClick={promptLink} className="size-8 rounded-lg hover:bg-white grid place-items-center"><Link2 className="size-4" /></button>
        <button type="button" onClick={insertImage} className="size-8 rounded-lg hover:bg-white grid place-items-center"><ImageIcon className="size-4" /></button>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
        className="prose-rich min-h-[260px] p-4 text-sm focus:outline-none"
      />
    </div>
  );
}
