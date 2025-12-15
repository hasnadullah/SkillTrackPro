import React from "react";
import TeamMember from "../Cards/TeamMemberCard.jsx";
import "../styles/TeamMember.css";

import TeamMemberPic from "../../assets/TeamMember.jpg";

const Team = () => {
  return (
    <section className="team-section">
      <h2 className="team-title">Our Team</h2>
      <p className="team-subtitle">
        Meet the people behind SkillTrackPro who manage and support the PSEB internship program.
      </p>

      <div className="team-grid">
        <TeamMember
          image={TeamMemberPic}
          name="Hasnad Ullah"
          role="Full Stack AI Developer"
        />

        <TeamMember
          image={TeamMemberPic}
          name="Mentor Name"
          role="Technical Mentor"
        />

        <TeamMember
          image={TeamMemberPic}
          name="HR Representative"
          role="PSEB HR Manager"
        />
      </div>
    </section>
  );
};

export default Team;
