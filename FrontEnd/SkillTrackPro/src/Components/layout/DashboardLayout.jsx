import React from "react";
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import Sidebar from "../common/Sidebar.jsx";
import AboutUs from "../common/AboutUs.jsx";
import TeamMember from "../common/TeamMember.jsx";
import "../../styles.css"
const DashboardLayout = ({ role, children }) => {
  return (
    <div className="LayoutD">
      

      <div style={{ flex: 1 }}>
        <Header />

        <div style={{ padding: "20px"}}>
          {children}
        </div>
        

        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
