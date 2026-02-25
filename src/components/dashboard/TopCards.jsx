import { useState, useEffect } from "react";
import {
  Users,
  Package,
  CreditCard,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";

export default function TopCards() {
  const apiBase = import.meta.env.VITE_API_URL;

  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    fetchTopCards();
  }, []);

  const fetchTopCards = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${apiBase}/api/top-cards`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setStats(data);
    } catch (err) {
      console.error("Top cards fetch error:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  if (loadingStats) {
    return <div className="text-center py-5">Loading dashboard...</div>;
  }

  const topCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers?.toLocaleString(),
      gradient: "linear-gradient(135deg,#06b6d4,#3b82f6)",
      icon: <Users size={26} />,
    },
    {
      title: "Active Packages",
      value: stats?.activePackages?.toLocaleString(),
      gradient: "linear-gradient(135deg,#10b981,#22c55e)",
      icon: <Package size={26} />,
    },
    {
      title: "Total Payments",
      value: stats?.totalPayments?.toLocaleString(),
      gradient: "linear-gradient(135deg,#f59e0b,#f97316)",
      icon: <CreditCard size={26} />,
    },
    {
      title: "Total Revenue",
      value: `₵${stats?.totalRevenue?.toLocaleString(undefined, {
        minimumFractionDigits: 2,
      })}`,
      gradient: "linear-gradient(135deg,#8b5cf6,#ec4899)",
      icon: <DollarSign size={26} />,
    },
  ];

  return (
    <div className="row g-4 mb-5">
      {topCards.map((card, i) => (
        <div key={i} className="col-lg-3 col-md-6">
          <div
            className="card border-0 shadow-lg text-white h-100"
            style={{ background: card.gradient }}
          >
            <div className="card-body p-4">
              <div className="d-flex justify-content-between mb-4">
                <div className="p-3 rounded-circle bg-white bg-opacity-25">
                  {card.icon}
                </div>
              </div>
              <small className="text-uppercase opacity-75">{card.title}</small>
              {card.title === "Total Revenue" ? (
                <h5 className="fw-bold mt-2">{card.value}</h5>
              ) : (
                <h2 className="fw-bold mt-2">{card.value}</h2>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
