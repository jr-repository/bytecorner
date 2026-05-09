import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("glass rounded-3xl p-6", className)}>{children}</div>;
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-deep">
      <span className="size-1.5 rounded-full bg-teal" />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow, title, subtitle, align = "left",
}: { eyebrow?: string; title: ReactNode; subtitle?: ReactNode; align?: "left" | "center" }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal-deep">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base text-muted leading-relaxed">{subtitle}</p>}
    </div>
  );
}
