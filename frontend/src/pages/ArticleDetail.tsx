import { Link, Navigate, useParams } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { useLang } from "@/contexts/LangContext";
import { Hero } from "@/components/Hero";
import { GlassCard, SectionLabel } from "@/components/GlassCard";
import { ArticleCard } from "@/components/Cards";

export default function ArticleDetail() {
  const { slug } = useParams();
  const { articles } = useData();
  const { pick, lang, t } = useLang();
  const a = articles.find((x) => x.slug === slug);
  if (!a) return <Navigate to="/articles" replace />;
  const related = articles.filter((x) => x.id !== a.id && x.category === a.category).slice(0, 3);

  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-8 pb-4 text-center">
        <SectionLabel>{a.category}</SectionLabel>
        <h1 className="mt-4 font-display text-3xl md:text-5xl font-bold leading-tight">{pick(a.title)}</h1>
        <div className="mt-4 flex items-center justify-center gap-3 text-sm text-muted">
          <img src={a.authorAvatar || `https://i.pravatar.cc/40?u=${a.author}`} alt="" className="size-8 rounded-full" />
          <span className="font-medium text-ink">{a.author}</span>
          <span>·</span>
          <span>{new Date(a.date).toLocaleDateString()}</span>
          <span>·</span>
          <span>{a.readingTime} {t("min_read")}</span>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6">
        <img src={a.cover} alt="" className="rounded-3xl w-full max-h-[480px] object-cover" />
      </section>
      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="prose-rich" dangerouslySetInnerHTML={{ __html: pick(a.content) }} />
        <div className="mt-8 flex flex-wrap gap-2">
          {a.tags.map((tag) => <span key={tag} className="rounded-full glass px-3 py-1 text-xs">#{tag}</span>)}
        </div>
      </section>
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-12">
          <h3 className="font-display text-2xl font-bold mb-6">{lang === "id" ? "Artikel Terkait" : "Related Articles"}</h3>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((r) => <ArticleCard key={r.id} item={r} />)}
          </div>
        </section>
      )}
      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="rounded-3xl bg-brand-gradient p-8 grid md:grid-cols-2 gap-4 items-center">
          <div><h3 className="font-display text-2xl font-bold">{t("newsletter_title")}</h3><p className="text-ink/70 text-sm">{t("newsletter_sub")}</p></div>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input placeholder={t("email_placeholder")} className="flex-1 rounded-full bg-white px-4 py-3 text-sm outline-none" />
            <button className="rounded-full bg-teal-gradient text-white px-5 text-sm font-medium shadow-brand">{t("subscribe")}</button>
          </form>
        </div>
      </section>
    </>
  );
}
