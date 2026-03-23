import { useState } from "react";
import {
  Globe,
  Eye,
  EyeOff,
  Shield,
  Key,
  RefreshCw,
  Activity,
  Server,
  AlertTriangle,
} from "lucide-react";

export default function ApiSettings() {
  const [showApiKey, setShowApiKey] = useState(false);

  const [api, setApi] = useState({
    enabled: true,
    version: "v1",
    rateLimit: 100,
    perIpLimit: 50,
    key: "sk_live_************************",
    keyExpiryDays: 365,
    ipWhitelist: [],
    loggingEnabled: true,
    routerProvisioning: true,
    bandwidthResetApi: true,
    paymentWebhookSecret: "whsec_***************",
    webhooks: [],
  });

  const update = (key, value) => {
    setApi((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="card border-0 shadow-lg mb-4">
      <div className="card-header py-4 bg-transparent border-0">
        <h5 className="fw-bold">
          <Globe size={20} className="me-2" />
          ISP API Configuration
        </h5>
      </div>

      <div className="card-body">
        {/* API ACCESS */}
        <h6 className="fw-bold mb-3">API Access</h6>

        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={api.enabled}
            onChange={() => update("enabled", !api.enabled)}
          />
          <label className="form-check-label fw-semibold">
            Enable Public API Access
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">API Version</label>
          <select
            className="form-select"
            value={api.version}
            onChange={(e) => update("version", e.target.value)}
          >
            <option value="v1">v1</option>
            <option value="v2">v2</option>
          </select>
        </div>

        <hr />

        {/* RATE LIMITING */}
        <h6 className="fw-bold mb-3">Rate Limiting & Protection</h6>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            Global Rate Limit (requests/hour)
          </label>
          <input
            type="number"
            className="form-control"
            value={api.rateLimit}
            onChange={(e) => update("rateLimit", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Per-IP Rate Limit</label>
          <input
            type="number"
            className="form-control"
            value={api.perIpLimit}
            onChange={(e) => update("perIpLimit", e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">
            <Shield size={16} className="me-2" />
            IP Whitelist (One per line)
          </label>
          <textarea
            className="form-control"
            rows="3"
            value={api.ipWhitelist.join("\n")}
            onChange={(e) => update("ipWhitelist", e.target.value.split("\n"))}
          />
        </div>

        <hr />

        {/* API KEY */}
        <h6 className="fw-bold mb-3">API Key Management</h6>

        <div className="mb-3">
          <label className="form-label fw-semibold">Primary API Key</label>
          <div className="input-group">
            <input
              type={showApiKey ? "text" : "password"}
              className="form-control"
              value={api.key}
              readOnly
            />
            <button
              className="btn btn-outline-secondary"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            <button className="btn btn-outline-primary">
              <RefreshCw size={16} className="me-1" />
              Regenerate
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">
            API Key Expiry (days)
          </label>
          <input
            type="number"
            className="form-control"
            value={api.keyExpiryDays}
            onChange={(e) => update("keyExpiryDays", e.target.value)}
          />
        </div>

        <hr />

        {/* ROUTER & NETWORK API */}
        <h6 className="fw-bold mb-3">Router & Network APIs</h6>

        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={api.routerProvisioning}
            onChange={() =>
              update("routerProvisioning", !api.routerProvisioning)
            }
          />
          <label className="form-check-label fw-semibold">
            <Server size={16} className="me-2" />
            Enable Router Provisioning API
          </label>
        </div>

        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            checked={api.bandwidthResetApi}
            onChange={() => update("bandwidthResetApi", !api.bandwidthResetApi)}
          />
          <label className="form-check-label fw-semibold">
            Enable Bandwidth Reset API
          </label>
        </div>

        <hr />

        {/* WEBHOOKS */}
        <h6 className="fw-bold mb-3">Webhooks & Integrations</h6>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            Payment Webhook Secret
          </label>
          <input
            type="password"
            className="form-control"
            value={api.paymentWebhookSecret}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Webhook Endpoints</label>
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="https://example.com/webhook"
            />
            <button className="btn btn-primary">Add</button>
          </div>

          {api.webhooks.length === 0 && (
            <div className="text-muted text-center py-2">
              No webhooks configured
            </div>
          )}
        </div>

        <hr />

        {/* MONITORING */}
        <h6 className="fw-bold mb-3">Monitoring & Logs</h6>

        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={api.loggingEnabled}
            onChange={() => update("loggingEnabled", !api.loggingEnabled)}
          />
          <label className="form-check-label fw-semibold">
            <Activity size={16} className="me-2" />
            Enable API Request Logging
          </label>
        </div>

        <div className="text-end mt-4">
          <button className="btn btn-primary px-4">Save API Settings</button>
        </div>
      </div>
    </div>
  );
}
