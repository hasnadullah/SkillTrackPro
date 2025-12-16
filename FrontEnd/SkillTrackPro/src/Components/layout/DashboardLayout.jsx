// layouts/DashboardLayout.jsx (UPDATED)

import React from "react";
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import Sidebar from "../common/Sidebar.jsx";
import { useLocation } from "react-router-dom";
import "../../styles.css";

const DashboardLayout = ({ role, children, setActiveSection }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const userRole = role || "INTERN";

  return (
    <div className="LayoutD">
      <Header />

      <div className="dashboard-body">
        <Sidebar
          role={userRole}
          currentPath={currentPath}
          setActiveSection={setActiveSection} // ✅ IMPORTANT
        />

        <main className="dashboard-content">{children}</main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
