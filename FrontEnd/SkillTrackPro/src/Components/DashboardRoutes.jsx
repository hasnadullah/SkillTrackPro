import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import InternDashboard from "./Dashboard/InternDashboard.jsx";
import MentorDashboard from "./Dashboard/MentorDashboard.jsx";
import HRDashboard from "./Dashboard/HRDashboard.jsx";
import PSEBDashboard from "./Dashboard/PSEBDashboard.jsx";

const DashboardRoutes = () => {
  // Get role from localStorage
  const role = localStorage.getItem("role");

  if (!role) return <Navigate to="/login" replace />;

  return (
    <Routes>
      {role === "intern" && <Route path="/" element={<InternDashboard />} />}
      {role === "mentor" && <Route path="/" element={<MentorDashboard />} />}
      {role === "hr" && <Route path="/" element={<HRDashboard />} />}
      {role === "pseb" && <Route path="/" element={<PSEBDashboard />} />}
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default DashboardRoutes;
