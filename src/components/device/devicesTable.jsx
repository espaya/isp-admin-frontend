import { useState, useEffect } from "react";
import { Wifi, RefreshCw, XCircle, CheckCircle } from "lucide-react";
import Cookies from "js-cookie";

export default function DevicesTable() {
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const token = localStorage.getItem("token");

  // Fetch all devices
  const fetchDevices = async (page = 1) => {
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch(`${apiBase}/api/all-devices?page=${page}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ general: data.message });
        return;
      }

      const devicesList = data.data || [];
      setDevices(devicesList);

      // Fetch stats for each device but don't block offline devices
      devicesList.forEach((device) => refreshDeviceStats(device));
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices(currentPage);
  }, [currentPage]);

  // Refresh device stats individually
  const refreshDeviceStats = async (device) => {
    try {
      const res = await fetch(`${apiBase}/api/device-stats/${device.id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      // Even if device is offline, we update its status
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
                lastSeen: data.lastSeen ?? "-",
              }
            : d,
        ),
      );
    } catch (err) {
      // If request fails, mark device offline but keep it in the list
      setDevices((prev) =>
        prev.map((d) =>
          d.id === device.id
            ? {
                ...d,
                status: "offline",
                cpu: "-",
                memory: "-",
                clients: "-",
                bandwidth: { upload: "-", download: "-" },
                uptime: "-",
              }
            : d,
        ),
      );
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

  // Filtering
  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentDevices = filteredDevices.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredDevices.length / rowsPerPage);
  const paginate = (page) => setCurrentPage(page);

  return (
    <>
      {errors.general && <p className="alert alert-danger">{errors.general}</p>}

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
              {currentDevices.map((device) => (
                <tr key={device.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div
                        className="p-2 rounded-circle d-flex justify-content-center align-items-center text-white"
                        style={{
                          width: 40,
                          height: 40,
                          background:
                            device.color ||
                            "linear-gradient(135deg,#3b82f6,#06b6d4)",
                        }}
                      >
                        {device.icon || <Wifi size={20} />}
                      </div>
                      <div>
                        <div className="fw-bold">{device.name}</div>
                        <small className="text-muted">
                          {device.ip} • {device.location}
                        </small>
                        <div className="text-muted small">
                          {device.model} • {device.firmware || "-"}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`badge ${getStatusColor(device.status)} small`}
                      title={device.status === "offline" ? "Ping failed" : ""}
                    >
                      {device.status?.toUpperCase() || "OFFLINE"}
                    </span>
                    <div className="text-muted small mt-1">
                      Uptime: {device.uptime ?? "-"}
                      {device.status === "offline" && (
                        <span
                          className="text-warning ms-2"
                          title="Device is unreachable"
                        >
                          (Ping failed)
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="fw-bold">{device.cpu}</td>
                  <td className="fw-bold">{device.memory}</td>
                  <td className="fw-bold">{device.clients}</td>
                  <td className="fw-bold">
                    {device.bandwidth?.download} ↓ / {device.bandwidth?.upload}{" "}
                    ↑
                  </td>
                  <td>
                    <small className="text-muted">
                      {device.lastSeen ?? "-"}
                    </small>
                  </td>

                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-light me-1"
                      onClick={() => refreshDeviceStats(device)}
                    >
                      <RefreshCw size={14} />
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() =>
                        alert(
                          device.status === "online"
                            ? `${device.name} is online`
                            : `${device.name} is offline`,
                        )
                      }
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
      {/* {totalPages > 1 && ( */}
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
            className={`btn btn-sm ${
              currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      {/* )} */}
    </>
  );
}
