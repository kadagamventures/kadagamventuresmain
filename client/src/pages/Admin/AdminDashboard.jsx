import React, { useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  ComposedChart,
} from "recharts";

import useDashboardStore from "../../zustand/useDashboardStore";

// Modern color palette
const COLORS = ["#6366f1", "#10b981", "#f43f5e", "#f59e0b", "#8b5cf6", "#ec4899"];
const PRIMARY = "#6366f1";
const SECONDARY = "#10b981";
const ACCENT = "#f43f5e";

export default function AdminDashboard() {
  const { stats, leadSummary, loading, fetchStats } = useDashboardStore();

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading || (!stats && !leadSummary)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="animate-spin h-14 w-14 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
          <p className="text-xl font-semibold text-gray-700 tracking-wide">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // ── Safe data with fallbacks ────────────────────────────────────────────────
  const subscriberData = [
    { name: "Active", value: stats?.subscribers?.active ?? 0 },
    { name: "Inactive", value: stats?.subscribers?.inactive ?? 0 },
  ].filter((d) => d.value > 0);

  const contactData = [
    { name: "Services", value: stats?.contactUs?.services ?? 0 },
    { name: "Products", value: stats?.contactUs?.products ?? 0 },
  ].filter((d) => d.value > 0);

  const contentData = [
    { name: "Blogs", value: stats?.blogs ?? 0 },
    { name: "Careers", value: stats?.careers ?? 0 },
  ];

  const totalSubscribers = (stats?.subscribers?.active ?? 0) + (stats?.subscribers?.inactive ?? 0);

  // ── Leads data preparation ──────────────────────────────────────────────────
  const monthlyLeads = (leadSummary?.monthlyStats ?? [])
  .sort((a, b) => {
    const dateA = new Date(a._id.year, a._id.month - 1);
    const dateB = new Date(b._id.year, b._id.month - 1);
    return dateA - dateB;
  })
  .slice(-12) // ✅ last 6 months only
  .map((item) => {
    const date = new Date(item._id.year, item._id.month - 1);

    return {
      month: date.toLocaleString("default", { month: "short", year: "2-digit" }),
      leads: item.totalLeads,
      cost: item.totalCost,
    };
  });

  const campaignData = (leadSummary?.campaignStats ?? []).map((item) => ({
    name: item._id === "Unknown" ? "Organic / Other" : item._id,
    leads: item.totalLeads,
    cost: item.totalCost,
  })).sort((a, b) => b.leads - a.leads);

  const totalLeads = leadSummary?.totalLeads ?? 0;
  const totalCost = leadSummary?.totalCost ?? 0;
  const avgCostPerLead = totalLeads > 0 ? (totalCost / totalLeads).toFixed(2) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-5 md:p-8 lg:p-10">
      <div className="mx-auto max-w-7xl space-y-10 xl:space-y-12">

        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 tracking-tight">
              Admin Dashboard
            </h2>
            <p className="mt-2 text-gray-600 font-medium">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </header>

        {/* KPI Cards ── Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Blogs" value={stats?.blogs ?? 0} icon="📝" color="indigo" />
          <StatCard title="Total Careers" value={stats?.careers ?? 0} icon="💼" color="emerald" />
          <StatCard title="Total Leads" value={totalLeads.toLocaleString()} icon="🎯" color="violet" />
          <StatCard
            title="Total Ad Spend"
            value={`₹${totalCost.toLocaleString()}`}
            icon="₹"
            color="amber"
            subtitle={totalLeads > 0 ? `₹${avgCostPerLead} / lead` : ""}
          />
        </div>

      

        {/* Leads Trend – Monthly */}
        <ChartCard title="Leads & Spend Trend (Monthly)">
          <ResponsiveContainer width="100%" height={420}>
            <ComposedChart
              data={monthlyLeads.length ? monthlyLeads : [{ month: "No data", leads: 0, cost: 0 }]}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tick={{ fill: "#6b7280" }} />
              <YAxis yAxisId="left" orientation="left" axisLine={false} tick={{ fill: "#6b7280" }} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tick={{ fill: "#6b7280" }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: "0.95rem" }} />

              <Bar yAxisId="left" dataKey="leads" name="Leads" fill={PRIMARY} radius={[6, 6, 0, 0]} barSize={32} />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cost"
                name="Spend (₹)"
                stroke={ACCENT}
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Campaign Performance */}
        <ChartCard title="Leads by Campaign" className="lg:col-span-2 xl:col-span-full">
          <ResponsiveContainer width="100%" height={420}>
            <BarChart
              data={campaignData.length ? campaignData : [{ name: "No campaigns", leads: 0 }]}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
              <XAxis type="number" axisLine={false} tick={{ fill: "#6b7280" }} />
              <YAxis type="category" dataKey="name" axisLine={false} tick={{ fill: "#4b5563", fontSize: "0.9rem" }} width={140} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="leads" fill={SECONDARY} radius={[0, 6, 6, 0]} barSize={36} name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>


          {/* Charts – Row 1 */}
          <div className="grid lg:grid-cols-2 gap-6 xl:gap-8">

