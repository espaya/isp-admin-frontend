import { useState } from "react";
import {
  Bell,
  Shield,
  Mail,
  Clock,
  Server,
  Network,
  BellRing,
  Smartphone,
  Activity,
  Users,
  CreditCard,
  AlertTriangle,
  Wifi,
} from "lucide-react";

export default function NotificationsSettings() {
  const [notifications, setNotifications] = useState({
    // Channels
    emailAlerts: true,
    pushNotifications: true,
    smsAlerts: false,
    whatsappAlerts: false,
    inAppAlerts: true,

    // Network Alerts
    deviceOffline: true,
    deviceOnline: true,
    highCpu: true,
    highMemory: true,
    bandwidthThreshold: true,
    interfaceDown: true,
    packetLoss: false,

    // Account Alerts
    newUser: true,
    paymentSuccess: true,
    paymentFailed: true,
    subscriptionExpiring: true,
    subscriptionExpired: true,
    newLogin: true,

    // Security
    suspiciousActivity: true,
    firewallTriggered: true,
    routerLoginAttempt: true,
    configChanges: true,
  });

  const handleChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderSwitch = (key, label, icon) => (
    <div className="col-md-6 mb-2">
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          checked={notifications[key]}
          onChange={() => handleChange(key)}
        />
        <label className="form-check-label fw-semibold">
          {icon}
          <span className="ms-2">{label}</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="card border-0 shadow-lg mb-4">
      <div className="card-header bg-transparent border-0 py-4">
        <h5 className="card-title mb-0 fw-bold text-dark">
          <Bell size={20} className="me-2" />
          ISP Notification Settings
        </h5>
      </div>

      <div className="card-body">
        {/* CHANNELS */}
        <h6 className="fw-bold mb-3">Notification Channels</h6>
        <div className="row">
          {renderSwitch("emailAlerts", "Email Alerts", <Mail size={16} />)}
          {renderSwitch(
            "pushNotifications",
            "Push Notifications",
            <BellRing size={16} />,
          )}
          {renderSwitch("smsAlerts", "SMS Alerts", <Smartphone size={16} />)}
          {renderSwitch(
            "whatsappAlerts",
            "WhatsApp Alerts",
            <Smartphone size={16} />,
          )}
          {renderSwitch(
            "inAppAlerts",
            "In-App Notifications",
            <Bell size={16} />,
          )}
        </div>

        <hr className="my-4" />

        {/* NETWORK */}
        <h6 className="fw-bold mb-3">Network & Device Alerts</h6>
        <div className="row">
          {renderSwitch(
            "deviceOffline",
            "Device Offline",
            <Server size={16} />,
          )}
          {renderSwitch(
            "deviceOnline",
            "Device Online Recovery",
            <Wifi size={16} />,
          )}
          {renderSwitch("highCpu", "High CPU Usage", <Activity size={16} />)}
          {renderSwitch(
            "highMemory",
            "High Memory Usage",
            <Activity size={16} />,
          )}
          {renderSwitch(
            "bandwidthThreshold",
            "Bandwidth Threshold",
            <Network size={16} />,
          )}
          {renderSwitch(
            "interfaceDown",
            "Interface Down",
            <Network size={16} />,
          )}
          {renderSwitch(
            "packetLoss",
            "Packet Loss Detection",
            <AlertTriangle size={16} />,
          )}
        </div>

        <hr className="my-4" />

        {/* ACCOUNT */}
        <h6 className="fw-bold mb-3">User & Payment Alerts</h6>
        <div className="row">
          {renderSwitch(
            "newUser",
            "New User Registration",
            <Users size={16} />,
          )}
          {renderSwitch(
            "paymentSuccess",
            "Payment Successful",
            <CreditCard size={16} />,
          )}
          {renderSwitch(
            "paymentFailed",
            "Payment Failed",
            <CreditCard size={16} />,
          )}
          {renderSwitch(
            "subscriptionExpiring",
            "Subscription Expiring",
            <Clock size={16} />,
          )}
          {renderSwitch(
            "subscriptionExpired",
            "Subscription Expired",
            <Clock size={16} />,
          )}
          {renderSwitch(
            "newLogin",
            "Login From New Device",
            <Shield size={16} />,
          )}
        </div>

        <hr className="my-4" />

        {/* SECURITY */}
        <h6 className="fw-bold mb-3">Security Alerts</h6>
        <div className="row">
          {renderSwitch(
            "suspiciousActivity",
            "Suspicious Activity",
            <Shield size={16} />,
          )}
          {renderSwitch(
            "firewallTriggered",
            "Firewall Triggered",
            <Shield size={16} />,
          )}
          {renderSwitch(
            "routerLoginAttempt",
            "Router Login Attempt",
            <Shield size={16} />,
          )}
          {renderSwitch(
            "configChanges",
            "Configuration Changes",
            <Shield size={16} />,
          )}
        </div>

        <div className="text-end mt-4">
          <button className="btn btn-primary px-4">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
