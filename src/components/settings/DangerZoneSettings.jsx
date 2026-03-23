import { useState } from "react";
import { AlertCircle, Download, RefreshCw, XCircle, Trash2 } from "lucide-react";

export default function DangerZoneSettings() {
  return (
    <>
      <div className="card border-0 shadow-lg border-danger">
        <div className="card-header bg-danger bg-opacity-10 border-danger border-0 py-4">
          <h5 className="card-title mb-0 fw-bold text-danger">
            <AlertCircle size={20} className="me-2" />
            Danger Zone
          </h5>
        </div>
        <div className="card-body">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="d-grid">
                <button className="btn btn-outline-danger">
                  <RefreshCw size={16} className="me-2" />
                  Clear All Cache
                </button>
                <div className="form-text mt-2">
                  Clear application cache and temporary files
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-grid">
                <button className="btn btn-outline-danger">
                  <Download size={16} className="me-2" />
                  Export All Data
                </button>
                <div className="form-text mt-2">
                  Export database and logs as backup
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-grid">
                <button className="btn btn-danger">
                  <XCircle size={16} className="me-2" />
                  Reset All Settings
                </button>
                <div className="form-text mt-2">
                  Reset all settings to defaults
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-grid">
                <button className="btn btn-danger">
                  <Trash2 size={16} className="me-2" />
                  Delete All Data
                </button>
                <div className="form-text mt-2">
                  Permanently delete all data (irreversible)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
