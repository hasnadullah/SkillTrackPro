import React from "react";
import "../styles/TeamMember.css";

const TeamMember = ({ image, name, role }) => {
  return (
    <div className="team-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{role}</p>
      
    </div>
  );
};

export default TeamMember;
