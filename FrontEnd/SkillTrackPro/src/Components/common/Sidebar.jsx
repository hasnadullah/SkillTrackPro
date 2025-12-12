// src/Components/layout/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("name"); // username from login

  if (!role) return null;

  const menu = {
    intern: [
      
    ],
    mentor: [
      
    ],
    hr: [
      
    ],
    pseb: [
      
    ],
  };

  return (
    <div className="sidebar">
      {/* User info */}
      <div className="sidebar-user">
        {username ? (
          <p>Welcome, <strong>{username}</strong></p>
        ) : null}
      </div>

      <h2 className="sidebar-title">{role.toUpperCase()} PANEL</h2>

      {menu[role]?.map((item, index) => (
        <div key={index} className="sidebar-item">
          <Link className="sidebar-link" to={item.path}>
            {item.label}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
