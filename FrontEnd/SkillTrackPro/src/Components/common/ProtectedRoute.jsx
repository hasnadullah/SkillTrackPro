import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Usage:
 * <ProtectedRoute role="hr"><HRDashboard /></ProtectedRoute>
 * or
 * <ProtectedRoute><SomeComponent /></ProtectedRoute>
 */
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Not logged in
  if (!token) return <Navigate to="/login" replace />;

  // If a specific role is required and user doesn't match
  if (role && userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
