import React from "react";
import "../styles/ConfirmDeleteCard.css";

const ConfirmDeleteCard = ({ show, onDelete, onCancel }) => {
  if (!show) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-card">
        <h3>Delete Task</h3>
        <p>Are you sure you want to delete this task?</p>

        <div className="confirm-actions">
          <button className="btn btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-delete" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteCard;
