import { useState } from "react";
import {
  Database,
  RefreshCw,
  Server,
  FileText,
  Zap,
  Shield,
  Cloud,
  Wifi,
  HardDrive,
} from "lucide-react";

export default function SystemSettings() {
  const [system, setSystem] = useState({
    // Data
    dataRetention: 90,
    trafficLogRetention: 30,
    autoLogRotation: true,

    // Backup
    autoBackup: true,
    backupFrequency: "daily",
    backupStorage: "local",
    backupEncryption: true,

    // Network
    routerApiTimeout: 5,
    hotspotSyncInterval: 60,
    maxRouterConnections: 10,

    // Performance
    cacheEnabled: true,
    redisEnabled: false,
    queueWorkers: true,
    systemMode: "balanced",

    // Protection
    maintenanceMode: false,
    autoSuspendNonPayment: true,
    gracePeriodDays: 3,
  });

  const update = (key, value) => {
    setSystem((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="card border-0 shadow-lg mb-4">
      <div className="card-header bg-transparent border-0 py-4">
        <h5 className="fw-bold">
          <Server size={20} className="me-2" />
          ISP System Configuration
        </h5>
      </div>

      <div className="card-body">
        {/* DATA & LOGS */}
        <h6 className="fw-bold mb-3">Data & Logs</h6>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            <Database size={16} className="me-2" />
            Data Retention (days)
          </label>
          <input
            type="number"
            className="form-control"
            value={system.dataRetention}
            onChange={(e) => update("dataRetention", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            Traffic Log Retention (days)
          </label>
          <input
            type="number"
            className="form-control"
            value={system.trafficLogRetention}
            onChange={(e) => update("trafficLogRetention", e.target.value)}
          />
        </div>

        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            checked={system.autoLogRotation}
            onChange={() => update("autoLogRotation", !system.autoLogRotation)}
          />
          <label className="form-check-label fw-semibold">
            Enable Automatic Log Rotation
          </label>
        </div>

        <hr />

        {/* BACKUP & RECOVERY */}
        <h6 className="fw-bold mb-3">Backup & Disaster Recovery</h6>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            <RefreshCw size={16} className="me-2" />
            Backup Frequency
          </label>
          <select
            className="form-select"
            value={system.backupFrequency}
            onChange={(e) => update("backupFrequency", e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            <Cloud size={16} className="me-2" />
            Backup Storage Location
          </label>
          <select
            className="form-select"
            value={system.backupStorage}
            onChange={(e) => update("backupStorage", e.target.value)}
          >
            <option value="local">Local</option>
            <option value="s3">Amazon S3</option>
            <option value="ftp">FTP Server</option>
          </select>
        </div>

        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            checked={system.backupEncryption}
            onChange={() =>
              update("backupEncryption", !system.backupEncryption)
            }
          />
          <label className="form-check-label fw-semibold">
            Encrypt Backups
          </label>
        </div>

        <hr />

        {/* NETWORK & ROUTER */}
        <h6 className="fw-bold mb-3">Network & Router Management</h6>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            Router API Timeout (seconds)
          </label>
          <input
            type="number"
            className="form-control"
            value={system.routerApiTimeout}
            onChange={(e) => update("routerApiTimeout", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            Hotspot Sync Interval (seconds)
          </label>
          <input
            type="number"
            className="form-control"
            value={system.hotspotSyncInterval}
            onChange={(e) => update("hotspotSyncInterval", e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">
            Max Router Connections
          </label>
          <input
            type="number"
            className="form-control"
            value={system.maxRouterConnections}
            onChange={(e) => update("maxRouterConnections", e.target.value)}
          />
        </div>

        <hr />

        {/* PERFORMANCE */}
        <h6 className="fw-bold mb-3">Performance & Scaling</h6>

        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={system.cacheEnabled}
            onChange={() => update("cacheEnabled", !system.cacheEnabled)}
          />
          <label className="form-check-label fw-semibold">Enable Caching</label>
        </div>

        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={system.redisEnabled}
            onChange={() => update("redisEnabled", !system.redisEnabled)}
          />
          <label className="form-check-label fw-semibold">Enable Redis</label>
        </div>

        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            checked={system.queueWorkers}
            onChange={() => update("queueWorkers", !system.queueWorkers)}
          />
          <label className="form-check-label fw-semibold">
            Enable Queue Workers
          </label>
        </div>

        <hr />

        {/* BILLING AUTOMATION */}
        <h6 className="fw-bold mb-3">Billing & Automation</h6>

        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={system.autoSuspendNonPayment}
            onChange={() =>
              update("autoSuspendNonPayment", !system.autoSuspendNonPayment)
            }
          />
          <label className="form-check-label fw-semibold">
            Auto Suspend On Non-Payment
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Grace Period (days)</label>
          <input
            type="number"
            className="form-control"
            value={system.gracePeriodDays}
            onChange={(e) => update("gracePeriodDays", e.target.value)}
          />
        </div>

        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            checked={system.maintenanceMode}
            onChange={() => update("maintenanceMode", !system.maintenanceMode)}
          />
          <label className="form-check-label fw-semibold">
            Enable Maintenance Mode
          </label>
        </div>

        <div className="text-end mt-4">
          <button className="btn btn-primary px-4">Save System Settings</button>
        </div>
      </div>
    </div>
  );
}
