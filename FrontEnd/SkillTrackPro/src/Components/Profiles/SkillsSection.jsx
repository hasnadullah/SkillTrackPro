import React from "react";
import "./SkillsSection.css";

const SkillsSection = () => {
  return (
    <section className="skills-section">
      <h2 className="skills-title">
        Skills<span>.</span>
      </h2>

      <div className="skills-grid">
        {/* Column 1 */}
        <div className="skills-column">
          <h3>HR Operations</h3>
          <ul>
            <li>Employee Lifecycle Management</li>
            <li>HR Policies & Procedures</li>
            <li>Payroll & Benefits Administration</li>
            <li>HR Documentation & Records</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="skills-column">
          <h3>Talent Acquisition</h3>
          <ul>
            <li>Recruitment & Hiring</li>
            <li>Interviewing & Screening</li>
            <li>Onboarding Processes</li>
            <li>Employer Branding</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="skills-column">
          <h3>People Management</h3>
          <ul>
            <li>Performance Management</li>
            <li>Employee Engagement</li>
            <li>Workforce Planning</li>
            <li>Conflict Resolution</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="skills-column">
          <h3>Soft Skills</h3>
          <ul>
            <li>Effective Communication</li>
            <li>Leadership & Decision Making</li>
            <li>Collaboration</li>
            <li>Ethical Judgment</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
