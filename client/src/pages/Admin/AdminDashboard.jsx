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
} from "recharts";

import useDashboardStore from "../../zustand/useDashboardStore";

// Modern color palette
const COLORS = ["#6366f1", "#10b981", "#f43f5e", "#f59e0b", "#8b5cf6"];
const BAR_COLOR = "#6366f1";

export default function AdminDashboard() {
  const { stats, fetchStats, loading } = useDashboardStore();

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-12 w-12 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
          <p className="text-lg font-medium text-gray-600">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Safe data with fallbacks
  const subscriberData = [
    { name: "Active", value: stats?.subscribers?.active ?? 0 },
    { name: "Inactive", value: stats?.subscribers?.inactive ?? 0 },
  ].filter((d) => d.value > 0); // hide zero slices

  const contactData = [
    { name: "Services", value: stats?.contactUs?.services ?? 0 },
    { name: "Products", value: stats?.contactUs?.products ?? 0 },
  ].filter((d) => d.value > 0);

  const mainData = [
    { name: "Blogs", value: stats?.blogs ?? 0 },
    { name: "Careers", value: stats?.careers ?? 0 },
  ];

  const totalSubscribers =
    (stats?.subscribers?.active ?? 0) + (stats?.subscribers?.inactive ?? 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Dashboard Overview
            </h2>
            <p className="mt-2 text-gray-600">
  Welcome back • {new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).replace(",", "").replace(/ /g, "/")}
</p>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Blogs"
            value={stats?.blogs ?? 0}
            icon="📝"
            color="indigo"
          />
          <StatCard
            title="Total Careers"
            value={stats?.careers ?? 0}
            icon="💼"
            color="emerald"
          />
          <StatCard
            title="Active Subscribers"
            value={stats?.subscribers?.active ?? 0}
            icon="👥"
            color="violet"
            subtitle={`of ${totalSubscribers}`}
          />
          <StatCard
            title="Inactive Subscribers"
            value={stats?.subscribers?.inactive ?? 0}
            icon="🔕"
            color="rose"
            subtitle={`of ${totalSubscribers}`}
          />
        </div>

        {/* Pie Charts */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <ChartCard title="Subscribers Status">
            <ResponsiveContainer width="100%" height={340}>
              <PieChart>
                <Pie
                  data={
                    subscriberData.length
                      ? subscriberData
                      : [{ name: "No data", value: 1 }]
                  }
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {subscriberData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.98)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Contact Requests Breakdown">
            <ResponsiveContainer width="100%" height={340}>
              <PieChart>
                <Pie
                  data={
                    contactData.length
                      ? contactData
                      : [{ name: "No data", value: 1 }]
                  }
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {contactData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.98)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Bar Chart */}
        <ChartCard title="Content Overview" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={380}>
            <BarChart
              data={mainData}
              margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tick={{ fill: "#6b7280" }}
              />
              <YAxis axisLine={false} tick={{ fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                }}
              />
              <Bar
                dataKey="value"
                fill={BAR_COLOR}
                radius={[8, 8, 0, 0]}
                barSize={48}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

/* Stat Card Component */
function StatCard({ title, value, icon, color = "indigo", subtitle }) {
  const colorMap = {
    indigo: "from-indigo-500 to-indigo-600",
    emerald: "from-emerald-500 to-emerald-600",
    violet: "from-violet-500 to-violet-600",
    rose: "from-rose-500 to-rose-600",
  };

  return (
    <div
      className={`
      bg-white rounded-2xl shadow-lg border border-gray-100/80 
      hover:shadow-xl hover:-translate-y-1 transition-all duration-300
      overflow-hidden
    `}
    >
      <div
        className={`h-2 bg-gradient-to-r ${
          colorMap[color] || "from-gray-400 to-gray-500"
        }`}
      ></div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {title}
          </p>
          <span className="text-2xl opacity-80">{icon}</span>
        </div>
        <h3
          className={`mt-4 text-4xl lg:text-5xl font-extrabold bg-gradient-to-r ${colorMap[color]} bg-clip-text text-transparent`}
        >
          {value.toLocaleString()}
        </h3>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
}

/* Chart Card Wrapper */
function ChartCard({ title, children, className = "" }) {
  return (
    <div
      className={`
      bg-white/70 backdrop-blur-sm border border-gray-200/60 
      rounded-2xl shadow-xl p-6 lg:p-8 
      transition-all duration-300 hover:shadow-2xl
      ${className}
    `}
    >
      <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-6 tracking-tight">
        {title}
      </h2>
      {children}
    </div>
  );
}
