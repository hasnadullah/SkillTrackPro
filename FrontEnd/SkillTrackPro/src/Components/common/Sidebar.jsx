import React, { useState, useEffect } from "react";
import "../styles/Sidebar.css";

/* Icons */
const HomeIcon = () => <span>🏠</span>;
const UserIcon = () => <span>👤</span>;
const TaskIcon = () => <span>✅</span>;
const MeetingIcon = () => <span>🗓️</span>;
const FeedbackIcon = () => <span>💬</span>;
const AssignIcon = () => <span>➡️</span>;
const ChevronDown = () => <span>⌄</span>;

/* Components */
const SubMenuItem = ({ label, active, onClick }) => (
  <li
    className={`submenu-item ${active ? "submenu-item--active" : ""}`}
    onClick={onClick}
  >
    {label}
  </li>
);

const SidebarItem = ({
  icon: Icon,
  label,
  active,
  onClick,
  isCollapsible,
  isExpanded
}) => (
  <li
    className={`sidebar-item ${active ? "sidebar-item--active" : ""}`}
    onClick={onClick}
  >
    <span className="sidebar-icon">
      <Icon />
    </span>
    <span className="sidebar-label">{label}</span>
    {isCollapsible && (
      <span className={`sidebar-chevron ${isExpanded ? "rotated" : ""}`}>
        <ChevronDown />
      </span>
    )}
  </li>
);

/* Menu Config */
const menuConfig = {
  INTERN: [{ label: "Dashboard", icon: HomeIcon, section: "dashboard" }],
  HR: [
    { label: "Dashboard", icon: HomeIcon, section: "profile" },
    { label: "Users", icon: UserIcon, section: "users" },
    { label: "Tasks", icon: TaskIcon, section: "tasks" }
  ],
  MENTOR: [
    { label: "Dashboard", icon: HomeIcon, section: "dashboard" },
    { label: "View Tasks", icon: TaskIcon, section: "tasks" },
    { label: "Meetings", icon: MeetingIcon, section: "meetings" },
    { label: "Give Feedback", icon: FeedbackIcon, section: "feedback" }
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

/* MAIN */
const Sidebar = ({
  role = "INTERN",
  activeSection,
  setActiveSection
}) => {
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // hamburger state

  // Normalize role to uppercase
  const normalizedRole = role.toUpperCase();
  const menuItems = menuConfig[normalizedRole] || menuConfig.INTERN;

  // Auto-expand submenu if activeSection is inside children
  useEffect(() => {
    const parent = menuItems.find(item =>
      item.children?.some(child => child.section === activeSection)
    );
    if (parent) setExpandedMenu(parent.label);
  }, [activeSection, menuItems]);

  const handleClick = (section) => {
    setActiveSection(section);
    setIsOpen(false); // close sidebar on mobile
  };

  return (
    <>
      {/* Hamburger Button */}
      <button className="hamburger-btn" onClick={() => setIsOpen(true)}>☰</button>

      {/* Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <aside className={`sidebar-container ${isOpen ? "open" : ""}`}>
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => {
            if (item.children) {
              const isExpanded = expandedMenu === item.label;

              return (
                <React.Fragment key={index}>
                  <SidebarItem
                    icon={item.icon}
                    label={item.label}
                    isCollapsible
                    isExpanded={isExpanded}
                    active={false}
                    onClick={() =>
                      setExpandedMenu(isExpanded ? null : item.label)
                    }
                  />

                  {isExpanded && (
                    <ul className="submenu-container">
                      {item.children.map((child, i) => (
                        <SubMenuItem
                          key={i}
                          label={child.label}
                          active={child.section === activeSection}
                          onClick={() => handleClick(child.section)}
                        />
                      ))}
                    </ul>
                  )}
                </React.Fragment>
              );
            }

            return (
              <SidebarItem
                key={index}
                icon={item.icon}
                label={item.label}
                active={item.section === activeSection}
                onClick={() => handleClick(item.section)}
              />
            );
          })}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
