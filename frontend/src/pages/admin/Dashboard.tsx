import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { Users, FolderOpen, FileText, TrendingUp, Sparkles, LayoutDashboard } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, PieChart, Pie, Cell } from "recharts";
import { Logo } from "@/components/Logo";
import { PageHeader } from "@/components/admin/PageHeader";

const TREND = [
  { d: "Mon", v: 4200, p: 3100, s: 1800 },
  { d: "Tue", v: 4800, p: 3600, s: 2100 },
  { d: "Wed", v: 5400, p: 4100, s: 2400 },
  { d: "Thu", v: 6100, p: 4700, s: 2700 },
  { d: "Fri", v: 5800, p: 4500, s: 2500 },
  { d: "Sat", v: 6400, p: 5000, s: 2900 },
  { d: "Sun", v: 7100, p: 5400, s: 3200 },
];
const PAGES = [
  { name: "/", v: 28592, c: "#6CC6CB" },
  { name: "/services", v: 16421, c: "#4FB7C5" },
  { name: "/portfolio", v: 13876, c: "#A7F3D0" },
  { name: "/articles", v: 8358, c: "#FFD6A5" },
  { name: "Others", v: 4000, c: "#EAE5C9" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { services, portfolio, articles } = useData();
  const stats = [
    { label: "Total Visitors", value: "24,589", icon: Users, change: "+18.2%" },
    { label: "Page Views", value: "71,247", icon: TrendingUp, change: "+21.4%" },
    { label: "Projects Published", value: portfolio.length, icon: FolderOpen, change: "+12.6%" },
    { label: "Articles Published", value: articles.length, icon: FileText, change: "+8.7%" },
  ];
  return (
    <>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(" ")[0] || "there"}!`}
        description="Here's what's happening with your website today."
        icon={<LayoutDashboard className="size-5" />}
        action={<div className="text-xs text-ink/70 bg-white/60 rounded-full px-4 py-2 font-medium">{new Date().toLocaleDateString(undefined, { dateStyle: "medium" })}</div>}
      />

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-3xl glass-strong p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted">{s.label}</p>
              <div className="size-9 rounded-xl bg-teal/15 grid place-items-center text-teal-deep"><s.icon className="size-4" /></div>
            </div>
            <p className="mt-3 font-display text-3xl font-bold">{s.value}</p>
            <p className="mt-1 text-xs text-emerald-600">↑ {s.change} from last week</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-3xl glass-strong p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display font-semibold">Website Analytics</h3>
            <select className="text-xs glass rounded-full px-3 py-1"><option>This Week</option></select>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={TREND}>
                <XAxis dataKey="d" stroke="#9ca3af" fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }} />
                <Line type="monotone" dataKey="v" stroke="#6CC6CB" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="p" stroke="#4FB7C5" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="s" stroke="#A78BFA" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl glass-strong p-5">
          <h3 className="font-display font-semibold mb-4">Top Pages</h3>
          <div className="h-40 relative">
            <ResponsiveContainer>
              <PieChart><Pie data={PAGES} dataKey="v" nameKey="name" innerRadius={45} outerRadius={70} paddingAngle={2}>{PAGES.map((p, i) => <Cell key={i} fill={p.c} />)}</Pie></PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-1.5 text-xs">
            {PAGES.map((p) => (
              <li key={p.name} className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="size-2 rounded-full" style={{ background: p.c }} />{p.name}</span><span className="text-muted">{p.v.toLocaleString()}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-3xl glass-strong p-5">
          <h3 className="font-display font-semibold mb-4">Latest Content</h3>
          <table className="w-full text-sm">
            <thead className="text-xs text-muted text-left"><tr><th className="py-2">Title</th><th>Type</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {[...services.slice(0, 2).map((s) => ({ t: s.title.id, type: "Service", date: "—", status: s.status })),
                ...portfolio.slice(0, 2).map((p) => ({ t: p.title.id, type: "Portfolio", date: p.date, status: p.status })),
                ...articles.slice(0, 2).map((a) => ({ t: a.title.id, type: "Article", date: a.date, status: a.status }))]
                .map((r, i) => (
                  <tr key={i} className="border-t border-ink/5"><td className="py-2.5 font-medium line-clamp-1">{r.t}</td><td className="text-muted">{r.type}</td><td><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${r.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{r.status}</span></td><td className="text-muted text-xs">{r.date}</td></tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-3xl glass-strong p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold flex items-center gap-2"><Sparkles className="size-4 text-teal-deep" />Instagram Generator</h3>
          </div>
          <div className="rounded-2xl bg-brand-soft p-4">
            <Logo />
            <h4 className="mt-3 font-display text-lg font-bold leading-tight">Website Modern Bukan Hanya Tampilan, Tapi <span className="text-teal-deep">Strategi.</span></h4>
            <p className="mt-2 text-xs text-muted">Kami membantu brand Anda tampil profesional dan dipercaya lebih banyak pelanggan.</p>
          </div>
          <button className="mt-3 w-full rounded-full bg-teal-gradient text-white py-2.5 text-sm font-medium shadow-brand">✨ Generate New Content</button>
        </div>
      </div>
    </>
  );
}
