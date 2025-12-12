// src/components/Common/Header.jsx
import React from 'react';
import projectLogo from '../../assets/logo.png'

const Header = () => {
  return (
    <header id="main-header">
      <div className="logo-container">
        {}
       <img src={projectLogo} alt="SkillTrackPro Logo" className="logo" />
        <span className="project-name">SkillTrackPro</span>
      </div>
      {}
    </header>
  );
};

export default Header;