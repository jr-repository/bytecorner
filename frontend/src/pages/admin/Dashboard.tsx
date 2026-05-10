import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { Users, FolderOpen, FileText, TrendingUp, Sparkles, LayoutDashboard } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, PieChart, Pie, Cell } from "recharts";
import { Logo } from "@/components/Logo";
import { PageHeader } from "@/components/admin/PageHeader";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";

export default function Dashboard() {
  const { user } = useAuth();
  const { services, portfolio, articles } = useData();
  const [dashboard, setDashboard] = useState<any>(null);
  useEffect(() => {
    adminApi.dashboard().then(setDashboard).catch(() => {});
  }, []);
  const trend = dashboard?.trend || [];
  const pages = dashboard?.topPages || [];
  const latestContent = dashboard?.latestContent || [
    ...services.slice(0, 2).map((s) => ({ t: s.title.id, type: "Service", date: "—", status: s.status })),
    ...portfolio.slice(0, 2).map((p) => ({ t: p.title.id, type: "Portfolio", date: p.date, status: p.status })),
    ...articles.slice(0, 2).map((a) => ({ t: a.title.id, type: "Article", date: a.date, status: a.status })),
  ];
  const totals = dashboard?.totals;
  const stats = [
    { label: "Total Visitors", value: totals?.visitors ?? 0, icon: Users },
    { label: "Page Views", value: totals?.pageViews ?? 0, icon: TrendingUp },
    { label: "Projects Published", value: totals?.publishedPortfolio ?? portfolio.length, icon: FolderOpen },
    { label: "Articles Published", value: totals?.publishedArticles ?? articles.length, icon: FileText },
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
            <p className="mt-1 text-xs text-muted">Real database data</p>
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
              <LineChart data={trend}>
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
              <PieChart><Pie data={pages} dataKey="v" nameKey="name" innerRadius={45} outerRadius={70} paddingAngle={2}>{pages.map((p: any, i: number) => <Cell key={i} fill={p.c} />)}</Pie></PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-1.5 text-xs">
            {pages.length === 0 && <li className="text-muted">Belum ada data analytics.</li>}
            {pages.map((p: any) => (
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
              {latestContent
                .map((r: any, i: number) => (
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
