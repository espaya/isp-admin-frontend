import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Server,
  Wifi,
  Globe,
  MapPin,
  Cpu,
  Activity,
  Clock,
  Shield,
  Download,
  Upload,
  Plus,
  Edit2,
  Trash2,
  Eye,
  RefreshCw,
  Filter,
  Search,
  MoreVertical,
  AlertCircle,
  CheckCircle,
  XCircle,
  BarChart3,
  Zap,
  HardDrive,
  Network,
  Users,
} from "lucide-react";
import DevicesTable from "../../components/device/devicesTable";
import Cookies from "js-cookie";
import fetchAllDevices from "../../controller/FetchAllDevices";

const apiBase = import.meta.env.VITE_API_URL;

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [errors, setErrors] = useState({});
  const [stats, setStats] = useState({
    total: 0,
    online: 0,
    offline: 0,
    avgUptime: 0,
    totalClients: 0,
    totalBandwidth: 0,
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch card stats from backend
  const fetchStats = async () => {
    try {
      const res = await fetch(`${apiBase}/api/device-cards-stats`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch stats");

      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllDevices(setDevices, setLoading, setErrors, apiBase);
    fetchStats();
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    setErrors({});

    try {
      await Promise.all([
        fetchAllDevices(setDevices, setLoading, setErrors, apiBase),
        fetchStats(),
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div
        className="p-4 rounded-4 text-white shadow mb-5"
        style={{
          background: "linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="fw-bold mb-1 d-flex align-items-center gap-2">
              <Server /> Network Devices
            </h1>
            <p className="opacity-75 mb-0">
              Monitor and manage all network infrastructure devices
            </p>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-light fw-semibold d-flex align-items-center gap-1"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshCw size={16} className={loading ? "spin" : ""} />
              {loading ? "Refreshing..." : "Refresh All"}
            </button>
            <Link
              to="/admin/dashboard/devices/add"
              className="btn btn-dark fw-semibold d-flex align-items-center gap-1"
            >
              <Plus size={16} /> Add Device
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        {[
          {
            title: "Total Devices",
            value: stats.total,
            icon: <Server size={26} />,
            gradient: "linear-gradient(135deg,#8b5cf6,#ec4899)",
          },
          {
            title: "Online",
            value: stats.online,
            icon: <CheckCircle size={26} />,
            gradient: "linear-gradient(135deg,#10b981,#22c55e)",
          },
          {
            title: "Offline",
            value: stats.offline,
            icon: <XCircle size={26} />,
            gradient: "linear-gradient(135deg,#ef4444,#f43f5e)",
          },
          {
            title: "Total Clients",
            value: stats.totalClients,
            icon: <Users size={26} />,
            gradient: "linear-gradient(135deg,#3b82f6,#6366f1)",
          },
          {
            title: "Total Bandwidth",
            value: `${stats.totalBandwidth} Mbps`,
            icon: <BarChart3 size={26} />,
            gradient: "linear-gradient(135deg,#f59e0b,#f97316)",
          },
          {
            title: "Avg. Uptime (days)",
            value: stats.avgUptime,
            icon: <Activity size={26} />,
            gradient: "linear-gradient(135deg,#8b5cf6,#6366f1)",
          },
        ].map((s, i) => (
          <div key={i} className="col-lg-4 col-md-6">
            <div
              className="card border-0 shadow-lg text-white h-100"
              style={{ background: s.gradient }}
            >
              <div className="card-body p-4 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between mb-3">
                  <div className="p-3 rounded-circle bg-white bg-opacity-25">
                    {s.icon}
                  </div>
                </div>
                <small className="opacity-75 text-uppercase">{s.title}</small>
                <h2 className="fw-bold mt-2">{s.value}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="row mb-5 align-items-center">
        <div className="col-lg-4 mb-3 mb-lg-0">
          <div className="input-group">
            <span className="input-group-text bg-light">
              <Search size={14} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search devices by name, IP, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-8 d-flex gap-2 justify-content-lg-end">
          <select
            className="form-select form-select-sm w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
          <button
            className="btn btn-outline-primary d-flex align-items-center gap-1"
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
            }}
          >
            <Filter size={14} /> Clear Filters
          </button>
        </div>
      </div>

      <DevicesTable devices={devices} setDevices={setDevices} />

      {/* Empty State */}
      {filteredDevices.length === 0 && (
        <div className="text-center py-8 mt-5">
          <Server size={64} className="text-muted mb-4" />
          <h4 className="text-dark mb-2">No devices found</h4>
          <p className="text-muted mb-4">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filters"
              : "Add your first network device to get started"}
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
            }}
          >
            <Plus size={16} className="me-2" /> Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