{/* Subscribers Status */}
<ChartCard title="Subscribers Status">
  <ResponsiveContainer width="100%" height={360}>
    <PieChart>
      <Pie
        data={subscriberData.length ? subscriberData : [{ name: "No data", value: 1 }]}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={80}
        outerRadius={130}
        paddingAngle={5}
        label={({ name, percent }) => `${name} • ${Math.round(percent * 100)}%`}
        labelLine={false}
      >
        {subscriberData.map((_, i) => (
          <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip contentStyle={tooltipStyle} />
      <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: "0.9rem" }} />
    </PieChart>
  </ResponsiveContainer>
</ChartCard>

{/* Contact Requests */}
<ChartCard title="Contact Requests Breakdown">
  <ResponsiveContainer width="100%" height={360}>
    <PieChart>
      <Pie
        data={contactData.length ? contactData : [{ name: "No data", value: 1 }]}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius={80}
        outerRadius={130}
        paddingAngle={5}
        label={({ name, percent }) => `${name} • ${Math.round(percent * 100)}%`}
        labelLine={false}
      >
        {contactData.map((_, i) => (
          <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip contentStyle={tooltipStyle} />
      <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: "0.9rem" }} />
    </PieChart>
  </ResponsiveContainer>
</ChartCard>
</div>

        {/* Content Overview (original) */}
        <ChartCard title="Content Overview">
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={contentData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tick={{ fill: "#6b7280" }} />
              <YAxis axisLine={false} tick={{ fill: "#6b7280" }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="value" fill={PRIMARY} radius={[8, 8, 0, 0]} barSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

/* ── Reusable Components ────────────────────────────────────────────────────── */

function StatCard({ title, value, icon, color = "indigo", subtitle }) {
  const colorMap = {
    indigo: "from-indigo-500 to-indigo-600",
    emerald: "from-emerald-500 to-emerald-600",
    violet: "from-violet-500 to-violet-600",
    amber: "from-amber-500 to-amber-600",
    rose: "from-rose-500 to-rose-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${colorMap[color] || "from-gray-500 to-gray-600"}`}></div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
          <span className="text-3xl opacity-90">{icon}</span>
        </div>
        <h3 className={`mt-4 text-4xl lg:text-5xl font-extrabold bg-gradient-to-r ${colorMap[color]} bg-clip-text text-transparent`}>
          {value}
        </h3>
        {subtitle && <p className="mt-1 text-sm text-gray-600 font-medium">{subtitle}</p>}
      </div>
    </div>
  );
}

function ChartCard({ title, children, className = "" }) {
  return (
    <div
      className={`
        bg-white/80 backdrop-blur-sm border border-gray-200/70 
        rounded-2xl shadow-xl p-6 lg:p-8 
        hover:shadow-2xl transition-all duration-300
        ${className}
      `}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 tracking-tight">{title}</h2>
      {children}
    </div>
  );
}

const tooltipStyle = {
  backgroundColor: "rgba(255,255,255,0.98)",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.12)",
  padding: "12px 16px",
};