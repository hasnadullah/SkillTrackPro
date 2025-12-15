import React from "react";
import "../styles/AboutUs.css";

const AboutUs = () => {
  return (
    <section className="about-section">
      {/* Top Heading */}
      <div className="about-header">
        <h1>ABOUT US</h1>
        <p>
          SkillTrackPro is a centralized platform designed to streamline and
          manage internship activities under the Pakistan Software Export Board (PSEB).
        </p>
      </div>

      {/* Image Cards */}
      <div className="about-cards">
        <div className="card">Team Work</div>
        <div className="card">Task Tracking</div>
        <div className="card">Mentor Support</div>
        <div className="card">Progress Reports</div>
        <div className="card">Communication</div>
      </div>

      {/* Content Section */}
      <div className="about-content">
        <div className="content-left">
          <h2>
            HOW SKILLTRACKPRO <br />
            <span>STARTED, ITS JOURNEY,</span> <br />
            AND MILESTONES.
          </h2>
        </div>

        <div className="content-right">
          <p>
            Founded with a vision to bring transparency and efficiency to
            internship management, SkillTrackPro acts as a centralized system
            for PSEB internships. It enables interns to track tasks and progress,
            while mentors and HR teams can monitor performance, communicate
            effectively, and ensure structured learning outcomes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
