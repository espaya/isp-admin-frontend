import { useState } from "react";
// Import missing icon at the top
import { Activity, Zap, Trash2 } from "lucide-react";
import {
  Settings as SettingsIcon,
  Save,
  Bell,
  Shield,
  Globe,
  Database,
  Users,
  Key,
  Mail,
  AlertCircle,
  Clock,
  Lock,
  Eye,
  EyeOff,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  XCircle,
  Server,
  Network,
  Wifi,
  User,
  BellRing,
  Smartphone,
  CreditCard,
  FileText,
  HelpCircle,
  BarChart3
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    smsAlerts: false,
    deviceOffline: true,
    highCpu: true,
    bandwidthThreshold: true,
    maintenance: true,
    securityAlerts: true,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    ipWhitelist: ["192.168.1.0/24", "10.0.0.0/8"],
    passwordChangeRequired: false,
    apiAccess: true,
  });

  const [system, setSystem] = useState({
    dataRetention: 90,
    autoBackup: true,
    backupFrequency: "daily",
    logLevel: "info",
    cacheEnabled: true,
    performanceMode: false,
  });

  const [api, setApi] = useState({
    enabled: true,
    rateLimit: 100,
    key: "sk_live_***************",
    webhooks: [],
  });

  const [billing, setBilling] = useState({
    currency: "USD",
    taxRate: 8.5,
    autoInvoice: true,
    lateFee: 25,
    gracePeriod: 7,
    invoiceTemplate: "modern",
  });

  const [saved, setSaved] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const handleNotificationChange = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "general", label: "General", icon: <SettingsIcon size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "security", label: "Security", icon: <Shield size={18} /> },
    { id: "system", label: "System", icon: <Server size={18} /> },
    { id: "api", label: "API", icon: <Globe size={18} /> },
    { id: "billing", label: "Billing", icon: <CreditCard size={18} /> },
    { id: "users", label: "Users", icon: <Users size={18} /> },
    { id: "help", label: "Help", icon: <HelpCircle size={18} /> },
  ];

  return (
    <div className="container-fluid px-4 py-4 bg-gradient-to-br from-gray-50 to-white min-vh-100">
      {/* Header */}
      <div className="row mb-6">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h2 fw-bold text-dark mb-2">
                <SettingsIcon className="me-3 text-primary" size={32} />
                Settings
              </h1>
              <p className="text-muted mb-0">
                Manage your ISP application preferences and configurations
              </p>
            </div>
            <button
              className={`btn btn-primary d-flex align-items-center fw-semibold shadow-lg ${saved ? "btn-success" : ""}`}
              onClick={handleSave}
              style={{
                background: saved
                  ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                minWidth: "120px",
              }}
            >
              {saved ? (
                <>
                  <CheckCircle size={16} className="me-2" />
                  Saved!
                </>
              ) : (
                <>
                  <Save size={16} className="me-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Sidebar Tabs */}
        <div className="col-lg-3 mb-4 mb-lg-0">
          <div
            className="card border-0 shadow-sm sticky-top"
            style={{ top: "20px" }}
          >
            <div className="card-body p-3">
              <nav className="nav flex-column">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`nav-link d-flex align-items-center gap-3 py-3 px-3 text-start rounded-3 mb-2 ${activeTab === tab.id ? "active bg-primary text-white" : "text-dark"}`}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      border: "none",
                      background:
                        activeTab === tab.id
                          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                          : "transparent",
                    }}
                  >
                    {tab.icon}
                    <span className="fw-semibold">{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* System Status */}
              <div className="mt-5 pt-4 border-top">
                <h6 className="fw-semibold text-dark mb-3">System Status</h6>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted small">Last Backup</span>
                    <span className="fw-semibold small">2 hours ago</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted small">Storage Used</span>
                    <span className="fw-semibold small">65%</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted small">API Status</span>
                    <span className="badge bg-success bg-opacity-25 text-success small">
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-9">
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="card border-0 shadow-lg mb-4">
              <div className="card-header bg-transparent border-0 py-4">
                <h5 className="card-title mb-0 fw-bold text-dark">
                  <SettingsIcon size={20} className="me-2" />
                  General Settings
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">ISP Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter ISP name"
                      defaultValue="NetMaster Pro"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Timezone</label>
                    <select className="form-select">
                      <option>UTC-05:00 Eastern Time</option>
                      <option>UTC-08:00 Pacific Time</option>
                      <option>UTC+00:00 GMT</option>
                      <option>UTC+01:00 Central European</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Date Format
                    </label>
                    <select className="form-select">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Time Format
                    </label>
                    <select className="form-select">
                      <option>12-hour</option>
                      <option>24-hour</option>
                    </select>
                  </div>
                  <div className="col-md-12">
                    <label className="form-label fw-semibold">Logo URL</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="https://example.com/logo.png"
                    />
                    <div className="form-text">Recommended size: 200x60px</div>
                  </div>
                  <div className="col-md-12">
                    <label className="form-label fw-semibold">
                      Default Language
                    </label>
                    <select className="form-select">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="card border-0 shadow-lg mb-4">
              <div className="card-header bg-transparent border-0 py-4">
                <h5 className="card-title mb-0 fw-bold text-dark">
                  <Bell size={20} className="me-2" />
                  Notification Preferences
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-12 mb-4">
                    <h6 className="fw-semibold text-dark mb-3">
                      Notification Methods
                    </h6>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={notifications.emailAlerts}
                            onChange={() =>
                              handleNotificationChange("emailAlerts")
                            }
                          />
                          <label className="form-check-label fw-semibold">
                            <Mail size={16} className="me-2" />
                            Email Alerts
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={notifications.pushNotifications}
                            onChange={() =>
                              handleNotificationChange("pushNotifications")
                            }
                          />
                          <label className="form-check-label fw-semibold">
                            <BellRing size={16} className="me-2" />
                            Push Notifications
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={notifications.smsAlerts}
                            onChange={() =>
                              handleNotificationChange("smsAlerts")
                            }
                          />
                          <label className="form-check-label fw-semibold">
                            <Smartphone size={16} className="me-2" />
                            SMS Alerts
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <h6 className="fw-semibold text-dark mb-3">Alert Types</h6>
                    <div className="row g-3">
                      {[
                        {
                          key: "deviceOffline",
                          label: "Device Offline",
                          icon: <Server size={16} />,
                        },
                        {
                          key: "highCpu",
                          label: "High CPU Usage",
                          icon: <Activity size={16} />,
                        },
                        {
                          key: "bandwidthThreshold",
                          label: "Bandwidth Threshold",
                          icon: <Network size={16} />,
                        },
                        {
                          key: "maintenance",
                          label: "Maintenance Events",
                          icon: <Clock size={16} />,
                        },
                        {
                          key: "securityAlerts",
                          label: "Security Alerts",
                          icon: <Shield size={16} />,
                        },
                      ].map((alert) => (
                        <div className="col-md-6" key={alert.key}>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={notifications[alert.key]}
                              onChange={() =>
                                handleNotificationChange(alert.key)
                              }
                            />
                            <label className="form-check-label fw-semibold">
                              {alert.icon}
                              <span className="ms-2">{alert.label}</span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="card border-0 shadow-lg mb-4">
              <div className="card-header bg-transparent border-0 py-4">
                <h5 className="card-title mb-0 fw-bold text-dark">
                  <Shield size={20} className="me-2" />
                  Security Settings
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-12">
                    <div className="form-check form-switch mb-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={security.twoFactorAuth}
                        onChange={() =>
                          setSecurity({
                            ...security,
                            twoFactorAuth: !security.twoFactorAuth,
                          })
                        }
                      />
                      <label className="form-check-label fw-semibold">
                        <Lock size={16} className="me-2" />
                        Two-Factor Authentication
                      </label>
                      <div className="form-text">
                        Require 2FA for all admin accounts
                      </div>
                    </div>

                    <div className="mb-4">
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
                        onChange={(e) =>
                          setSecurity({
                            ...security,
                            sessionTimeout: e.target.value,
                          })
                        }
                      />
                      <div className="d-flex justify-content-between">
                        <span className="text-muted small">5 min</span>
                        <span className="fw-semibold">
                          {security.sessionTimeout} min
                        </span>
                        <span className="text-muted small">120 min</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        <Globe size={16} className="me-2" />
                        IP Whitelist
                      </label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Enter IP addresses or ranges (one per line)"
                        defaultValue={security.ipWhitelist.join("\n")}
                        onChange={(e) =>
                          setSecurity({
                            ...security,
                            ipWhitelist: e.target.value.split("\n"),
                          })
                        }
                      />
                      <div className="form-text">
                        Only allow access from these IP addresses
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        <Key size={16} className="me-2" />
                        Password Policy
                      </label>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={security.passwordChangeRequired}
                              onChange={() =>
                                setSecurity({
                                  ...security,
                                  passwordChangeRequired:
                                    !security.passwordChangeRequired,
                                })
                              }
                            />
                            <label className="form-check-label">
                              Require password change every 90 days
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultChecked
                            />
                            <label className="form-check-label">
                              Minimum 12 characters
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* System Settings */}
          {activeTab === "system" && (
            <div className="card border-0 shadow-lg mb-4">
              <div className="card-header bg-transparent border-0 py-4">
                <h5 className="card-title mb-0 fw-bold text-dark">
                  <Server size={20} className="me-2" />
                  System Configuration
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <Database size={16} className="me-2" />
                      Data Retention (days)
                    </label>
                    <select
                      className="form-select"
                      value={system.dataRetention}
                      onChange={(e) =>
                        setSystem({ ...system, dataRetention: e.target.value })
                      }
                    >
                      <option value={30}>30 days</option>
                      <option value={90}>90 days</option>
                      <option value={180}>180 days</option>
                      <option value={365}>1 year</option>
                      <option value={730}>2 years</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <RefreshCw size={16} className="me-2" />
                      Backup Frequency
                    </label>
                    <select
                      className="form-select"
                      value={system.backupFrequency}
                      onChange={(e) =>
                        setSystem({
                          ...system,
                          backupFrequency: e.target.value,
                        })
                      }
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <FileText size={16} className="me-2" />
                      Log Level
                    </label>
                    <select
                      className="form-select"
                      value={system.logLevel}
                      onChange={(e) =>
                        setSystem({ ...system, logLevel: e.target.value })
                      }
                    >
                      <option value="debug">Debug</option>
                      <option value="info">Info</option>
                      <option value="warn">Warning</option>
                      <option value="error">Error</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <Zap size={16} className="me-2" />
                      System Mode
                    </label>
                    <select
                      className="form-select"
                      value={
                        system.performanceMode ? "performance" : "balanced"
                      }
                      onChange={(e) =>
                        setSystem({
                          ...system,
                          performanceMode: e.target.value === "performance",
                        })
                      }
                    >
                      <option value="balanced">Balanced</option>
                      <option value="performance">Performance</option>
                      <option value="conservative">Conservative</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={system.autoBackup}
                        onChange={() =>
                          setSystem({
                            ...system,
                            autoBackup: !system.autoBackup,
                          })
                        }
                      />
                      <label className="form-check-label fw-semibold">
                        Enable Automatic Backups
                      </label>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={system.cacheEnabled}
                        onChange={() =>
                          setSystem({
                            ...system,
                            cacheEnabled: !system.cacheEnabled,
                          })
                        }
                      />
                      <label className="form-check-label fw-semibold">
                        Enable Caching
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API Settings */}
          {activeTab === "api" && (
            <div className="card border-0 shadow-lg mb-4">
              <div className="card-header bg-transparent border-0 py-4">
                <h5 className="card-title mb-0 fw-bold text-dark">
                  <Globe size={20} className="me-2" />
                  API Configuration
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-12">
                    <div className="form-check form-switch mb-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={api.enabled}
                        onChange={() =>
                          setApi({ ...api, enabled: !api.enabled })
                        }
                      />
                      <label className="form-check-label fw-semibold">
                        Enable API Access
                      </label>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        API Rate Limit (requests/hour)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={api.rateLimit}
                        onChange={(e) =>
                          setApi({ ...api, rateLimit: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">API Key</label>
                      <div className="input-group">
                        <input
                          type={showApiKey ? "text" : "password"}
                          className="form-control"
                          value={api.key}
                          readOnly
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          type="button"
                        >
                          Regenerate
                        </button>
                      </div>
                      <div className="form-text">
                        Keep this key secure. Don't share it publicly.
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Webhook Endpoints
                      </label>
                      <div className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="https://your-webhook-url.com"
                        />
                        <button className="btn btn-primary">Add</button>
                      </div>
                      <div className="list-group">
                        {api.webhooks.length === 0 && (
                          <div className="text-center py-3 text-muted">
                            No webhooks configured
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Billing Settings */}
          {activeTab === "billing" && (
            <div className="card border-0 shadow-lg mb-4">
              <div className="card-header bg-transparent border-0 py-4">
                <h5 className="card-title mb-0 fw-bold text-dark">
                  <CreditCard size={20} className="me-2" />
                  Billing & Invoicing
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Currency</label>
                    <select
                      className="form-select"
                      value={billing.currency}
                      onChange={(e) =>
                        setBilling({ ...billing, currency: e.target.value })
                      }
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="GHS">GHS (₵)</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={billing.taxRate}
                      onChange={(e) =>
                        setBilling({ ...billing, taxRate: e.target.value })
                      }
                      step="0.1"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Grace Period (days)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={billing.gracePeriod}
                      onChange={(e) =>
                        setBilling({ ...billing, gracePeriod: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Late Fee ($)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={billing.lateFee}
                      onChange={(e) =>
                        setBilling({ ...billing, lateFee: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Invoice Template
                    </label>
                    <select
                      className="form-select"
                      value={billing.invoiceTemplate}
                      onChange={(e) =>
                        setBilling({
                          ...billing,
                          invoiceTemplate: e.target.value,
                        })
                      }
                    >
                      <option value="modern">Modern</option>
                      <option value="classic">Classic</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={billing.autoInvoice}
                        onChange={() =>
                          setBilling({
                            ...billing,
                            autoInvoice: !billing.autoInvoice,
                          })
                        }
                      />
                      <label className="form-check-label fw-semibold">
                        Enable Auto-Invoicing
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Settings Tab */}
          {activeTab === "users" && (
            <div className="card border-0 shadow-lg mb-4">
              <div className="card-header bg-transparent border-0 py-4">
                <h5 className="card-title mb-0 fw-bold text-dark">
                  <Users size={20} className="me-2" />
                  User Management
                </h5>
              </div>
              <div className="card-body">
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="fw-semibold text-dark mb-0">
                        Team Members
                      </h6>
                      <button className="btn btn-primary btn-sm">
                        <User size={14} className="me-1" />
                        Invite User
                      </button>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>User</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Last Active</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              id: 1,
                              name: "John Doe",
                              email: "john@isp.com",
                              role: "Administrator",
                              status: "Active",
                              lastActive: "2 hours ago",
                              avatarColor: "bg-primary",
                            },
                            {
                              id: 2,
                              name: "Jane Smith",
                              email: "jane@isp.com",
                              role: "Network Engineer",
                              status: "Active",
                              lastActive: "1 day ago",
                              avatarColor: "bg-success",
                            },
                            {
                              id: 3,
                              name: "Bob Wilson",
                              email: "bob@isp.com",
                              role: "Support Agent",
                              status: "Active",
                              lastActive: "Just now",
                              avatarColor: "bg-warning",
                            },
                            {
                              id: 4,
                              name: "Alice Brown",
                              email: "alice@isp.com",
                              role: "Read Only",
                              status: "Inactive",
                              lastActive: "1 week ago",
                              avatarColor: "bg-info",
                            },
                            {
                              id: 5,
                              name: "Mike Davis",
                              email: "mike@isp.com",
                              role: "Billing Manager",
                              status: "Active",
                              lastActive: "3 hours ago",
                              avatarColor: "bg-purple",
                            },
                          ].map((user) => (
                            <tr key={user.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div
                                    className={`rounded-circle ${user.avatarColor} text-white d-flex align-items-center justify-content-center me-3`}
                                    style={{ width: "36px", height: "36px" }}
                                  >
                                    {user.name.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="fw-semibold">
                                      {user.name}
                                    </div>
                                    <div className="text-muted small">
                                      {user.email}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span className="badge bg-light text-dark">
                                  {user.role}
                                </span>
                              </td>
                              <td>
                                <span
                                  className={`badge ${user.status === "Active" ? "bg-success" : "bg-secondary"}`}
                                >
                                  {user.status}
                                </span>
                              </td>
                              <td className="text-muted">{user.lastActive}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <button className="btn btn-sm btn-outline-primary">
                                    Edit
                                  </button>
                                  <button className="btn btn-sm btn-outline-danger">
                                    Remove
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm mb-4">
                      <div className="card-body">
                        <h6 className="fw-semibold text-dark mb-3">
                          Role Permissions
                        </h6>
                        <div className="d-flex flex-column gap-2">
                          {[
                            {
                              role: "Administrator",
                              desc: "Full system access",
                              users: 1,
                            },
                            {
                              role: "Network Engineer",
                              desc: "Device and network management",
                              users: 3,
                            },
                            {
                              role: "Support Agent",
                              desc: "Customer support access",
                              users: 5,
                            },
                            {
                              role: "Billing Manager",
                              desc: "Financial and billing access",
                              users: 2,
                            },
                            {
                              role: "Read Only",
                              desc: "View-only access",
                              users: 2,
                            },
                          ].map((role, index) => (
                            <div
                              key={index}
                              className="d-flex justify-content-between align-items-center py-2 border-bottom"
                            >
                              <div>
                                <div className="fw-semibold">{role.role}</div>
                                <div className="text-muted small">
                                  {role.desc}
                                </div>
                              </div>
                              <span className="badge bg-light text-dark">
                                {role.users} users
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body">
                        <h6 className="fw-semibold text-dark mb-3">
                          Invite New User
                        </h6>
                        <div className="mb-3">
                          <label className="form-label">Email Address</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="user@example.com"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Role</label>
                          <select className="form-select">
                            <option>Network Engineer</option>
                            <option>Support Agent</option>
                            <option>Billing Manager</option>
                            <option>Read Only</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Permissions</label>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="perm1"
                              defaultChecked
                            />
                            <label className="form-check-label" htmlFor="perm1">
                              Device Management
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="perm2"
                            />
                            <label className="form-check-label" htmlFor="perm2">
                              Customer Management
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="perm3"
                            />
                            <label className="form-check-label" htmlFor="perm3">
                              Billing Access
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="perm4"
                              defaultChecked
                            />
                            <label className="form-check-label" htmlFor="perm4">
                              Reports Access
                            </label>
                          </div>
                        </div>
                        <button className="btn btn-primary w-100">
                          Send Invitation
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Help & Support Tab */}
          {activeTab === "help" && (
            <div className="card border-0 shadow-lg mb-4">
              <div className="card-header bg-transparent border-0 py-4">
                <h5 className="card-title mb-0 fw-bold text-dark">
                  <HelpCircle size={20} className="me-2" />
                  Help & Support
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-8">
                    <div className="mb-5">
                      <h5 className="fw-bold text-dark mb-4">
                        Getting Started Guides
                      </h5>
                      <div className="row g-3">
                        {[
                          {
                            title: "Device Setup Guide",
                            desc: "Learn how to add and configure network devices",
                            icon: <Server size={20} />,
                            link: "#",
                          },
                          {
                            title: "Network Monitoring",
                            desc: "Monitor bandwidth, uptime, and performance",
                            icon: <Activity size={20} />,
                            link: "#",
                          },
                          {
                            title: "Customer Management",
                            desc: "Manage customer accounts and billing",
                            icon: <Users size={20} />,
                            link: "#",
                          },
                          {
                            title: "API Integration",
                            desc: "Integrate with your existing systems",
                            icon: <Globe size={20} />,
                            link: "#",
                          },
                          {
                            title: "Reports & Analytics",
                            desc: "Generate insights from your data",
                            icon: <BarChart3 size={20} />,
                            link: "#",
                          },
                          {
                            title: "Troubleshooting",
                            desc: "Common issues and solutions",
                            icon: <AlertCircle size={20} />,
                            link: "#",
                          },
                        ].map((guide, index) => (
                          <div className="col-md-6" key={index}>
                            <div className="card border-0 shadow-sm h-100 hover-shadow">
                              <div className="card-body">
                                <div className="d-flex align-items-start mb-3">
                                  <div className="p-2 rounded-circle bg-primary bg-opacity-10 text-primary me-3">
                                    {guide.icon}
                                  </div>
                                  <div>
                                    <h6 className="fw-bold text-dark mb-1">
                                      {guide.title}
                                    </h6>
                                    <p className="text-muted small mb-2">
                                      {guide.desc}
                                    </p>
                                  </div>
                                </div>
                                <a
                                  href={guide.link}
                                  className="btn btn-sm btn-outline-primary"
                                >
                                  Read Guide →
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-5">
                      <h5 className="fw-bold text-dark mb-4">
                        Frequently Asked Questions
                      </h5>
                      <div className="accordion" id="faqAccordion">
                        {[
                          {
                            question: "How do I reset a device password?",
                            answer:
                              "Navigate to Devices → Select device → Click Edit → Security tab. You can reset passwords and SSH keys from there.",
                          },
                          {
                            question: "Can I export monitoring data?",
                            answer:
                              "Yes, go to Reports → select data range → Export button. Supports CSV, JSON, and PDF formats.",
                          },
                          {
                            question:
                              "How are bandwidth thresholds calculated?",
                            answer:
                              "Thresholds are based on 95th percentile billing. You can adjust calculation methods in Billing Settings.",
                          },
                          {
                            question:
                              "What's the maximum number of devices supported?",
                            answer:
                              "The system supports up to 10,000 devices. For larger deployments, contact us for enterprise solutions.",
                          },
                          {
                            question: "How do I set up automated backups?",
                            answer:
                              "Go to Settings → System → Backup Configuration. Enable automatic backups and set your preferred schedule.",
                          },
                        ].map((faq, index) => (
                          <div
                            className="accordion-item border-0 mb-2"
                            key={index}
                          >
                            <h2 className="accordion-header">
                              <button
                                className="accordion-button collapsed bg-light rounded-3"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#faq${index}`}
                              >
                                {faq.question}
                              </button>
                            </h2>
                            <div
                              id={`faq${index}`}
                              className="accordion-collapse collapse"
                              data-bs-parent="#faqAccordion"
                            >
                              <div className="accordion-body bg-white rounded-3">
                                {faq.answer}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="sticky-top" style={{ top: "20px" }}>
                      <div className="card border-0 shadow-sm mb-4">
                        <div className="card-body">
                          <h6 className="fw-bold text-dark mb-3">
                            Support Contact
                          </h6>
                          <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center">
                              <div className="p-2 rounded-circle bg-primary bg-opacity-10 text-primary me-3">
                                <Mail size={18} />
                              </div>
                              <div>
                                <div className="fw-semibold">Email Support</div>
                                <a
                                  href="mailto:support@ispmanager.com"
                                  className="text-primary"
                                >
                                  support@ispmanager.com
                                </a>
                                <div className="text-muted small">
                                  Response within 4 hours
                                </div>
                              </div>
                            </div>

                            <div className="d-flex align-items-center">
                              <div className="p-2 rounded-circle bg-success bg-opacity-10 text-success me-3">
                                <Smartphone size={18} />
                              </div>
                              <div>
                                <div className="fw-semibold">Phone Support</div>
                                <div className="text-dark">
                                  +1 (555) 123-4567
                                </div>
                                <div className="text-muted small">
                                  24/7 emergency line
                                </div>
                              </div>
                            </div>

                            <div className="d-flex align-items-center">
                              <div className="p-2 rounded-circle bg-warning bg-opacity-10 text-warning me-3">
                                <Clock size={18} />
                              </div>
                              <div>
                                <div className="fw-semibold">Support Hours</div>
                                <div className="text-dark">
                                  Mon-Fri: 9AM-6PM EST
                                </div>
                                <div className="text-muted small">
                                  Emergency: 24/7
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card border-0 shadow-sm mb-4">
                        <div className="card-body">
                          <h6 className="fw-bold text-dark mb-3">
                            System Information
                          </h6>
                          <div className="d-flex flex-column gap-2">
                            <div className="d-flex justify-content-between">
                              <span className="text-muted">Version</span>
                              <span className="fw-semibold">v3.2.1</span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span className="text-muted">License</span>
                              <span className="badge bg-success">
                                Enterprise
                              </span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span className="text-muted">Expires</span>
                              <span className="fw-semibold">Dec 31, 2024</span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span className="text-muted">Support Plan</span>
                              <span className="badge bg-primary">Premium</span>
                            </div>
                          </div>
                          <button className="btn btn-outline-primary w-100 mt-3">
                            Check for Updates
                          </button>
                        </div>
                      </div>

                      <div className="card border-0 shadow-sm">
                        <div className="card-body">
                          <h6 className="fw-bold text-dark mb-3">
                            Documentation
                          </h6>
                          <div className="d-flex flex-column gap-2">
                            <a
                              href="#"
                              className="d-flex align-items-center text-dark py-2 border-bottom"
                            >
                              <FileText size={16} className="me-2" />
                              <span>User Manual (PDF)</span>
                            </a>
                            <a
                              href="#"
                              className="d-flex align-items-center text-dark py-2 border-bottom"
                            >
                              <FileText size={16} className="me-2" />
                              <span>API Documentation</span>
                            </a>
                            <a
                              href="#"
                              className="d-flex align-items-center text-dark py-2 border-bottom"
                            >
                              <FileText size={16} className="me-2" />
                              <span>Deployment Guide</span>
                            </a>
                            <a
                              href="#"
                              className="d-flex align-items-center text-dark py-2"
                            >
                              <FileText size={16} className="me-2" />
                              <span>Troubleshooting Guide</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Danger Zone */}
          {(activeTab === "system" || activeTab === "security") && (
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
          )}
        </div>
      </div>
    </div>
  );
}
