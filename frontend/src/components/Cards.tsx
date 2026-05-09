import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioItem, Article, Service } from "@/lib/storage";
import { useLang } from "@/contexts/LangContext";

export function PortfolioCard({ item, variant = "stack" }: { item: PortfolioItem; variant?: "stack" | "side" | "compact" | "featured" }) {
  const { pick, t } = useLang();
  if (variant === "featured") {
    return (
      <Link to={`/portfolio/${item.slug}`} className="group relative block overflow-hidden rounded-3xl">
        <div className="aspect-[16/8] w-full overflow-hidden">
          <img src={item.cover} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 text-white">
          <span className="rounded-full glass-dark px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">Featured Project</span>
          <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold max-w-2xl">{pick(item.title)}</h3>
          <p className="mt-1 text-white/80 text-sm md:text-base">{item.client} · {item.category}</p>
          {item.metrics && (
            <div className="mt-5 flex flex-wrap gap-3">
              {item.metrics.map((m) => (
                <div key={m.label} className="rounded-2xl glass-dark px-4 py-2 text-white">
                  <p className="font-display text-xl font-bold">{m.value}</p>
                  <p className="text-[11px] uppercase tracking-wider text-white/70">{m.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Link>
    );
  }
  if (variant === "compact") {
    return (
      <Link to={`/portfolio/${item.slug}`} className="group flex flex-col rounded-2xl glass overflow-hidden hover:-translate-y-1 transition-all">
        <div className="aspect-video bg-soft overflow-hidden">
          <img src={item.cover} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-4">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-deep">{item.category}</span>
          <h4 className="mt-1 font-display font-semibold text-ink line-clamp-2">{pick(item.title)}</h4>
          <p className="mt-2 text-xs text-muted">{new Date(item.date).toLocaleDateString()}</p>
        </div>
      </Link>
    );
  }
  if (variant === "side") {
    return (
      <Link to={`/portfolio/${item.slug}`} className="group rounded-3xl glass p-4 flex gap-4 hover:-translate-y-1 transition-all">
        <div className="size-28 shrink-0 rounded-2xl overflow-hidden bg-soft">
          <img src={item.cover} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0">
          <span className="rounded-full bg-teal/15 text-teal-deep text-[10px] font-semibold uppercase px-2 py-0.5">{item.category}</span>
          <h4 className="mt-1 font-display font-semibold line-clamp-2">{pick(item.title)}</h4>
          <p className="mt-1 text-xs text-muted line-clamp-2">{pick(item.description)}</p>
        </div>
      </Link>
    );
  }
  // stack
  return (
    <Link to={`/portfolio/${item.slug}`} className="group block rounded-3xl glass overflow-hidden hover:-translate-y-1 transition-all">
      <div className="aspect-video bg-soft overflow-hidden">
        <img src={item.cover} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
      <div className="p-5">
        <span className="rounded-full bg-teal/15 text-teal-deep text-[10px] font-semibold uppercase px-2 py-0.5">{item.category}</span>
        <h3 className="mt-2 font-display text-lg font-semibold">{pick(item.title)}</h3>
        <p className="mt-2 text-sm text-muted line-clamp-2">{pick(item.description)}</p>
        <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-teal-deep">
          {t("cta_view_detail")} <ArrowUpRight className="size-4" />
        </p>
      </div>
    </Link>
  );
}

export function ArticleCard({ item, variant = "stack" }: { item: Article; variant?: "stack" | "side" | "featured" | "dark" }) {
  const { pick, t } = useLang();
  if (variant === "featured") {
    return (
      <Link to={`/articles/${item.slug}`} className="grid md:grid-cols-2 gap-0 rounded-3xl glass overflow-hidden">
        <div className="aspect-[4/3] md:aspect-auto bg-soft overflow-hidden">
          <img src={item.cover} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-deep">Featured Article</span>
          <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold leading-tight">{pick(item.title)}</h3>
          <p className="mt-3 text-sm text-muted leading-relaxed">{pick(item.excerpt)}</p>
          <div className="mt-4 flex items-center gap-3 text-xs text-muted">
            <span className="font-medium text-ink">{item.author}</span>
            <span>·</span>
            <span>{new Date(item.date).toLocaleDateString()}</span>
            <span>·</span>
            <span>{item.readingTime} {t("min_read")}</span>
          </div>
        </div>
      </Link>
    );
  }
  if (variant === "side") {
    return (
      <Link to={`/articles/${item.slug}`} className="flex gap-3 rounded-2xl glass p-3 hover:-translate-y-0.5 transition">
        <div className="size-20 shrink-0 rounded-xl overflow-hidden bg-soft">
          <img src={item.cover} alt="" className="h-full w-full object-cover" />
        </div>
        <div>
          <span className="text-[10px] font-semibold uppercase text-teal-deep">{item.category}</span>
          <p className="font-display text-sm font-semibold line-clamp-2 mt-0.5">{pick(item.title)}</p>
          <p className="mt-1 text-[11px] text-muted">{new Date(item.date).toLocaleDateString()} · {item.readingTime} {t("min_read")}</p>
        </div>
      </Link>
    );
  }
  if (variant === "dark") {
    return (
      <Link to={`/articles/${item.slug}`} className="relative block rounded-3xl overflow-hidden bg-ink text-white p-6 min-h-[320px] flex flex-col justify-end">
        <img src={item.cover} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="relative">
          <span className="text-[10px] font-semibold uppercase text-teal">{item.category}</span>
          <h3 className="mt-2 font-display text-xl font-bold">{pick(item.title)}</h3>
          <p className="mt-3 text-xs text-white/70">{item.author} · {new Date(item.date).toLocaleDateString()} · {item.readingTime} {t("min_read")}</p>
        </div>
      </Link>
    );
  }
  return (
    <Link to={`/articles/${item.slug}`} className="block rounded-3xl glass overflow-hidden hover:-translate-y-1 transition-all">
      <div className="aspect-video bg-soft overflow-hidden">
        <img src={item.cover} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="p-5">
        <span className="text-[10px] font-semibold uppercase text-teal-deep">{item.category}</span>
        <h3 className="mt-2 font-display text-base font-semibold line-clamp-2">{pick(item.title)}</h3>
        <p className="mt-1 text-xs text-muted">{item.author} · {new Date(item.date).toLocaleDateString()} · {item.readingTime} {t("min_read")}</p>
      </div>
    </Link>
  );
}

export function ServiceItem({ s }: { s: Service }) {
  const { pick } = useLang();
  return (
    <Link to={`/services/${s.slug}`} className="flex gap-4 rounded-2xl p-4 hover:bg-white/60 transition">
      <div className="size-12 shrink-0 rounded-xl bg-teal/15 grid place-items-center text-teal-deep font-display font-bold">
        {pick(s.title).charAt(0)}
      </div>
      <div>
        <h4 className="font-display font-semibold">{pick(s.title)}</h4>
        <p className="text-sm text-muted line-clamp-2">{pick(s.excerpt)}</p>
      </div>
    </Link>
  );
}
