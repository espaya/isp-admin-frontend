import { useState } from "react";
import { Settings as SettingsIcon, UploadCloud } from "lucide-react";

export default function GeneralSettings() {
  const [logoPreview, setLogoPreview] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleLogoDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => setLogoPreview(reader.result);
    reader.readAsDataURL(file);

    // TODO: Send to backend via FormData
  };

  return (
    <div className="card border-0 shadow-lg mb-4">
      <div className="card-header bg-transparent border-0 py-4">
        <h5 className="card-title mb-0 fw-bold text-dark">
          <SettingsIcon size={20} className="me-2" />
          General Settings
        </h5>
      </div>

      <div className="card-body">
        <div className="row g-4">
          {/* ISP NAME */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">ISP Name</label>
            <input type="text" className="form-control" />
          </div>

          {/* SUPPORT EMAIL */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Support Email</label>
            <input type="email" className="form-control" />
          </div>

          {/* SUPPORT PHONE */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Support Phone</label>
            <input type="text" className="form-control" />
          </div>

          {/* ADDRESS */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Office Address</label>
            <input type="text" className="form-control" />
          </div>

          {/* CURRENCY */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Currency</label>
            <select className="form-select">
              <option value="GHS">GHS (₵)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>

          {/* TIMEZONE */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Timezone</label>
            <select className="form-select">
              <option>UTC+00:00 GMT</option>
              <option>UTC+01:00 West Africa</option>
            </select>
          </div>

          {/* DATE FORMAT */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Date Format</label>
            <select className="form-select">
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>

          {/* TIME FORMAT */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Time Format</label>
            <select className="form-select">
              <option>24-hour</option>
              <option>12-hour</option>
            </select>
          </div>

          {/* PAYSTACK KEYS */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Paystack Public Key
            </label>
            <input type="text" className="form-control" />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Paystack Secret Key
            </label>
            <input type="password" className="form-control" />
          </div>

          {/* MAINTENANCE MODE */}
          <div className="col-md-12">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label fw-semibold">
                Enable Maintenance Mode
              </label>
            </div>
          </div>

          {/* DRAG & DROP LOGO */}
          <div className="col-md-12">
            <label className="form-label fw-semibold">Upload Logo</label>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleLogoDrop}
              className={`border rounded-4 p-4 text-center ${
                dragging ? "border-primary bg-light" : "border-secondary"
              }`}
              style={{
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  style={{ maxHeight: 80 }}
                />
              ) : (
                <>
                  <UploadCloud size={40} className="text-muted mb-2" />
                  <p className="mb-0 text-muted">Drag & drop your logo here</p>
                  <small className="text-muted">
                    Recommended size: 200x60px
                  </small>
                </>
              )}
            </div>
          </div>

          {/* SAVE BUTTON */}
          <div className="col-md-12 text-end mt-3">
            <button className="btn btn-primary px-4">Save Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
}
