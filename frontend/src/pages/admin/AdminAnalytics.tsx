import { useEffect, useMemo, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BarChart3, Eye, MousePointerClick, Users } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { adminApi } from "@/lib/api";
import { cn } from "@/lib/utils";

const sections = [
  { key: "overview", label: "Overview" },
  { key: "traffic", label: "Traffic Detail" },
  { key: "pages", label: "Page Analytics" },
  { key: "events", label: "Events" },
  { key: "audience", label: "Audience" },
  { key: "sources", label: "Sources" },
  { key: "insights", label: "Insights" },
];

export default function AdminAnalytics() {
  const { section = "overview" } = useParams();
  const active = sections.some((item) => item.key === section) ? section : "overview";

  return (
    <>
      <PageHeader title="Analytics" description="Real public website activity tracked from database." icon={<BarChart3 className="size-5" />} />
      <div className="flex flex-wrap gap-2 rounded-2xl glass-strong p-2">
        {sections.map((item) => (
          <NavLink key={item.key} to={`/admin/analytics/${item.key}`} className={({ isActive }) => cn("rounded-full px-4 py-2 text-xs font-semibold", isActive || active === item.key ? "bg-teal-gradient text-white shadow-brand" : "bg-white/60 text-ink/70 hover:bg-white")}>
            {item.label}
          </NavLink>
        ))}
      </div>
      {active === "overview" && <Overview />}
      {active === "traffic" && <Traffic />}
      {active === "pages" && <Pages />}
      {active === "events" && <Events />}
      {active === "audience" && <Audience />}
      {active === "sources" && <Sources />}
      {active === "insights" && <Insights />}
    </>
  );
}

