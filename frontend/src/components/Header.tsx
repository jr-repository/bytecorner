import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { Logo } from "./Logo";
import { LinkButton } from "./Button";
import { useLang } from "@/contexts/LangContext";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", key: "nav_home" as const },
  { to: "/about", key: "nav_about" as const },
  { to: "/services", key: "nav_services" as const },
  { to: "/portfolio", key: "nav_portfolio" as const },
  { to: "/articles", key: "nav_articles" as const },
];

export function Header() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => { setOpen(false); }, [loc.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll(); window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-3 z-50 px-3 md:px-6 transition-all", scrolled && "top-2")}>
      <div className={cn(
        "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full px-4 py-2.5 md:px-6 md:py-3 transition-all",
        "glass-strong",
      )}>
        <Link to="/" className="shrink-0"><Logo /></Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.to === "/"}
              className={({ isActive }) => cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive ? "text-teal-deep" : "text-ink/70 hover:text-ink",
              )}
            >
              {t(it.key)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            className="hidden md:inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-ink/70 hover:bg-white/60"
            title="Switch language"
          >
            <Globe className="size-3.5" />
            {lang.toUpperCase()}
          </button>
          <LinkButton to="/contact" size="sm" arrow className="hidden md:inline-flex">
            {t("nav_contact")}
          </LinkButton>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center rounded-full p-2 text-ink hover:bg-white/60"
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-3xl glass-strong p-4 lg:hidden animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col">
            {navItems.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                end={it.to === "/"}
                className={({ isActive }) => cn(
                  "rounded-2xl px-4 py-3 text-sm font-medium",
                  isActive ? "bg-white text-teal-deep" : "text-ink/70 hover:bg-white/60",
                )}
              >
                {t(it.key)}
              </NavLink>
            ))}
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => setLang(lang === "id" ? "en" : "id")}
                className="flex-1 rounded-full glass px-3 py-2 text-xs font-semibold"
              >
                <Globe className="inline size-3.5 mr-1" />
                {lang.toUpperCase()}
              </button>
              <LinkButton to="/contact" size="sm" arrow className="flex-1 justify-center">
                {t("nav_contact")}
              </LinkButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
