import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Performance() {
  const [loading, setLoading] = useState(false);
  const [performance, setPerformance] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const getPerformance = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/device-performance`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        return;
      }

      setPerformance(data);
    } catch (err) {
      Swal.fire({ title: "Error", icon: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPerformance();
  }, []);

  const performanceMetrics = performance
    ? [
        {
          label: "Connected Users",
          value: performance.connectedUsers,
          change: "Live",
        },
        {
          label: "Avg CPU Load",
          value: performance.avgCpuLoad + "%",
          change: "Live",
        },
        {
          label: "Traffic (RX)",
          value: performance.totalTrafficRxMB + " MB",
          change: "Live",
        },
      ]
    : [];

  return (
    <>
      <div className="col-lg-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-4">Performance</h5>
            {performanceMetrics.map((m, i) => (
              <div
                key={i}
                className="p-3 rounded-4 text-white mb-3"
                style={{
                  background:
                    i === 0
                      ? "linear-gradient(135deg,#22c55e,#16a34a)"
                      : i === 1
                        ? "linear-gradient(135deg,#3b82f6,#6366f1)"
                        : "linear-gradient(135deg,#f59e0b,#f97316)",
                }}
              >
                <small className="opacity-75">{m.label}</small>
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="fw-bold mb-0">{m.value}</h4>
                  <span>{m.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
