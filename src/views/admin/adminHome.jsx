import { useState } from "react";
import {
  Users,
  Package,
  CreditCard,
  DollarSign,
  UserPlus,
  TrendingUp,
  Activity,
  Download,
  Upload,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  BarChart3,
  PieChart,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------------- MOCK DATA ---------------- */

const revenueData = [
  { day: "Mon", revenue: 3200 },
  { day: "Tue", revenue: 4200 },
  { day: "Wed", revenue: 3500 },
  { day: "Thu", revenue: 4800 },
  { day: "Fri", revenue: 5200 },
  { day: "Sat", revenue: 6100 },
  { day: "Sun", revenue: 5800 },
];

const latestUsers = [
  { id: 1, name: "Alex Johnson", email: "alex@example.com", date: "2026-01-25", status: "active" },
  { id: 2, name: "Sarah Williams", email: "sarah@example.com", date: "2026-01-24", status: "active" },
  { id: 3, name: "Michael Brown", email: "michael@example.com", date: "2026-01-23", status: "pending" },
  { id: 4, name: "Emma Davis", email: "emma@example.com", date: "2026-01-22", status: "active" },
  { id: 5, name: "James Wilson", email: "james@example.com", date: "2026-01-21", status: "inactive" },
];

/* ---------------- COMPONENT ---------------- */

export default function AdminHome() {
  const [timeRange, setTimeRange] = useState("weekly");

  const topCards = [
    {
      title: "Total Users",
      value: "1,245",
      change: "+12.5%",
      gradient: "linear-gradient(135deg,#06b6d4,#3b82f6)",
      icon: <Users size={26} />,
    },
    {
      title: "Active Packages",
      value: "324",
      change: "+8.2%",
      gradient: "linear-gradient(135deg,#10b981,#22c55e)",
      icon: <Package size={26} />,
    },
    {
      title: "Total Payments",
      value: "567",
      change: "+23.1%",
      gradient: "linear-gradient(135deg,#f59e0b,#f97316)",
      icon: <CreditCard size={26} />,
    },
    {
      title: "Total Revenue",
      value: "$12,450",
      change: "+18.7%",
      gradient: "linear-gradient(135deg,#8b5cf6,#ec4899)",
      icon: <DollarSign size={26} />,
    },
  ];

  const performanceMetrics = [
    { label: "Conversion Rate", value: "4.8%", change: "+0.5%" },
    { label: "Avg. Session", value: "4m 32s", change: "+12s" },
    { label: "Bounce Rate", value: "32.1%", change: "-2.4%" },
  ];

  return (
    <div className="container-fluid px-4 py-4" style={{ background: "#f8fafc" }}>

      {/* HEADER */}
      <div
        className="p-4 rounded-4 mb-5 text-white shadow"
        style={{
          background:
            "linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="fw-bold mb-1">Dashboard Overview</h1>
            <p className="opacity-75 mb-0 text-white">
              Welcome back — here’s a snapshot of your business.
            </p>
          </div>
          <button className="btn btn-light fw-semibold">
            <Calendar size={16} className="me-2" />
            This Week
          </button>
        </div>
      </div>

      {/* TOP KPI CARDS */}
      <div className="row g-4 mb-5">
        {topCards.map((card, i) => (
          <div key={i} className="col-lg-3 col-md-6">
            <div
              className="card border-0 shadow-lg text-white h-100"
              style={{ background: card.gradient }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between mb-4">
                  <div className="p-3 rounded-circle bg-white bg-opacity-25">
                    {card.icon}
                  </div>
                  <span className="badge rounded-pill px-3 py-2 bg-white bg-opacity-25">
                    <ArrowUpRight size={14} className="me-1" />
                    {card.change}
                  </span>
                </div>
                <small className="text-uppercase opacity-75">{card.title}</small>
                <h2 className="fw-bold mt-2">{card.value}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CHART + METRICS */}
      <div className="row g-4 mb-5">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Revenue Overview</h5>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      dataKey="revenue"
                      stroke="url(#rev)"
                      strokeWidth={4}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Performance</h5>
              {performanceMetrics.map((m, i) => (
                <div
                  key={i}
                  className="p-3 rounded-4 text-white mb-3"
                  style={{
                    background:
                      i === 0
                        ? "linear-gradient(135deg,#22c55e,#16a34a)"
                        : i === 1
                        ? "linear-gradient(135deg,#3b82f6,#6366f1)"
                        : "linear-gradient(135deg,#f59e0b,#f97316)",
                  }}
                >
                  <small className="opacity-75">{m.label}</small>
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold mb-0">{m.value}</h4>
                    <span>{m.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* USERS + SYSTEM STATUS */}
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Latest Users</h5>
              {latestUsers.map((u) => (
                <div key={u.id} className="d-flex align-items-center mb-3">
                  <div
                    className="rounded-circle text-white d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: 38,
                      height: 38,
                      background:
                        "linear-gradient(135deg,#6366f1,#ec4899)",
                    }}
                  >
                    <UserPlus size={16} />
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-semibold">{u.name}</div>
                    <small className="text-muted">{u.email}</small>
                  </div>
                  <MoreVertical size={18} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">System Status</h5>

              <div
                className="p-4 rounded-4 text-white mb-3"
                style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)" }}
              >
                <h6>Server Uptime</h6>
                <h2 className="fw-bold">99.9%</h2>
              </div>

              <div
                className="p-4 rounded-4 text-white"
                style={{ background: "linear-gradient(135deg,#10b981,#22c55e)" }}
              >
                <h6>Active Sessions</h6>
                <h2 className="fw-bold">342</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
