import { useState } from "react";
import {
  Settings as SettingsIcon,
  Save,
  Bell,
  Shield,
  Globe,
  Users,
  CheckCircle,
  Server,
  CreditCard,
  HelpCircle,
} from "lucide-react";
import GeneralSettings from "../../components/settings/GeneralSettings";
import NotificationsSettings from "../../components/settings/NotificationsSettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import SystemSettings from "../../components/settings/SystemSettings";
import ApiSettings from "../../components/settings/ApiSettings";
import BillingSettings from "../../components/settings/BillingSettings";
import UsersSettings from "../../components/settings/UsersSettings";
import HelpSettings from "../../components/settings/HelpSettings";
import DangerZoneSettings from "../../components/settings/DangerZoneSettings";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  
  const [saved, setSaved] = useState(false);

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
          {activeTab === "general" && <GeneralSettings />}
          {/* Notification Settings */}
          {activeTab === "notifications" && <NotificationsSettings />}
          {/* Security Settings */}
          {activeTab === "security" && <SecuritySettings />}
          {/* System Settings */}
          {activeTab === "system" && <SystemSettings />}
          {/* API Settings */}
          {activeTab === "api" && <ApiSettings />}
          {/* Billing Settings */}
          {activeTab === "billing" && <BillingSettings />}
          {/* Users Settings Tab */}
          {activeTab === "users" && <UsersSettings />}
          {/* Help & Support Tab */}
          {activeTab === "help" && <HelpSettings />}
          {/* Danger Zone */}
          {(activeTab === "system" || activeTab === "security") && (
            <DangerZoneSettings />
          )}
        </div>
      </div>
    </div>
  );
}
