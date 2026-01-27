import { useState } from "react";
import {
  Wifi,
  Zap,
  Crown,
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  Download,
  Upload,
  Users,
  BarChart3,
  Shield,
} from "lucide-react";

/* ------------------ DATA ------------------ */

const packagesData = [
  {
    id: 1,
    name: "Daily Starter",
    description: "Perfect for quick browsing and light usage",
    price: 10,
    currency: "¢",
    duration: "24 Hours",
    speed: "10 Mbps",
    data: "Unlimited",
    status: "active",
    gradient: "linear-gradient(135deg,#10b981,#059669)",
    icon: <Wifi size={24} />,
    badge: "Active",
    badgeColor: "bg-success-subtle text-success",
    users: 1245,
    popularity: 85,
    features: ["24/7 Support", "No Throttling", "Basic Support"],
  },
  {
    id: 2,
    name: "Weekly Pro",
    description: "Best value for regular users and families",
    price: 50,
    currency: "¢",
    duration: "7 Days",
    speed: "20 Mbps",
    data: "Unlimited",
    status: "popular",
    gradient: "linear-gradient(135deg,#3b82f6,#2563eb)",
    icon: <Zap size={24} />,
    badge: "Most Popular",
    badgeColor: "bg-primary-subtle text-primary",
    users: 2890,
    popularity: 95,
    features: ["Priority Support", "Family Sharing", "Ad Blocker"],
  },
  {
    id: 3,
    name: "Monthly Elite",
    description: "For power users, gamers, and offices",
    price: 150,
    currency: "¢",
    duration: "30 Days",
    speed: "50 Mbps",
    data: "Unlimited",
    status: "premium",
    gradient: "linear-gradient(135deg,#8b5cf6,#6d28d9)",
    icon: <Crown size={24} />,
    badge: "Premium",
    badgeColor: "bg-purple-subtle text-purple",
    users: 876,
    popularity: 75,
    features: ["24/7 VIP Support", "Gaming Mode", "4K Streaming"],
  },
  {
    id: 4,
    name: "Quarterly Business",
    description: "Enterprise-grade connectivity for businesses",
    price: 400,
    currency: "¢",
    duration: "90 Days",
    speed: "100 Mbps",
    data: "Unlimited",
    status: "business",
    gradient: "linear-gradient(135deg,#f59e0b,#d97706)",
    icon: <Shield size={24} />,
    badge: "Business",
    badgeColor: "bg-warning-subtle text-warning",
    users: 324,
    popularity: 60,
    features: ["99.9% Uptime", "Static IP", "Dedicated Support"],
  },
  {
    id: 5,
    name: "Student Plan",
    description: "Affordable internet for students",
    price: 30,
    currency: "¢",
    duration: "30 Days",
    speed: "15 Mbps",
    data: "Unlimited",
    status: "special",
    gradient: "linear-gradient(135deg,#06b6d4,#0891b2)",
    icon: <Users size={24} />,
    badge: "Student",
    badgeColor: "bg-info-subtle text-info",
    users: 1567,
    popularity: 80,
    features: ["Study Mode", "Educational Discount", "Group Sharing"],
  },
  {
    id: 6,
    name: "Add New Package",
    description: "Create a custom internet package",
    price: "Custom",
    currency: "",
    duration: "Flexible",
    speed: "Custom",
    data: "Custom",
    status: "add",
    gradient: "linear-gradient(135deg,#e5e7eb,#d1d5db)",
    icon: <Plus size={24} />,
    badge: "New",
    badgeColor: "bg-light text-dark",
    features: ["Custom Speeds", "Flexible Duration", "Tailored Pricing"],
  },
];

/* ------------------ COMPONENT ------------------ */

export default function Packages() {
  const [viewMode, setViewMode] = useState("grid");

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPackages = packagesData.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
              <Wifi /> Internet Packages
            </h1>
            <p className="opacity-75 mb-0">
              Manage internet plans, pricing & subscriptions
            </p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-light fw-semibold">
              <Eye size={16} className="me-2" />
              Preview
            </button>
            <button className="btn btn-dark fw-semibold">
              <Plus size={16} className="me-2" />
              Add Package
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="row g-4 mb-5">
        {[
          {
            label: "Total Packages",
            value: packagesData.length - 1,
            icon: <Wifi />,
            gradient: "linear-gradient(135deg,#3b82f6,#6366f1)",
          },
          {
            label: "Active Users",
            value: "7,102",
            icon: <Users />,
            gradient: "linear-gradient(135deg,#10b981,#22c55e)",
          },
          {
            label: "Avg. Rating",
            value: "4.8 / 5",
            icon: <BarChart3 />,
            gradient: "linear-gradient(135deg,#f59e0b,#f97316)",
          },
          {
            label: "Revenue",
            value: "¢12,450",
            icon: <span className="fw-bold">¢</span>,
            gradient: "linear-gradient(135deg,#8b5cf6,#ec4899)",
          },
        ].map((s, i) => (
          <div key={i} className="col-lg-3 col-md-6">
            <div
              className="card border-0 shadow-lg text-white"
              style={{ background: s.gradient }}
            >
              <div className="card-body p-4 d-flex justify-content-between">
                <div>
                  <small className="opacity-75">{s.label}</small>
                  <h3 className="fw-bold mt-1">{s.value}</h3>
                </div>
                <div className="bg-white bg-opacity-25 p-3 rounded-circle">
                  {s.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SEARCH + VIEW */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <input
            className="form-control w-50"
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="btn-group">
            <button
              className={`btn ${viewMode === "grid" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setViewMode("grid")}
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      {/* PACKAGES */}
      <div className="row g-4">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className={ "col-lg-4 col-md-6"}
          >
            <div className="card border-0 shadow-lg h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between mb-4">
                  <div
                    className="p-3 rounded-circle text-white"
                    style={{ background: pkg.gradient }}
                  >
                    {pkg.icon}
                  </div>
                  <span className={`badge ${pkg.badgeColor} px-3 py-2`}>
                    {pkg.badge}
                  </span>
                </div>

                <h5 className="fw-bold">{pkg.name}</h5>
                <p className="text-muted small mb-3">{pkg.description}</p>

                <h2 className="fw-bold mb-3">
                  {pkg.currency}
                  {pkg.price}
                  {pkg.price !== "Custom" && (
                    <small className="text-muted ms-2">/ plan</small>
                  )}
                </h2>

                <ul className="list-unstyled small mb-4">
                  <li>
                    <Clock size={14} className="me-2" /> {pkg.duration}
                  </li>
                  <li>
                    <Download size={14} className="me-2" /> {pkg.speed}
                  </li>
                  <li>
                    <Upload size={14} className="me-2" /> {pkg.data}
                  </li>
                  {pkg.features.slice(0, 2).map((f, i) => (
                    <li key={i}>
                      <CheckCircle size={14} className="text-success me-2" />
                      {f}
                    </li>
                  ))}
                </ul>

                {pkg.status === "add" ? (
                  <button className="btn btn-outline-primary w-100">
                    <Plus size={16} className="me-2" />
                    Create Package
                  </button>
                ) : (
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary flex-fill">
                      <Edit2 size={16} className="me-2" />
                      Edit
                    </button>
                    <button className="btn btn-outline-danger">
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
