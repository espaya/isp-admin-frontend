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

import { useState } from "react";

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData({
    ...formData,
    [name]: type === "checkbox" ? checked : value,
  });
};

const addDevice = () => {
  if (!formData.name || !formData.ip) {
    alert("Please fill in required fields");
    return;
  }

  const newDevice = {
    id: Date.now(),
    ...formData,
    status: "offline",
    uptime: "0 days, 00:00:00",
    cpu: 0,
    memory: 0,
    clients: 0,
    lastSeen: "Just added",
    bandwidth: { upload: "0 Mbps", download: "0 Mbps" },
    temperature: "N/A",
    firmware: "RouterOS 7.12",
    snmp: formData.monitorEnabled ? "enabled" : "disabled",
    alerts: 0,
    color: "from-gray-500 to-slate-600",
    icon: <Server size={20} />,
  };

  setDevices([...devices, newDevice]);
  setFormData({
    name: "",
    ip: "",
    location: "",
    model: "Mikrotik L009",
    description: "",
    snmpCommunity: "public",
    monitorEnabled: true,
  });
  setShowForm(false);
};

const deleteDevice = (id) => {
  if (window.confirm("Are you sure you want to delete this device?")) {
    setDevices(devices.filter((device) => device.id !== id));
  }
};

export default function AddDevice() {
  const [formData, setFormData] = useState({
    name: "",
    ip: "",
    location: "",
    model: "Mikrotik L009",
    description: "",
    snmpCommunity: "public",
    monitorEnabled: true,
  });

  const deviceModels = [
    "Mikrotik L009",
    "Mikrotik RB4011",
    "Mikrotik CCR1036",
    "Mikrotik hAP ac²",
    "Mikrotik RB5009",
    "Mikrotik CRS3xx",
    "Cisco Catalyst",
    "Ubiquiti UniFi",
  ];

  return (
    <div className="row mb-6">
      <div className="col-12">
        <div className="card border-0 shadow-lg">
          <div className="card-header bg-transparent border-0 py-4">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0 fw-bold text-dark">
                <Plus size={20} className="me-2" />
                Register New Network Device
              </h5>
              <button className="btn btn-sm btn-light">✕</button>
            </div>
          </div>
          <div className="card-body">
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Device Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., L009 – Adum POP"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">IP Address *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., 192.168.1.1"
                  name="ip"
                  value={formData.ip}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Location</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., Adum, Kumasi"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Device Model</label>
                <select
                  className="form-select"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                >
                  {deviceModels.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-12">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Device purpose, notes, etc."
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">SNMP Community</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="public"
                  name="snmpCommunity"
                  value={formData.snmpCommunity}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <div className="form-check mt-4 pt-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="monitorEnabled"
                    name="monitorEnabled"
                    checked={formData.monitorEnabled}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label fw-semibold"
                    htmlFor="monitorEnabled"
                  >
                    Enable Monitoring
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-top d-flex justify-content-end gap-3">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={addDevice}
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                }}
              >
                <Plus size={16} className="me-2" />
                Add Device
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
