import { BRAND_LOGO } from "@/lib/seed";
import { cn } from "@/lib/utils";

export function Logo({ className, withText = true }: { className?: string; withText?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img src={BRAND_LOGO} alt="ByteCorner.id" className="h-9 w-9 object-contain" />
      {withText && (
        <span className="font-display text-xl font-bold text-ink">
          ByteCorner<span className="text-teal-deep">.id</span>
        </span>
      )}
    </div>
  );
}

export function LogoLoader({ fullscreen = true }: { fullscreen?: boolean }) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center gap-4",
      fullscreen && "fixed inset-0 z-[100] bg-brand-soft",
    )}>
      <div className="relative">
        <div className="absolute inset-0 -m-3 rounded-full border-2 border-teal/40 border-t-transparent animate-spin-slow" />
        <img src={BRAND_LOGO} alt="" className="h-14 w-14 object-contain animate-float" />
      </div>
      <p className="text-xs uppercase tracking-[0.3em] text-muted">ByteCorner.id</p>
    </div>
  );
}
