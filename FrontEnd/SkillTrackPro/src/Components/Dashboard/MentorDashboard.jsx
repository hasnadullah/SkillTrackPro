import React from "react";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import Users from "../Pages/Users.jsx";

const MentorDashboard = () => {
  return (
    <DashboardLayout role="mentor">
      <Users title="My Interns" />
    </DashboardLayout>
  );
};

export default MentorDashboard;
