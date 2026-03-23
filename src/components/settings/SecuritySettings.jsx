import { Shield, Globe, Key, Clock, Lock, Server, Users, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function SecuritySettings() {
  const [security, setSecurity] = useState({
    // Admin
    twoFactorAuth: true,
    forcePasswordChange: true,
    minPasswordLength: 12,
    maxLoginAttempts: 5,
    lockoutDuration: 15,

    // Sessions
    sessionTimeout: 30,
    maxConcurrentSessions: 1,
    blockMultipleDevices: true,

    // Router/API
    apiAccess: true,
    restrictRouterIP: true,
    allowedManagementPorts: "8728,8291",
    enableSSH: false,

    // Abuse Protection
    bruteForceProtection: true,
    hotspotRateLimit: true,
    autoDisableSuspiciousUsers: true,

    // Network
    ipWhitelist: ["192.168.1.0/24"],
  });

  const update = (key, value) => {
    setSecurity((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="card border-0 shadow-lg mb-4">
      <div className="card-header bg-transparent border-0 py-4">
        <h5 className="card-title fw-bold">
          <Shield size={20} className="me-2" />
          ISP Security Settings
        </h5>
      </div>

      <div className="card-body">

        {/* ADMIN SECURITY */}
        <h6 className="fw-bold mb-3">Admin Security</h6>

        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={security.twoFactorAuth}
            onChange={() => update("twoFactorAuth", !security.twoFactorAuth)}
          />
          <label className="form-check-label fw-semibold">
            <Lock size={16} className="me-2" />
            Enable Two-Factor Authentication (2FA)
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            <Key size={16} className="me-2" />
            Minimum Password Length
          </label>
          <input
            type="number"
            className="form-control"
            value={security.minPasswordLength}
            onChange={(e) => update("minPasswordLength", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            Max Login Attempts
          </label>
          <input
            type="number"
            className="form-control"
            value={security.maxLoginAttempts}
            onChange={(e) => update("maxLoginAttempts", e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">
            Account Lockout Duration (minutes)
          </label>
          <input
            type="number"
            className="form-control"
            value={security.lockoutDuration}
            onChange={(e) => update("lockoutDuration", e.target.value)}
          />
        </div>

        <hr />

        {/* SESSION CONTROL */}
        <h6 className="fw-bold mb-3">Session Control</h6>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            <Clock size={16} className="me-2" />
            Session Timeout (minutes)
          </label>
          <input
            type="range"
            className="form-range"
            min="5"
            max="120"
            step="5"
            value={security.sessionTimeout}
            onChange={(e) => update("sessionTimeout", e.target.value)}
          />
          <div>{security.sessionTimeout} minutes</div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            Max Concurrent Sessions Per User
          </label>
          <input
            type="number"
            className="form-control"
            value={security.maxConcurrentSessions}
            onChange={(e) =>
              update("maxConcurrentSessions", e.target.value)
            }
          />
        </div>

        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            checked={security.blockMultipleDevices}
            onChange={() =>
              update("blockMultipleDevices", !security.blockMultipleDevices)
            }
          />
          <label className="form-check-label fw-semibold">
            <Users size={16} className="me-2" />
            Block Multiple Device Login
          </label>
        </div>

        <hr />

        {/* ROUTER / API SECURITY */}
        <h6 className="fw-bold mb-3">Router & API Security</h6>

        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={security.apiAccess}
            onChange={() => update("apiAccess", !security.apiAccess)}
          />
          <label className="form-check-label fw-semibold">
            <Server size={16} className="me-2" />
            Enable Router API Access
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            Allowed Management Ports
          </label>
          <input
            type="text"
            className="form-control"
            value={security.allowedManagementPorts}
            onChange={(e) =>
              update("allowedManagementPorts", e.target.value)
            }
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">
            <Globe size={16} className="me-2" />
            IP Whitelist
          </label>
          <textarea
            className="form-control"
            rows="3"
            value={security.ipWhitelist.join("\n")}
            onChange={(e) =>
              update("ipWhitelist", e.target.value.split("\n"))
            }
          />
        </div>

        <hr />

        {/* ABUSE PROTECTION */}
        <h6 className="fw-bold mb-3">Abuse & Attack Protection</h6>

        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={security.bruteForceProtection}
            onChange={() =>
              update("bruteForceProtection", !security.bruteForceProtection)
            }
          />
          <label className="form-check-label fw-semibold">
            <AlertTriangle size={16} className="me-2" />
            Enable Brute Force Protection
          </label>
        </div>

        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={security.hotspotRateLimit}
            onChange={() =>
              update("hotspotRateLimit", !security.hotspotRateLimit)
            }
          />
          <label className="form-check-label fw-semibold">
            Hotspot Login Rate Limiting
          </label>
        </div>

        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            checked={security.autoDisableSuspiciousUsers}
            onChange={() =>
              update(
                "autoDisableSuspiciousUsers",
                !security.autoDisableSuspiciousUsers
              )
            }
          />
          <label className="form-check-label fw-semibold">
            Auto-disable Suspicious Hotspot Users
          </label>
        </div>

        <div className="text-end mt-4">
          <button className="btn btn-primary px-4">
            Save Security Settings
          </button>
        </div>

      </div>
    </div>
  );
}