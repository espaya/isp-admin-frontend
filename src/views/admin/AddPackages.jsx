import { useState } from "react";

export default function AddPackages() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    speed: "",
    price: "",
    validity: "",
    dataLimit: "",
    isActive: "",
    description: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="row mb-6">
        <div className="col-12">
          <div className="card border-0 shadow-lg">
            <div className="card-header bg-transparent border-0 py-4">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0 fw-bold text-dark">
                  <Plus size={20} className="me-2" />
                  Add New Internet Package
                </h5>
                <button className="btn btn-sm btn-light">✕</button>
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
                      value={formData.name}
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
                      type="number"
                      className="form-control"
                      placeholder="e.g. 10"
                      name="speed"
                      value={formData.speed}
                      onChange={handleChange}
                    />
                    {errors?.speed && (
                      <small className="text-danger">{errors.speed[0]}</small>
                    )}
                  </div>

                  {/* Price */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Price (GHS) *
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g. 150"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                    {errors?.price && (
                      <small className="text-danger">{errors.price[0]}</small>
                    )}
                  </div>

                  {/* Validity */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Validity (Days) *
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g. 30"
                      name="validity"
                      value={formData.validity}
                      onChange={handleChange}
                    />
                    {errors?.validity && (
                      <small className="text-danger">
                        {errors.validity[0]}
                      </small>
                    )}
                  </div>

                  {/* Data Limit */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Data Limit (GB)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Leave empty for Unlimited"
                      name="dataLimit"
                      value={formData.dataLimit}
                      onChange={handleChange}
                    />
                    {errors?.dataLimit && (
                      <small className="text-danger">
                        {errors.dataLimit[0]}
                      </small>
                    )}
                  </div>

                  {/* Status */}
                  <div className="col-md-6">
                    <div className="form-check mt-4 pt-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={formData.isActive}
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
                    <label className="form-label fw-semibold">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Package details, fair usage policy, etc."
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                    {errors?.description && (
                      <small className="text-danger">
                        {errors.description[0]}
                      </small>
                    )}
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
                    {loading ? "Adding Package..." : "Add Package"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
