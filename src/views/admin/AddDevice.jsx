import { Server, Plus } from "lucide-react";
import Cookies from "js-cookie";

import { useState } from "react";

export default function AddDevice() {
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    ip: "",
    location: "",
    model: "",
    description: "",
    snmpCommunity: "",
    monitorEnabled: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const token = localStorage.getItem("token");

  const submitForm = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg("");
    setLoading(true);

    try {
      const response = await fetch(`${apiBase}/api/add-device`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { general: data.message });
        return;
      }

      setSuccessMsg(data.message);
      setFormData({
        name: "",
        ip: "",
        location: "",
        model: "",
        description: "",
        snmpCommunity: "",
        monitorEnabled: false,
      });
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

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
          {errors.general && (
            <p className="alert alert-danger text-center"> {errors.general} </p>
          )}
          {successMsg && (
            <p className="alert alert-success text-center">
              hey there {successMsg}
            </p>
          )}
          <form method="POST" onSubmit={submitForm}>
            <div className="card-body">
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Device Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., L009 – Adum POP"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors?.name && (
                    <small className="text-danger"> {errors?.name[0]} </small>
                  )}
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
                  {errors?.ip && (
                    <small className="text-danger"> {errors?.ip[0]} </small>
                  )}
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
                  {errors?.location && (
                    <small className="text-danger">{errors?.location[0]}</small>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Device Model</label>
                  <select
                    className="form-select"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {deviceModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                  {errors?.model && (
                    <small className="text-danger"> {errors?.model[0]} </small>
                  )}
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
                  {errors?.description && (
                    <small className="text-danger">
                      {errors?.description[0]}
                    </small>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    SNMP Community
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g l009_monitor_2026"
                    name="snmpCommunity"
                    value={formData.snmpCommunity}
                    onChange={handleChange}
                  />
                  {errors?.snmpCommunity && (
                    <small className="text-danger">
                      {errors?.snmpCommunity[0]}
                    </small>
                  )}
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
                <button type="button" className="btn btn-outline-secondary">
                  Cancel
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                  }}
                >
                  <Plus size={16} className="me-2" />
                  {loading ? "Adding Device..." : "Add Device"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
