import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Wifi,
  RefreshCw,
  XCircle,
  CheckCircle,
  Eye,
  Edit,
  Trash2,
  Network,
} from "lucide-react";
import Swal from "sweetalert2";

export default function DevicesTable() {
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  // Fetch all devices from API
  const fetchDevices = async () => {
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch(`${apiBase}/api/all-devices`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ general: data.message });
        return;
      }

      // Handle both paginated and non-paginated responses
      const devicesList = data.data || data;
      setDevices(devicesList);

      // Fetch stats for each device
      devicesList.forEach((device) => refreshDeviceStats(device));
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  // ping device
  const ping = async (device) => {
    const token = localStorage.getItem("token");
    const apiBase = import.meta.env.VITE_API_URL;

    Swal.fire({
      title: "Pinging Device",
      text: `Checking ${device.name}...`,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(
        `${apiBase}/api/ping?device_id=${device.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        Swal.fire({
          icon: "success",
          title: "✅ Device Online",
          text: `${device.name} responded in ${data.response_time || "N/A"}`,
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "❌ Device Offline",
          text: data.message || `${device.name} is not responding`,
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "❌ Error",
        text: err.message,
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  // Refresh single device stats
  const refreshDeviceStats = async (device) => {
    try {
      const res = await fetch(`${apiBase}/api/device-stats/${device.id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log(data)

      setDevices((prev) =>
        prev.map((d) =>
          d.id === device.id
            ? {
                ...d,
                status: data.status || "offline",
                cpu: data.cpu ?? "-",
                memory: data.memory ?? "-",
                clients: data.clients ?? "-",
                bandwidth: data.bandwidth || { upload: "-", download: "-" },
                uptime: data.uptime ?? "-",
              }
            : d,
        ),
      );
    } catch (err) {
      // Mark as offline if stats fetch fails
      setDevices((prev) =>
        prev.map((d) =>
          d.id === device.id
            ? { ...d, status: "offline", cpu: "-", memory: "-", clients: "-" }
            : d,
        ),
      );
    }
  };

  // Refresh all devices
  const refreshAllDevices = () => {
    devices.forEach((device) => refreshDeviceStats(device));
  };

  // Delete device
  const deleteDevice = async (deviceId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleting...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      try {
        const response = await fetch(
          `${apiBase}/api/device/delete/${deviceId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to delete device.");
        }

        setDevices((prev) => prev.filter((d) => d.id !== deviceId));
        Swal.fire("Deleted!", "Device has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error!", err.message, "error");
      }
    }
  };

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

  // Filter devices
  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ip?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Search and Filter Bar */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, IP, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-outline-primary w-100"
            onClick={refreshAllDevices}
          >
            <RefreshCw size={16} className="me-1" /> Refresh All
          </button>
        </div>
      </div>

      {/* Error Message */}
      {errors.general && <p className="alert alert-danger">{errors.general}</p>}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading devices...</span>
          </div>
          <p className="mt-2">Loading devices...</p>
        </div>
      )}

      {/* Devices Table */}
      {!loading && (
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDevices.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      No devices found
                    </td>
                  </tr>
                ) : (
                  filteredDevices.map((device) => (
                    <tr key={device.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="p-2 rounded-circle d-flex justify-content-center align-items-center text-white"
                            style={{
                              width: 40,
                              height: 40,
                              background:
                                "linear-gradient(135deg,#3b82f6,#06b6d4)",
                            }}
                          >
                            <Wifi size={20} />
                          </div>
                          <div>
                            <div className="fw-bold">{device.name}</div>
                            <small className="text-muted">
                              {device.ip} • {device.location}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge ${getStatusColor(device.status)} small`}
                        >
                          {device.status?.toUpperCase() || "OFFLINE"}
                        </span>
                        {device.uptime && device.uptime !== "-" && (
                          <div className="text-muted small mt-1">
                            Uptime: {device.uptime}
                          </div>
                        )}
                      </td>
                      <td className="fw-bold">{device.cpu || "-"}%</td>
                      <td className="fw-bold">{device.memory || "-"}%</td>
                      <td className="fw-bold">{device.clients || "0"}</td>
                      <td className="fw-bold">
                        ↓ {device.bandwidth?.download || "-"} / ↑{" "}
                        {device.bandwidth?.upload || "-"}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-light me-1"
                          href={`/admin/dashboard/devices/view/${device.id}`}
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          className="btn btn-sm btn-light me-1"
                          href={`/admin/dashboard/devices/edit/${device.id}`}
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="btn btn-sm btn-light me-1"
                          onClick={() => refreshDeviceStats(device)}
                        >
                          <RefreshCw size={14} />
                        </button>
                        <button
                          title="Ping this device"
                          className="btn btn-sm btn-light me-1"
                          onClick={() => ping(device)}
                        >
                          <Network size={14} />
                        </button>
                        <button
                          className="btn btn-sm btn-light"
                          onClick={() => deleteDevice(device.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
