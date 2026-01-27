import { useState } from "react";
import {
  CreditCard,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Filter,
  Search,
  MoreVertical,
  Eye,
  RefreshCw,
  BarChart3,
  TrendingUp,
  Users,
  Shield,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

/* ------------------ DATA ------------------ */

const paymentsData = [
  {
    id: 1,
    user: "Alex Johnson",
    email: "alex@example.com",
    amount: 49.99,
    package: "Monthly Elite",
    date: "2026-01-25",
    status: "completed",
    method: "Credit Card",
    transactionId: "TX-789456123",
  },
  {
    id: 2,
    user: "Sarah Williams",
    email: "sarah@example.com",
    amount: 19.99,
    package: "Weekly Pro",
    date: "2026-01-24",
    status: "pending",
    method: "PayPal",
    transactionId: "TX-321654987",
  },
  {
    id: 3,
    user: "Michael Brown",
    email: "michael@example.com",
    amount: 149.99,
    package: "Quarterly Business",
    date: "2026-01-23",
    status: "completed",
    method: "Bank Transfer",
    transactionId: "TX-654987321",
  },
  {
    id: 4,
    user: "Emma Davis",
    email: "emma@example.com",
    amount: 9.99,
    package: "Daily Starter",
    date: "2026-01-22",
    status: "failed",
    method: "Credit Card",
    transactionId: "TX-987321654",
  },
];

const stats = [
  {
    title: "Total Revenue",
    value: "$12,450",
    change: "+18.7%",
    up: true,
    gradient: "linear-gradient(135deg,#8b5cf6,#ec4899)",
    icon: <DollarSign size={26} />,
  },
  {
    title: "Completed",
    value: "1,042",
    change: "+12.5%",
    up: true,
    gradient: "linear-gradient(135deg,#10b981,#22c55e)",
    icon: <CheckCircle size={26} />,
  },
  {
    title: "Pending",
    value: "24",
    change: "-3.2%",
    up: false,
    gradient: "linear-gradient(135deg,#f59e0b,#f97316)",
    icon: <Clock size={26} />,
  },
  {
    title: "Failed",
    value: "8",
    change: "-15.4%",
    up: false,
    gradient: "linear-gradient(135deg,#ef4444,#f43f5e)",
    icon: <XCircle size={26} />,
  },
];

/* ------------------ HELPERS ------------------ */

const statusBadge = (status) => {
  if (status === "completed") return "bg-success-subtle text-success";
  if (status === "pending") return "bg-warning-subtle text-warning";
  return "bg-danger-subtle text-danger";
};

/* ------------------ COMPONENT ------------------ */

export default function Payment() {
  const [search, setSearch] = useState("");

  const filtered = paymentsData.filter(
    (p) =>
      p.user.toLowerCase().includes(search.toLowerCase()) ||
      p.transactionId.toLowerCase().includes(search.toLowerCase()),
  );

  const totalRevenue = paymentsData
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div
      className="container-fluid px-4 py-4"
      style={{ background: "#f8fafc" }}
    >
      {/* HEADER */}
      <div
        className="p-4 rounded-4 text-white shadow mb-5"
        style={{
          background: "linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="fw-bold mb-1 d-flex align-items-center gap-2">
              <CreditCard /> Payments
            </h1>
            <p className="opacity-75 mb-0">
              Track revenue, transactions & payment performance
            </p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-light fw-semibold">
              <RefreshCw size={16} className="me-2" />
              Refresh
            </button>
            <button className="btn btn-dark fw-semibold">
              <Download size={16} className="me-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="row g-4 mb-5">
        {stats.map((s, i) => (
          <div key={i} className="col-lg-3 col-md-6">
            <div
              className="card border-0 shadow-lg text-white h-100"
              style={{ background: s.gradient }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between mb-3">
                  <div className="p-3 rounded-circle bg-white bg-opacity-25">
                    {s.icon}
                  </div>
                  <span className="badge bg-white bg-opacity-25 px-3 py-2">
                    {s.up ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}
                    <span className="ms-1">{s.change}</span>
                  </span>
                </div>
                <small className="opacity-75 text-uppercase">{s.title}</small>
                <h2 className="fw-bold mt-2">{s.value}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TABLE */}
      <div className="card border-0 shadow-lg mb-5">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold mb-0">Recent Transactions</h5>
            <div className="input-group w-25">
              <span className="input-group-text bg-light">
                <Search size={14} />
              </span>
              <input
                className="form-control"
                placeholder="Search payments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="bg-light">
                <tr>
                  <th>User</th>
                  <th>Package</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="fw-semibold">{p.user}</div>
                      <small className="text-muted">{p.email}</small>
                    </td>
                    <td>{p.package}</td>
                    <td className="fw-bold">${p.amount.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${statusBadge(p.status)} px-3`}>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <small className="text-muted">{p.date}</small>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-light">
                        <Eye size={14} />
                      </button>
                      <button className="btn btn-sm btn-light ms-2">
                        <MoreVertical size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* INSIGHTS */}
      <div className="row g-4">
        <div className="col-lg-4">
          <div
            className="p-4 rounded-4 text-white shadow"
            style={{ background: "linear-gradient(135deg,#10b981,#22c55e)" }}
          >
            <h6>Total Processed</h6>
            <h2 className="fw-bold">${totalRevenue.toLocaleString()}</h2>
            <small className="opacity-75">
              <TrendingUp size={14} /> +18.7% MoM
            </small>
          </div>
        </div>

        <div className="col-lg-4">
          <div
            className="p-4 rounded-4 text-white shadow"
            style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }}
          >
            <h6>Active Subscribers</h6>
            <h2 className="fw-bold">1,245</h2>
            <small className="opacity-75">
              <Users size={14} /> currently active
            </small>
          </div>
        </div>

        <div className="col-lg-4">
          <div
            className="p-4 rounded-4 text-white shadow"
            style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)" }}
          >
            <h6>Security Score</h6>
            <h2 className="fw-bold">100%</h2>
            <small className="opacity-75">
              <Shield size={14} /> fully compliant
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
