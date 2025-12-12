import React from "react";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import Users from "../Pages/Users.jsx";

const PSEBDashboard = () => {
  return (
    <DashboardLayout role="pseb">
      <Users title="HR List" />
    </DashboardLayout>
  );
};

export default PSEBDashboard;
