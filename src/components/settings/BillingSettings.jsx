import { useState } from "react";
import { CreditCard, Shield, RefreshCw, AlertTriangle } from "lucide-react";

export default function BillingSettings() {
  const [billing, setBilling] = useState({
    currency: "GHS",
    taxRate: 15,
    taxInclusive: false,

    billingCycle: "monthly",
    autoInvoice: true,
    proratedBilling: true,

    autoSuspend: true,
    autoReconnect: true,
    gracePeriod: 7,
    blockAfterDays: 14,

    lateFee: 20,
    reconnectionFee: 10,
    overagePerGB: 5,

    defaultGateway: "paystack",
    allowPartialPayment: false,
    minPaymentAmount: 1,

    carryUnusedData: false,
    resetDataOnBilling: true,
  });

  const update = (key, value) => {
    setBilling((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="card border-0 shadow-lg mb-4">
      <div className="card-header bg-transparent border-0 py-4">
        <h5 className="fw-bold">
          <CreditCard size={20} className="me-2" />
          ISP Billing & Revenue Settings
        </h5>
      </div>

      <div className="card-body">
        {/* CURRENCY & TAX */}
        <h6 className="fw-bold mb-3">Currency & Tax</h6>

        <div className="mb-3">
          <label className="form-label fw-semibold">Currency</label>
          <select
            className="form-select"
            value={billing.currency}
            onChange={(e) => update("currency", e.target.value)}
          >
            <option value="GHS">GHS (₵)</option>
            <option value="USD">USD ($)</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">VAT / Tax Rate (%)</label>
          <input
            type="number"
            className="form-control"
            value={billing.taxRate}
            onChange={(e) => update("taxRate", e.target.value)}
          />
        </div>

        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            checked={billing.taxInclusive}
            onChange={() => update("taxInclusive", !billing.taxInclusive)}
          />
          <label className="form-check-label fw-semibold">
            Prices Include VAT
          </label>
        </div>

        <hr />

        {/* BILLING CYCLE */}
        <h6 className="fw-bold mb-3">Subscription & Automation</h6>

        <div className="mb-3">
          <label className="form-label fw-semibold">Billing Cycle</label>
          <select
            className="form-select"
            value={billing.billingCycle}
            onChange={(e) => update("billingCycle", e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={billing.autoInvoice}
            onChange={() => update("autoInvoice", !billing.autoInvoice)}
          />
          <label className="form-check-label fw-semibold">
            Auto Generate Invoices
          </label>
        </div>

        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            checked={billing.proratedBilling}
            onChange={() => update("proratedBilling", !billing.proratedBilling)}
          />
          <label className="form-check-label fw-semibold">
            Enable Prorated Billing
          </label>
        </div>

        <hr />

        {/* SUSPENSION CONTROL */}
        <h6 className="fw-bold mb-3">Suspension & Access Control</h6>

        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={billing.autoSuspend}
            onChange={() => update("autoSuspend", !billing.autoSuspend)}
          />
          <label className="form-check-label fw-semibold">
            Auto Suspend On Non-Payment
          </label>
        </div>

        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={billing.autoReconnect}
            onChange={() => update("autoReconnect", !billing.autoReconnect)}
          />
          <label className="form-check-label fw-semibold">
            Auto Reconnect After Payment
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Grace Period (days)</label>
          <input
            type="number"
            className="form-control"
            value={billing.gracePeriod}
            onChange={(e) => update("gracePeriod", e.target.value)}
          />
        </div>

        <hr />

        {/* FEES */}
        <h6 className="fw-bold mb-3">Fees & Charges</h6>

        <div className="mb-3">
          <label className="form-label fw-semibold">Late Fee</label>
          <input
            type="number"
            className="form-control"
            value={billing.lateFee}
            onChange={(e) => update("lateFee", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Reconnection Fee</label>
          <input
            type="number"
            className="form-control"
            value={billing.reconnectionFee}
            onChange={(e) => update("reconnectionFee", e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">
            Overage Charge Per GB
          </label>
          <input
            type="number"
            className="form-control"
            value={billing.overagePerGB}
            onChange={(e) => update("overagePerGB", e.target.value)}
          />
        </div>

        <hr />

        {/* PAYMENT */}
        <h6 className="fw-bold mb-3">Payment Gateway</h6>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            Default Payment Gateway
          </label>
          <select
            className="form-select"
            value={billing.defaultGateway}
            onChange={(e) => update("defaultGateway", e.target.value)}
          >
            <option value="paystack">Paystack</option>
            <option value="stripe">Stripe</option>
            <option value="manual">Manual Payment</option>
          </select>
        </div>

        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            checked={billing.allowPartialPayment}
            onChange={() =>
              update("allowPartialPayment", !billing.allowPartialPayment)
            }
          />
          <label className="form-check-label fw-semibold">
            Allow Partial Payments
          </label>
        </div>

        <div className="text-end mt-4">
          <button className="btn btn-primary px-4">
            Save Billing Settings
          </button>
        </div>
      </div>
    </div>
  );
}
