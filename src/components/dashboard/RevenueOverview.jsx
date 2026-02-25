import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueOverview() {
  const apiBase = import.meta.env.VITE_API_URL;
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${apiBase}/api/revenue-overview`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setRevenueData(data);
    } catch (error) {
      console.error("Revenue fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-8">
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3">Revenue Overview</h5>

          {loading ? (
            <div className="text-center py-5">Loading revenue...</div>
          ) : (
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis
                    tickFormatter={(value) => `₵${value.toLocaleString()}`}
                  />
                  <Tooltip
                    formatter={(value) =>
                      `₵ ${Number(value).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}`
                    }
                  />
                  <Line
                    dataKey="revenue"
                    stroke="url(#rev)"
                    strokeWidth={4}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
