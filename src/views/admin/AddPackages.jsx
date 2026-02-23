import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import fetchSinglePackage from "../../controller/FetchSinglePackage";

export default function AddPackages() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const apiBase = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    speed: "",
    price: "",
    validity: "",
    dataLimit: "",
    isActive: false,
    description: "",
    devices: "",
    type: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg("");
    setLoading(true);

    try {
      const endpoint = id
        ? `${apiBase}/api/update-package/${id}`
        : `${apiBase}/api/add-package`;
      const method = id ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
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

      setSuccessMsg(
        data.message || (id ? "Package updated!" : "Package added!"),
      );

      setTimeout(() => setSuccessMsg(""), 3500);

      if (!id) {
        // Reset form only for creating
        setFormData({
          name: "",
          speed: "",
          price: "",
          validity: "",
          dataLimit: "",
          isActive: false,
          description: "",
          devices: "",
          type: "",
        });
      }
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Fetch package if editing
  useEffect(() => {
    if (id) {
      fetchSinglePackage(
        setErrors,
        setLoading,
        apiBase,
        id,
        setFormData,
        formData,
      );
    }
  }, [id]);

  return (
    <div className="row mb-6">
      <div className="col-12">
        <div className="card border-0 shadow-lg">
          <div className="card-header bg-transparent border-0 py-4">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0 fw-bold text-dark">
                <Plus size={20} className="me-2" />
                {id ? "Edit Internet Package" : "Add New Internet Package"}
              </h5>
              <button
                className="btn btn-sm btn-light"
                onClick={() => navigate(-1)}
              >
                ✕
              </button>
            </div>
          </div>

          {errors?.general && (
            <p className="alert alert-danger text-center">{errors.general}</p>
          )}
          {successMsg && (
            <p className="alert alert-success text-center">{successMsg}</p>
          )}

          <form method="POST" onSubmit={submitForm}>
            <div className="card-body">
              <div className="row g-4">
                {/* Package Name */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Package Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Home Basic"
                    name="name"
                    value={formData.name ?? ""}
                    onChange={handleChange}
                  />
                  {errors?.name && (
                    <small className="text-danger">{errors.name[0]}</small>
                  )}
                </div>

                {/* Speed */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Speed (Mbps) *
                  </label>
                  <input
                    min={1}
                    type="number"
                    className="form-control"
                    placeholder="e.g. 10"
                    name="speed"
                    value={formData.speed ?? ""}
                    onChange={handleChange}
                  />
                  {errors?.speed && (
                    <small className="text-danger">{errors.speed[0]}</small>
                  )}
                </div>

                {/* Price */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Price (GHS) *
                  </label>
                  <input
                    min={1}
                    type="number"
                    className="form-control"
                    placeholder="e.g. 150"
                    name="price"
                    value={formData.price ?? ""}
                    onChange={handleChange}
                  />
                  {errors?.price && (
                    <small className="text-danger">{errors.price[0]}</small>
                  )}
                </div>

                {/* Validity */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Validity (Days) *
                  </label>
                  <input
                    min={1}
                    type="number"
                    className="form-control"
                    placeholder="e.g. 30"
                    name="validity"
                    value={formData.validity ?? ""}
                    onChange={handleChange}
                  />
                  {errors?.validity && (
                    <small className="text-danger">{errors.validity[0]}</small>
                  )}
                </div>

                {/* Type */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Type *</label>
                  <select
                    className="form-control"
                    name="type"
                    value={formData.type ?? ""}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="special">Special</option>
                  </select>
                  {errors?.type && (
                    <small className="text-danger">{errors.type[0]}</small>
                  )}
                </div>

                {/* Data Limit */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Data Limit (GB)
                  </label>
                  <input
                    min={1}
                    type="number"
                    className="form-control"
                    placeholder="Leave empty for Unlimited"
                    name="dataLimit"
                    value={formData.dataLimit ?? ""}
                    onChange={handleChange}
                  />
                  {errors?.dataLimit && (
                    <small className="text-danger">{errors.dataLimit[0]}</small>
                  )}
                </div>

                {/* Devices */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Devices</label>
                  <input
                    min={1}
                    type="text"
                    className="form-control"
                    placeholder="e.g 4 or leave empty for unlimited"
                    name="devices"
                    value={formData.devices ?? ""}
                    onChange={handleChange}
                  />
                  {errors?.devices && (
                    <small className="text-danger">{errors.devices[0]}</small>
                  )}
                </div>

                {/* Status */}
                <div className="col-md-4">
                  <div className="form-check mt-4 pt-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      checked={formData.isActive ?? ""}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label fw-semibold"
                      htmlFor="isActive"
                    >
                      Active Package
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div className="col-md-12">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Package details, fair usage policy, etc."
                    name="description"
                    value={formData.description ?? ""}
                    onChange={handleChange}
                  />
                  {errors?.description && (
                    <small className="text-danger">
                      {errors.description[0]}
                    </small>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="mt-4 pt-3 border-top d-flex justify-content-end gap-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate(-1)}
                >
                  {id ? "Cancel" : "Back"}
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
                  {loading
                    ? id
                      ? "Updating Package..."
                      : "Adding Package..."
                    : id
                      ? "Update Package"
                      : "Add Package"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