function Overview() {
  const [data, setData] = useState<any>(null);
  useEffect(() => { adminApi.analytics.overview().then(setData).catch(() => {}); }, []);
  const totals = data?.totals || {};
  const stats = [
    ["Total Visitors", totals.visitors || 0, Users],
    ["Page Views", totals.pageViews || 0, Eye],
    ["Unique Visitors", totals.uniqueVisitors || 0, Users],
    ["Actions", totals.events || 0, MousePointerClick],
    ["Returning", totals.returningVisitors || 0, Users],
    ["New Visitors", totals.newVisitors || 0, Users],
    ["Avg. Duration", `${totals.averageSessionDuration || 0}s`, BarChart3],
    ["Bounce Rate", `${totals.bounceRate || 0}%`, BarChart3],
  ];

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(([label, value, Icon]: any) => (
          <div key={label} className="rounded-3xl glass-strong p-5">
            <div className="flex items-center justify-between"><p className="text-xs text-muted">{label}</p><div className="size-9 rounded-xl bg-teal/15 grid place-items-center text-teal-deep"><Icon className="size-4" /></div></div>
            <p className="mt-3 font-display text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <ChartCard title="Recent Traffic Trend" data={data?.trend || []} />
        <ListCard title="Most Visited Pages" rows={data?.topPages || []} />
        <ListCard title="Top Sources" rows={data?.topSources || []} />
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <ListCard title="Top Countries" rows={data?.topCountries || []} />
        <ListCard title="Top Devices" rows={data?.topDevices || []} />
        <ListCard title="Top Browsers" rows={data?.topBrowsers || []} />
      </div>
    </div>
  );
}

function Traffic() {
  const [data, setData] = useState<any>(null);
  useEffect(() => { adminApi.analytics.traffic("?per_page=30").then(setData).catch(() => {}); }, []);
  return <TableCard title="Traffic Detail" rows={data?.data || []} columns={["viewed_at", "path", "source", "country", "city", "device", "browser", "os", "session_id"]} />;
}

function Pages() {
  const [data, setData] = useState<any>(null);
  useEffect(() => { adminApi.analytics.pages("?per_page=30").then(setData).catch(() => {}); }, []);
  return (
    <div className="space-y-4">
      <TableCard title="Page Performance" rows={data?.pages?.data || []} columns={["path", "views", "uniqueVisitors", "averageTime"]} />
      <div className="grid lg:grid-cols-2 gap-4">
        <ListCard title="Top Landing Pages" rows={data?.landingPages || []} />
        <ListCard title="Top Exit Pages" rows={data?.exitPages || []} />
      </div>
    </div>
  );
}

function Events() {
  const [data, setData] = useState<any>(null);
  useEffect(() => { adminApi.analytics.events("?per_page=30").then(setData).catch(() => {}); }, []);
  return (
    <div className="space-y-4">
      <ListCard title="Event Summary" rows={data?.summary || []} />
      <TableCard title="Event Detail" rows={data?.events?.data || []} columns={["occurred_at", "event_type", "event_name", "label", "path", "target_url"]} />
    </div>
  );
}

function Audience() {
  const [data, setData] = useState<any>(null);
  useEffect(() => { adminApi.analytics.audience().then(setData).catch(() => {}); }, []);
  return <GridLists data={data} keys={["countries", "cities", "devices", "browsers", "os", "hours", "days"]} />;
}

function Sources() {
  const [data, setData] = useState<any>(null);
  useEffect(() => { adminApi.analytics.sources().then(setData).catch(() => {}); }, []);
  return <GridLists data={data} keys={["sources", "mediums", "campaigns"]} />;
}

function Insights() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => { adminApi.analytics.insights().then(setData).catch(() => {}); }, []);
  return (
    <div className="grid gap-3">
      {data.map((item, index) => (
        <div key={index} className="rounded-2xl glass-strong p-5">
          <h3 className="font-display font-semibold">{item.title}</h3>
          <p className="mt-1 text-sm text-muted">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

function ChartCard({ title, data }: { title: string; data: any[] }) {
  return (
    <div className="lg:col-span-2 rounded-3xl glass-strong p-5">
      <h3 className="font-display font-semibold mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer>
          <AreaChart data={data}><XAxis dataKey="d" fontSize={11} /><YAxis fontSize={11} /><Tooltip /><Area dataKey="v" stroke="#4FB7C5" fill="#6CC6CB55" /></AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ListCard({ title, rows }: { title: string; rows: any[] }) {
  return (
    <div className="rounded-3xl glass-strong p-5">
      <h3 className="font-display font-semibold mb-4">{title}</h3>
      {rows.length === 0 ? <p className="text-sm text-muted">Belum ada data.</p> : (
        <ul className="space-y-2 text-sm">{rows.map((row, index) => <li key={index} className="flex justify-between gap-3"><span className="truncate">{row.name}</span><span className="font-semibold text-teal-deep">{row.value}</span></li>)}</ul>
      )}
    </div>
  );
}

function TableCard({ title, rows, columns }: { title: string; rows: any[]; columns: string[] }) {
  return (
    <div className="rounded-3xl glass-strong p-5 overflow-hidden">
      <h3 className="font-display font-semibold mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-muted text-left"><tr>{columns.map((c) => <th key={c} className="py-2 pr-4 whitespace-nowrap">{c}</th>)}</tr></thead>
          <tbody>
            {rows.length === 0 ? <tr><td colSpan={columns.length} className="py-6 text-center text-muted">Belum ada data.</td></tr> : rows.map((row, i) => (
              <tr key={i} className="border-t border-ink/5">{columns.map((c) => <td key={c} className="py-2.5 pr-4 whitespace-nowrap max-w-xs truncate">{format(row[c])}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GridLists({ data, keys }: { data: any; keys: string[] }) {
  return <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">{keys.map((key) => <ListCard key={key} title={titleCase(key)} rows={data?.[key] || []} />)}</div>;
}

function format(value: any) {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "string" && value.includes("T")) return new Date(value).toLocaleString();
  return String(value);
}

function titleCase(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
}
