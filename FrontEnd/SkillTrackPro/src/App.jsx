// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "./Components/auth/AuthPage.jsx";
import "./styles.css";

// Dashboards
import InternDashboard from "./Components/Dashboard/InternDashboard.jsx";
import MentorDashboard from "./Components/Dashboard/MentorDashboard.jsx";
import HRDashboard from "./Components/Dashboard/HRDashboard.jsx";
import PSEBDashboard from "./Components/Dashboard/PSEBDashboard.jsx";

// Role-based router
import DashboardRouter from "./Components/DashboardRoutes.jsx";

// ProtectedRoute
import ProtectedRoute from "./Components/common/ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth Pages */}
        <Route path="/login" element={<AuthPage type="login" />} />
        <Route path="/signup" element={<AuthPage type="signup" />} />

        {/* Generic dashboard route */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardRouter />
            </ProtectedRoute>
          }
        />

        {/* Explicit dashboards for direct access (optional) */}
        <Route
          path="/dashboard/intern"
          element={
            <ProtectedRoute role="intern">
              <InternDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/mentor"
          element={
            <ProtectedRoute role="mentor">
              <MentorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/hr"
          element={
            <ProtectedRoute role="hr">
              <HRDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/pseb"
          element={
            <ProtectedRoute role="pseb">
              <PSEBDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
