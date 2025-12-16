import React, { useEffect } from "react";

const FeedbackCard = ({ message = "Feedback submitted!", onClose }) => {
  // Auto-hide after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="feedback-card">
      <div className="card-content">
        <h4>{message}</h4>
      </div>

      {/* Internal CSS */}
      <style jsx>{`
        .feedback-card {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: #4caf50;
          color: white;
          padding: 15px 25px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          animation: slideIn 0.5s ease;
        }

        .card-content h4 {
          margin: 0;
          font-size: 16px;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default FeedbackCard;
