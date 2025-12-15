// src/components/Common/Footer.jsx
import React from "react";
import "../styles/Footer.css";
import projectLogo from '../../assets/logo.png'
const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-card">
        {/* Top Section */}
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <h2 className="footer-logo"> <img src={projectLogo} alt="Khuchbe" />SkillTrackPro</h2>
            <p className="footer-desc">
              SkillTrackPro helps manage interns, mentors, tasks, and
              meetings in one powerful platform.
            </p>

            <div className="footer-socials">
              <a href="#">X</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
              <a href="#">GitHub</a>
            </div>
          </div>

          {/* Links */}
          <div className="footer-links">
            <div>
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Integrations</a>
              <a href="#">Changelog</a>
            </div>

            <div>
              <h4>Resources</h4>
              <a href="#">Documentation</a>
              <a href="#">Tutorials</a>
              <a href="#">Support</a>
            </div>

            <div>
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <span>© 2025 SkillTrackPro. All rights reserved.</span>
          <div>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
