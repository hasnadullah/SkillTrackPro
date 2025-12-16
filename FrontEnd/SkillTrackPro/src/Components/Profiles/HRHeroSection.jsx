import React from "react";
import "./HRHeroSection.css";
import imge from "../../assets/TeamMember.jpg"
import ExperienceSection from "./ExperienceSection";    
import SkillsSection from "./SkillsSection";
const HRHeroSection = () => {
  return (
    <section className= "Main">
    <section className="hr-hero">
      {/* LEFT CONTENT */}
      <div className="hr-hero-content">
        <p className="hr-greeting">Hello, I’m 👋</p>

        <h1 className="hr-title">
          <span>Human Resource</span>
          <br />
          Management
        </h1>

        <p className="hr-description">
          I manage recruitment, employee engagement, and organizational growth
          to help companies build strong and successful teams.
        </p>

        <div className="hr-buttons">
          <button className="btn-primary">Get in Touch</button>
          <button className="btn-secondary">View Employees</button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hr-hero-image">
        <div className="image-ring">
          <img
            src={imge}
            alt="HR Manager"
          />
          
        </div>
      </div>
      
    </section>
    <ExperienceSection/>
   <SkillsSection/> 
    </section>
  );
};

export default HRHeroSection;
