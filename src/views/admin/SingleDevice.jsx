import { useState } from "react";
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
  CheckCircle,
  XCircle,
  BarChart3,
  RefreshCw,
  Eye,
  MoreVertical,
  Plus,
  AlertCircle,
} from "lucide-react";

export default function SingleDevice() {
  const [device, setDevice] = useState({
    id: 1,
    name: "L009 – Adum POP",
    ip: "192.168.88.1",
    location: "Adum, Kumasi",
    status: "online",
    model: "Mikrotik L009",
    uptime: "45 days, 12:34:21",
    cpu: 35,
    memory: 42,
    clients: 124,
    lastSeen: "2 minutes ago",
    bandwidth: { upload: "85 Mbps", download: "120 Mbps" },
    temperature: 42,
    firmware: "RouterOS 7.12",
    snmp: "enabled",
    alerts: 2,
    color: "from-blue-500 to-cyan-600",
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "offline":
        return "bg-red-100 text-red-800 border-red-200";
      case "degraded":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const refreshDevice = () => {
    // Simulate refresh
    setDevice({
      ...device,
      cpu: Math.floor(Math.random() * 100),
      memory: Math.floor(Math.random() * 100),
      lastSeen: "Just refreshed",
    });
  };

  return (
    <div className="container-fluid px-4 py-4 bg-gray-50 min-vh-100">
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
              <Server /> {device.name}
            </h1>
            <p className="opacity-75 mb-0">
              {device.model} – {device.location}
            </p>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-light fw-semibold"
              onClick={refreshDevice}
            >
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

      {/* Device Stats */}
      <div className="row g-4 mb-5">
        <div className="col-lg-3 col-md-6">
          <div
            className="card border-0 shadow-lg text-white h-100"
            style={{ background: "linear-gradient(135deg,#10b981,#22c55e)" }}
          >
            <div className="card-body p-4">
              <small className="opacity-75">Status</small>
              <h2 className="fw-bold mt-2 fs-1">{device.status.toUpperCase()}</h2>
              <span className={`badge mt-2 ${getStatusColor(device.status)}`}>
                {device.status === "online" ? (
                  <Wifi size={18} />
                ) : (
                  <XCircle size={14} />
                )}
                <span className="ms-1">{device.status}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div
            className="card border-0 shadow-lg text-white h-100"
            style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }}
          >
            <div className="card-body p-4">
              <small className="opacity-75">CPU Usage</small>
              <h2 className="fw-bold mt-2">{device.cpu}%</h2>
              <div className="progress mt-2" style={{ height: "8px" }}>
                <div
                  className={`progress-bar ${
                    device.cpu > 80 ? "bg-danger" : "bg-white"
                  }`}
                  style={{ width: `${device.cpu}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div
            className="card border-0 shadow-lg text-white h-100"
            style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)" }}
          >
            <div className="card-body p-4">
              <small className="opacity-75">Memory Usage</small>
              <h2 className="fw-bold mt-2">{device.memory}%</h2>
              <div className="progress mt-2" style={{ height: "8px" }}>
                <div
                  className={`progress-bar ${
                    device.memory > 80 ? "bg-danger" : "bg-white"
                  }`}
                  style={{ width: `${device.memory}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div
            className="card border-0 shadow-lg text-white h-100"
            style={{ background: "linear-gradient(135deg,#8b5cf6,#ec4899)" }}
          >
            <div className="card-body p-4">
              <small className="opacity-75">Connected Clients</small>
              <h2 className="fw-bold mt-2">{device.clients}</h2>
              <small>Last seen: {device.lastSeen}</small>
            </div>
          </div>
        </div>
      </div>

      {/* Performance & Bandwidth */}
      <div className="row g-4 mb-5">
        <div className="col-lg-6">
          <div className="card border-0 shadow-lg p-4 h-100">
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <Activity /> Performance
            </h5>
            <div className="d-flex gap-4">
              <div>
                <small className="text-muted">CPU</small>
                <h3 className="fw-bold">{device.cpu}%</h3>
              </div>
              <div>
                <small className="text-muted">Memory</small>
                <h3 className="fw-bold">{device.memory}%</h3>
              </div>
              <div>
                <small className="text-muted">Temperature</small>
                <h3 className="fw-bold">{device.temperature}°C</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-lg p-4 h-100">
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <BarChart3 /> Bandwidth
            </h5>
            <div className="d-flex gap-4">
              <div>
                <small className="text-muted">Download</small>
                <h3 className="fw-bold text-success">{device.bandwidth.download}</h3>
              </div>
              <div>
                <small className="text-muted">Upload</small>
                <h3 className="fw-bold text-info">{device.bandwidth.upload}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts & Actions */}
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card border-0 shadow-lg p-4">
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <AlertCircle /> Alerts
            </h5>
            {device.alerts > 0 ? (
              <span className="badge bg-danger px-3 py-2">
                {device.alerts} Active Alert{device.alerts > 1 ? "s" : ""}
              </span>
            ) : (
              <span className="badge bg-success px-3 py-2">
                No Alerts
              </span>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-lg p-4">
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              Actions
            </h5>
            <div className="d-flex gap-3">
              <button className="btn btn-primary">
                <CheckCircle className="me-2" /> Enable Monitoring
              </button>
              <button className="btn btn-danger">
                <XCircle className="me-2" /> Disable Monitoring
              </button>
              <button className="btn btn-light">
                <Eye className="me-2" /> View Logs
              </button>
              <button className="btn btn-dark">
                <MoreVertical className="me-2" /> More Options
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
