import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Hero({
  eyebrow, title, subtitle, actions, visual, compact = false, className,
}: {
  eyebrow?: ReactNode; title: ReactNode; subtitle?: ReactNode; actions?: ReactNode; visual?: ReactNode;
  compact?: boolean; className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden bg-brand-soft", className)}>
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -right-24 size-[420px] rounded-full bg-teal/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 size-[360px] rounded-full bg-cream/60 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #1f2937 1px, transparent 0)", backgroundSize: "24px 24px" }} />

      <div className={cn("relative mx-auto max-w-7xl px-6", compact ? "py-12 md:py-16" : "py-16 md:py-24")}>
        <div className={cn("grid items-center gap-10", visual ? "lg:grid-cols-2" : "")}>
          <div>
            {eyebrow && <div className="mb-5">{eyebrow}</div>}
            <h1 className="font-display text-4xl font-bold leading-[1.05] text-ink md:text-5xl lg:text-6xl">
              {title}
            </h1>
            {subtitle && <p className="mt-5 max-w-xl text-base text-muted leading-relaxed md:text-lg">{subtitle}</p>}
            {actions && <div className="mt-7 flex flex-wrap items-center gap-3">{actions}</div>}
          </div>
          {visual && <div className="relative">{visual}</div>}
        </div>
      </div>
    </section>
  );
}
