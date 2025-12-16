import React, { useState } from "react";
import "./ExperienceSection.css";

const experienceData = {
  Apple: {
    role: "HR Management Director @ Apple",
    duration: "May 2018 – Present",
    points: [
      "Led end-to-end talent acquisition strategies for multiple departments",
      "Designed and implemented employee engagement and retention programs",
      "Oversaw performance management, promotions, and leadership development initiatives",
      "Ensured HR policies complied with labor laws and corporate standards",
    ],
  },

  Microsoft: {
    role: "Senior Human Resource Recruiter @ Microsoft",
    duration: "Jan 2016 – Apr 2018",
    points: [
      "Managed large-scale recruitment campaigns for technical and non-technical roles",
      "Collaborated with hiring managers to define job requirements and hiring plans",
      "Conducted interviews, onboarding, and candidate evaluations",
      "Improved hiring efficiency and reduced time-to-hire",
    ],
  },

  Spotify: {
    role: "Human Resource Operations Specialist @ Spotify",
    duration: "Aug 2014 – Dec 2015",
    points: [
      "Handled workforce planning and employee allocation across teams",
      "Supported payroll, benefits administration, and HR documentation",
      "Maintained employee records and HR data accuracy",
      "Assisted in employee relations and conflict resolution",
    ],
  },
};

const ExperienceSection = () => {
  const [activeCompany, setActiveCompany] = useState("Apple");

  const current = experienceData[activeCompany];

  return (
    <section className="experience-section">
      <h2 className="experience-title">
        Experience<span>.</span>
      </h2>

      <div className="experience-container">
        {/* LEFT COMPANY LIST */}
        <div className="company-list">
          {Object.keys(experienceData).map((company) => (
            <button
              key={company}
              className={`company-btn ${
                activeCompany === company ? "active" : ""
              }`}
              onClick={() => setActiveCompany(company)}
            >
              {company}
            </button>
          ))}
        </div>

        {/* RIGHT DETAILS */}
        <div className="experience-details">
          <h3 className="role">{current.role}</h3>
          <p className="duration">{current.duration}</p>

          <ul className="points">
            {current.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
