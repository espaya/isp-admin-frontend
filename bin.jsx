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

{
  /* INSIGHTS */
}
<div className="row g-4 mb-5">
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
</div>;

{
  /* STATS */
}
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
              {s.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span className="ms-1">{s.change}</span>
            </span>
          </div>
          <small className="opacity-75 text-uppercase">{s.title}</small>
          <h2 className="fw-bold mt-2">{s.value}</h2>
        </div>
      </div>
    </div>
  ))}
</div>;

/* ------------------ DATA ------------------ */

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

const totalRevenue = paymentsData
  .filter((p) => p.status === "success")
  .reduce((sum, p) => sum + Number(p.amount), 0);
