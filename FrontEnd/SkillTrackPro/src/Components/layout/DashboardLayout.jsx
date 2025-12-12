import React from "react";
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import Sidebar from "../common/Sidebar.jsx";

const DashboardLayout = ({ role, children }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar role={role} />

      <div style={{ flex: 1 }}>
        <Header />

        <div style={{ padding: "20px" }}>
          {children}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
