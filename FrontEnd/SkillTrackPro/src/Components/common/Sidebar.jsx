// src/Components/common/Sidebar.jsx
import React, { useState } from "react";
import "../styles/Sidebar.css";

// Icons
const HomeIcon = () => <span className="icon-symbol">🏠</span>;
const UserIcon = () => <span className="icon-symbol">👤</span>;
const TaskIcon = () => <span className="icon-symbol">✅</span>;
const MeetingIcon = () => <span className="icon-symbol">🗓️</span>;
const FeedbackIcon = () => <span className="icon-symbol">💬</span>;
const AssignIcon = () => <span className="icon-symbol">➡️</span>;
const ChevronDown = () => <span className="icon-symbol">⌄</span>;
const AppLogo = () => <span className="icon-symbol">◉</span>;

// Helper Components
const SubMenuItem = ({ label, active, onClick }) => (
  <li className={`submenu-item ${active ? "submenu-item--active" : ""}`} onClick={onClick}>
    {label}
  </li>
);

const SidebarItem = ({ icon: Icon, label, active, onClick, isCollapsible, isExpanded }) => (
  <li className={`sidebar-item ${active ? "sidebar-item--active" : ""}`} onClick={onClick}>
    <span className="sidebar-icon"><Icon /></span>
    <span className="sidebar-label">{label}</span>
    {isCollapsible && <span className={`sidebar-chevron ${isExpanded ? "rotated" : ""}`}><ChevronDown /></span>}
  </li>
);

// Menu config (section-based)
const menuConfig = {
  INTERN: [
    { label: "Dashboard", icon: HomeIcon, section: "dashboard" }
  ],
  HR: [
    {label: "Profile", icon: HomeIcon, section: "Profile"},
    { label: "Users", icon: UserIcon, section: "users" },
    { label: "Tasks", icon: TaskIcon, section: "tasks" },
    { label: "Meetings", icon: MeetingIcon, section: "meetings" },
  ],
  MENTOR: [
    { label: "Dashboard", icon: HomeIcon, section: "dashboard" },
    { label: "View Tasks", icon: TaskIcon, section: "tasks" },
    { label: "View Meetings", icon: MeetingIcon, section: "meetings" },
    { label: "Give Feedback", icon: FeedbackIcon, section: "feedback" },
  ],
  PSEB: [
    { label: "Dashboard", icon: HomeIcon, section: "dashboard" },
    { label: "View Users", icon: UserIcon, section: "users" },
    {
      label: "Task Management",
      icon: AssignIcon,
      isCollapsible: true,
      children: [
        { label: "View Tasks", section: "tasks" },
        { label: "Assign Task", section: "tasks" },
      ],
    },
    { label: "Meetings", icon: MeetingIcon, section: "meetings" },
  ],
};


const Sidebar = ({ role = "INTERN", activeSection, setActiveSection }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const roleKey = role.toUpperCase();
  const menuItems = menuConfig[roleKey] || menuConfig.INTERN;

  const renderMenuItems = (items) =>
    items.map((item, index) => {
      
      if (item.children) {
        const isExpanded = expandedMenu === item.label || item.children.some(c => c.section === activeSection);

        return (
          <React.Fragment key={index}>
            <SidebarItem
              icon={item.icon}
              label={item.label}
              isCollapsible
              isExpanded={isExpanded}
              onClick={() => setExpandedMenu(expandedMenu === item.label ? null : item.label)}
              active={item.children.some(c => c.section === activeSection)}
            />
            {isExpanded && (
              <ul className="submenu-container">
                {item.children.map((child, idx) => (
                  <SubMenuItem
                    key={idx}
                    label={child.label}
                    active={child.section === activeSection}
                    onClick={() => setActiveSection?.(child.section)}
                  />
                ))}
              </ul>
            )}
          </React.Fragment>
        );
      }

      // Regular sidebar items
      return (
        <SidebarItem
          key={index}
          icon={item.icon}
          label={item.label}
          active={item.section === activeSection}
          onClick={() => setActiveSection?.(item.section)}
        />
      );
    });

  return (
    <div className="sidebar-container">
      
      <ul className="sidebar-menu">{renderMenuItems(menuItems)}</ul>
    </div>
  );
};

export default Sidebar;
