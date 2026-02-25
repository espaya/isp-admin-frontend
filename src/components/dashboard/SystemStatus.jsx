import { useEffect, useState } from "react";

export default function SystemStatus() {
  const apiBase = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await fetch(`${apiBase}/api/system-status`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setStatus(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading system status...</div>;
  }

  return (
    <div className="col-lg-6">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-4">System Status</h5>

          <div
            className="p-4 rounded-4 text-white mb-3"
            style={{
              background: "linear-gradient(135deg,#0ea5e9,#6366f1)",
            }}
          >
            <h6>Server Uptime (Hours)</h6>
            <h2 className="fw-bold">{status?.serverUptimeHours} hrs</h2>
          </div>

          <div
            className="p-4 rounded-4 text-white"
            style={{
              background: "linear-gradient(135deg,#10b981,#22c55e)",
            }}
          >
            <h6>Active Sessions</h6>
            <h2 className="fw-bold">{status?.activeSessions}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
