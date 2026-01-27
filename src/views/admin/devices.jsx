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

// Mock device data
const initialDevices = [
  {
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
    temperature: "42°C",
    firmware: "RouterOS 7.12",
    snmp: "enabled",
    alerts: 2,
    color: "linear-gradient(135deg,#3b82f6,#06b6d4)",
    icon: <Wifi size={20} />,
  },
  {
    id: 2,
    name: "L009 – Airport Site",
    ip: "10.10.1.1",
    location: "Airport, Accra",
    status: "offline",
    model: "Mikrotik L009",
    uptime: "0 days, 00:00:00",
    cpu: 0,
    memory: 0,
    clients: 0,
    lastSeen: "5 hours ago",
    bandwidth: { upload: "0 Mbps", download: "0 Mbps" },
    temperature: "N/A",
    firmware: "RouterOS 7.10",
    snmp: "enabled",
    alerts: 5,
    color: "linear-gradient(135deg,#ef4444,#e11d48)",
    icon: <AlertCircle size={20} />,
  },
  // ... add remaining devices
];

export default function Devices() {
  const [devices, setDevices] = useState(initialDevices);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDevices, setSelectedDevices] = useState([]);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [stats, setStats] = useState({
    total: 0,
    online: 0,
    offline: 0,
    avgUptime: 0,
    totalClients: 0,
    totalBandwidth: 0,
  });

  // Calculate stats
  useEffect(() => {
    const total = devices.length;
    const online = devices.filter((d) => d.status === "online").length;
    const offline = devices.filter((d) => d.status === "offline").length;
    const totalClients = devices.reduce((sum, d) => sum + d.clients, 0);
    const totalBandwidth = devices.reduce(
      (sum, d) => sum + parseInt(d.bandwidth.download),
      0,
    );
    const avgUptime = devices.filter((d) => d.status === "online").length;

    setStats({
      total,
      online,
      offline,
      avgUptime,
      totalClients,
      totalBandwidth,
    });
  }, [devices]);

  const toggleDeviceStatus = (id) => {
    setDevices(
      devices.map((device) =>
        device.id === id
          ? {
              ...device,
              status: device.status === "online" ? "offline" : "online",
              lastSeen:
                device.status === "online"
                  ? "Just went offline"
                  : "Just came online",
            }
          : device,
      ),
    );
  };

  const refreshDevice = (id) => {
    setDevices(
      devices.map((device) =>
        device.id === id
          ? {
              ...device,
              lastSeen: "Just checked",
              cpu: Math.floor(Math.random() * 100),
              memory: Math.floor(Math.random() * 100),
            }
          : device,
      ),
    );
  };

  const handleSelectDevice = (id) => {
    setSelectedDevices((prev) =>
      prev.includes(id)
        ? prev.filter((deviceId) => deviceId !== id)
        : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedDevices.length === filteredDevices.length) {
      setSelectedDevices([]);
    } else {
      setSelectedDevices(filteredDevices.map((d) => d.id));
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

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-success text-white";
      case "offline":
        return "bg-danger text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  // Pagination logic
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentDevices = filteredDevices.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredDevices.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            <button className="btn btn-light fw-semibold d-flex align-items-center gap-1">
              <RefreshCw size={16} /> Refresh All
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

      {/* Devices Table */}
      <div className="card shadow-lg border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th>Device</th>
                <th>Status</th>
                <th>CPU</th>
                <th>Memory</th>
                <th>Clients</th>
                <th>Bandwidth</th>
                <th>Last Seen</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.map((device) => (
                <tr key={device.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div
                        className="p-2 rounded-circle d-flex justify-content-center align-items-center text-white"
                        style={{
                          width: 40,
                          height: 40,
                          background: device.color,
                        }}
                      >
                        {device.icon}
                      </div>
                      <div>
                        <div className="fw-bold">{device.name}</div>
                        <small className="text-muted">
                          {device.ip} • {device.location}
                        </small>
                        <div className="text-muted small">
                          {device.model} • {device.firmware}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${getStatusColor(device.status)} small`}
                    >
                      {device.status.toUpperCase()}
                    </span>
                    <div className="text-muted small mt-1">
                      Uptime: {device.uptime}
                    </div>
                  </td>
                  <td className="fw-bold">{device.cpu}%</td>
                  <td className="fw-bold">{device.memory}%</td>
                  <td className="fw-bold">{device.clients}</td>
                  <td className="fw-bold">
                    {device.bandwidth.download} ↓ / {device.bandwidth.upload} ↑
                  </td>
                  <td>
                    <small className="text-muted">{device.lastSeen}</small>
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-light me-1"
                      onClick={() => refreshDevice(device.id)}
                    >
                      <RefreshCw size={14} />
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => toggleDeviceStatus(device.id)}
                    >
                      {device.status === "online" ? (
                        <XCircle size={14} className="text-danger" />
                      ) : (
                        <CheckCircle size={14} className="text-success" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4 gap-2">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() =>
              currentPage < totalPages && paginate(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

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
