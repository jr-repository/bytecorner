import { useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Briefcase, FolderOpen, FileText, Image as ImageIcon, Users, Sparkles, LogOut, Menu, X, Bell, Search, Building2, ChevronLeft, ExternalLink, UserCircle, BarChart3 } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/services", label: "Services", icon: Briefcase },
  { to: "/admin/portfolio", label: "Portfolio", icon: FolderOpen },
  { to: "/admin/articles", label: "Articles", icon: FileText },
  { to: "/admin/logos", label: "Logos / Clients", icon: Building2 },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/profile", label: "Profile", icon: UserCircle },
  { to: "/admin/analytics/overview", label: "Analytics", icon: BarChart3 },
  { to: "/admin/media-library", label: "Media Library", icon: ImageIcon },
  { to: "/admin/content-generator", label: "Content Generator", icon: Sparkles },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const title =
    NAV.find((n) => (n.end ? loc.pathname === n.to : loc.pathname.startsWith(n.to)))?.label || "Dashboard";
  const avatar = user?.avatar || `https://i.pravatar.cc/120?u=${user?.email || "bytecorner"}`;

  const renderNav = (onClick?: () => void) =>
    NAV.map((n) => (
      <NavLink
        key={n.to}
        to={n.to}
        end={n.end}
        onClick={onClick}
        className={({ isActive }) =>
          cn(
            "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
            isActive
              ? "bg-teal-gradient text-white shadow-brand"
              : "text-ink/70 hover:bg-white hover:text-ink"
          )
        }
      >
        {({ isActive }) => (
          <>
            <n.icon className="size-4 shrink-0" />
            {!collapsed && <span className="truncate">{n.label}</span>}
            {isActive && !collapsed && <span className="ml-auto size-1.5 rounded-full bg-white/90" />}
          </>
        )}
      </NavLink>
    ));

  return (
    <div className="min-h-screen bg-brand-soft flex">
      {/* Sidebar desktop */}
      <aside
        className={cn(
          "hidden lg:flex flex-col glass-strong p-4 transition-all duration-300 sticky top-0 self-start h-screen rounded-none",
          collapsed ? "w-[88px]" : "w-64"
        )}
      >
        <div className={cn("flex items-center mb-6 px-1", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed && <Logo />}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-1.5 hover:bg-white text-ink/60"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft className={cn("size-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto scrollbar-thin">{renderNav()}</nav>
        <button
          onClick={() => {
            logout();
            nav("/admin/login");
          }}
          className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink/70 hover:bg-white"
        >
          <LogOut className="size-4" /> {!collapsed && "Logout"}
        </button>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <aside className="w-72 h-full bg-white p-4 shadow-xl flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <Logo />
              <button onClick={() => setMobileOpen(false)}>
                <X className="size-5" />
              </button>
            </div>
            <nav className="space-y-1 flex-1">{renderNav(() => setMobileOpen(false))}</nav>
            <button
              onClick={() => {
                logout();
                nav("/admin/login");
              }}
              className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink/70 hover:bg-soft"
            >
              <LogOut className="size-4" /> Logout
            </button>
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0 p-3 lg:p-4">
        {/* Topbar */}
        <header className="glass-strong rounded-3xl px-3 py-2.5 flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden rounded-lg p-2 hover:bg-white"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>

          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md rounded-full bg-white px-4 py-2 border border-ink/5">
            <Search className="size-4 text-muted" />
            <input placeholder="Search anything…" className="flex-1 bg-transparent outline-none text-sm" />
            <kbd className="hidden lg:inline text-[10px] rounded bg-soft px-1.5 py-0.5 text-muted">⌘K</kbd>
          </div>

          <div className="flex-1 md:hidden text-sm font-display font-semibold truncate">{title}</div>

          {/* Right cluster */}
          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-ink/60 hover:text-ink rounded-full px-3 py-2 hover:bg-white"
            >
              View site <ExternalLink className="size-3.5" />
            </Link>
            <button className="size-9 rounded-full bg-white border border-ink/5 grid place-items-center hover:bg-soft relative">
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-teal-deep ring-2 ring-white" />
            </button>
            <div className="flex items-center gap-2 rounded-full bg-white pl-1 pr-3 py-1 border border-ink/5">
              <img src={avatar} alt="" className="size-7 rounded-full object-cover" />
              <div className="hidden sm:block leading-tight">
                <p className="text-xs font-semibold">{user?.name}</p>
                <p className="text-[10px] text-muted">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="mt-4 space-y-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
