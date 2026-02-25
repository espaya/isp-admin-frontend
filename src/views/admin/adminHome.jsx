import { useState } from "react";
import { Calendar } from "lucide-react";

import LatestUsers from "../../components/dashboard/LatestUsers";
import RevenueOverview from "../../components/dashboard/RevenueOverview";
import TopCards from "../../components/dashboard/TopCards";
import Performance from "../../components/dashboard/Performance";
import SystemStatus from "../../components/dashboard/SystemStatus";


export default function AdminHome() {
  return (
    <div
      className="container-fluid px-4 py-4"
      style={{ background: "#f8fafc" }}
    >
      {/* HEADER */}
      <div
        className="p-4 rounded-4 mb-5 text-white shadow"
        style={{
          background: "linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="fw-bold mb-1">Dashboard Overview</h1>
            <p className="opacity-75 mb-0 text-white">
              Welcome back — here’s a snapshot of your business.
            </p>
          </div>
          <button className="btn btn-light fw-semibold">
            <Calendar size={16} className="me-2" />
            This Week
          </button>
        </div>
      </div>

      {/* TOP KPI CARDS */}
      <TopCards />

      {/* CHART + METRICS */}
      <div className="row g-4 mb-5">
        <RevenueOverview />
        <Performance />
      </div>

      {/* USERS + SYSTEM STATUS */}
      <div className="row g-4">
        <LatestUsers />
        <SystemStatus />
      </div>
    </div>
  );
}
