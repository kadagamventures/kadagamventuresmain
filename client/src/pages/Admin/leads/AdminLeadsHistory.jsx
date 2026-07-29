import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useAuthStore from "../../../zustand/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function AdminLeadsHistory() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/leads/stats/summary`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(res.data);
      } catch (err) {
        console.error("Failed to load stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) {
    return (
      <div className="p-6 space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Lead History Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white shadow rounded-xl p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
          ))}
        </div>
        <div className="h-96 bg-gray-100 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-10 text-center min-h-[70vh] flex flex-col items-center justify-center">
        <AlertCircle size={64} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No data available
        </h2>
        <p className="text-gray-600 mb-6 max-w-md">
          We couldn't load lead statistics at the moment. Please try again later
          or check your connection.
        </p>
        <button
          onClick={() => navigate("/admin/login")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  const getMonthName = (monthNumber) => {
    const date = new Date(2000, monthNumber - 1);
    return date.toLocaleString("en-IN", { month: "short" });
  };

  // const monthlyChartData = data.monthlyStats.map((m) => ({
  //   month: `${getMonthName(m._id.month)} ${m._id.year}`,
  //   leads: m.totalLeads,
  //   cost: m.totalCost,
  // }));
  const monthlyChartData = data.monthlyStats
  .slice(-6) // ✅ last 6 months only
  .map((m) => ({
    month: `${getMonthName(m._id.month)} ${m._id.year}`,
    leads: m.totalLeads,
    cost: m.totalCost,
  }));

  const campaignChartData = data.campaignStats.map((c) => ({
    campaign: c._id || "Unknown",
    leads: c.totalLeads,
    cost: c.totalCost,
  }));

  // Prepare table data
  const monthWiseData = data.monthlyStats.map((m) => [
    m._id.year,
    getMonthName(m._id.month),
    m.totalLeads.toLocaleString(),
    `₹ ${m.totalCost?.toLocaleString() || "0"}`,
  ]);

  const campaignWiseData = data.campaignStats.map((c) => [
    c.id || "Unnamed",
    c.totalLeads.toLocaleString(),
    `₹ ${c.totalCost?.toLocaleString() || "0"}`,
  ]);

  const campaignMonthlyData = data.campaignMonthlyStats.map((c) => [
    c.campaign || "—",
    c.year,
    getMonthName(c.month),
    c.totalLeads.toLocaleString(),
    `₹ ${c.totalCost?.toLocaleString() || "0"}`,
  ]);

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BarChart3 size={32} className="text-indigo-600" />
            Lead History Dashboard
          </h2>
          <p className="text-gray-600 mt-1">
            Performance overview • Last updated{" "}
            {new Date().toLocaleDateString("en-IN")}
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/leads")}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition shadow-sm"
        >
          Go Back
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<TrendingUp className="text-indigo-600" />}
          title="Total Leads"
          value={data.totalLeads.toLocaleString()}
          color="indigo"
        />
        <StatCard
          icon={<DollarSign className="text-emerald-600" />}
          title="Total Spend"
          value={`₹ ${data.totalCost?.toLocaleString() || "0"}`}
          color="emerald"
        />
        <StatCard
          icon={<Calendar className="text-amber-600" />}
          title="Months Tracked"
          value={data.monthlyStats?.length || 0}
          color="amber"
        />
        <StatCard
          icon={<PieChart className="text-purple-600" />}
          title="Active Campaigns"
          value={data.campaignStats?.length || 0}
          color="purple"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
            <TrendingUp size={20} className="text-indigo-600" />
            Monthly Lead & Cost Trend
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="leads"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  dot={{ r: 4, strokeWidth: 2 }}
                  name="Leads"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="cost"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ r: 4, strokeWidth: 2 }}
                  name="Cost (₹)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
            <BarChart3 size={20} className="text-indigo-600" />
            Campaign Performance Comparison
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaignChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="campaign"
                  angle={-30}
                  textAnchor="end"
                  height={70}
                  interval={0}
                />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.98)",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="leads"
                  fill="#6366f1"
                  name="Leads"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="cost"
                  fill="#10b981"
                  name="Cost (₹)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Paginated Tables */}
      <div className="space-y-10">
        <PaginatedDataTable
          title="Month-wise Performance"
          icon={<Calendar size={20} />}
          headers={["Year", "Month", "Leads", "Cost"]}
          data={monthWiseData}
          defaultPageSize={10}
        />

        <PaginatedDataTable
          title="Campaign-wise Performance"
          icon={<PieChart size={20} />}
          headers={["Campaign", "Total Leads", "Total Cost"]}
          data={campaignWiseData}
          defaultPageSize={10}
        />

        <PaginatedDataTable
          title="Campaign + Monthly Breakdown"
          icon={<BarChart3 size={20} />}
          headers={["Campaign", "Year", "Month", "Leads", "Cost"]}
          data={campaignMonthlyData}
          defaultPageSize={15}
          scrollable
        />
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// Reusable Stat Card (unchanged)
// ────────────────────────────────────────────────
function StatCard({ icon, title, value, color }) {
  const colorMap = {
    indigo: "bg-indigo-50 border-indigo-100 text-indigo-700",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-700",
    amber: "bg-amber-50 border-amber-100 text-amber-700",
    purple: "bg-purple-50 border-purple-100 text-purple-700",
  };

  return (
    <div
      className={`bg-white shadow rounded-xl p-6 border ${
        colorMap[color] || "border-gray-200"
      } hover:shadow-md transition-shadow`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div
          className={`p-3 rounded-full ${
            colorMap[color]?.split(" ")[0] || "bg-gray-100"
          }`}
        >
          {React.cloneElement(icon, { size: 28 })}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// NEW: Reusable Paginated Table
// ────────────────────────────────────────────────
function PaginatedDataTable({
  title,
  icon,
  headers,
  data = [],
  defaultPageSize = 10,
  scrollable = false,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white shadow rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-6 bg-gray-50 flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2.5">
          {icon}
          {title}
        </h2>
        {totalItems > 0 && (
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1}–{Math.min(endIndex, totalItems)} of{" "}
            {totalItems}
          </div>
        )}
      </div>

      <div className={scrollable ? "max-h-96 overflow-auto" : ""}>
        <table className="w-full text-sm">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="p-4 text-left font-semibold text-gray-700 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="p-10 text-center text-gray-500"
                >
                  No records found
                </td>
              </tr>
            ) : (
              currentData.map((row, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-gray-50/70 transition-colors ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                  }`}
                >
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="p-4">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalItems > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-600">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {[5, 10, 15, 20, 30, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={20} />
            </button>

            <span className="text-sm text-gray-700 min-w-[100px] text-center">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
