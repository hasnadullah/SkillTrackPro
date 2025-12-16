// src/Components/dashboards/MentorDashboard.jsx
import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import api from "../../api/Axiosconfig.jsx";
import "../styles/MentorDashboard.css";
import FeedbackCard from "../Cards/FeedbackCard.jsx";

const MentorDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const [tasks, setTasks] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFeedbackCard, setShowFeedbackCard] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/mentor/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  const fetchMeetings = async () => {
    try {
      const res = await api.get("/meetings/");
      setMeetings(res.data);
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchMeetings();
  }, []);

  const openFeedbackModal = (taskId) => {
    setSelectedTaskId(taskId);
    setIsModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setSelectedTaskId(null);
    setIsModalOpen(false);
    setFeedbackText("");
  };

  const submitFeedback = async () => {
    if (!selectedTaskId || !feedbackText.trim()) return;

    try {
      await api.post(`/mentor/tasks/${selectedTaskId}/feedback`, {
        mentor_id: "auto",
        comment: feedbackText,
      });

      setShowFeedbackCard(true);
      fetchTasks();

      // close modal after small delay
      setTimeout(() => closeFeedbackModal(), 300);
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  const DashboardHome = () => <h2>Welcome to Mentor Dashboard</h2>;

  const TasksSection = () => (
    <section className="mentor-section">
      <h2>Tasks</h2>
      <table className="mentor-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Add Feedback</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>
                {task.feedback?.length > 0 ? (
                  <ul>
                    {task.feedback.map((fb, idx) => (
                      <li key={idx}>
                        {typeof fb.comment === "object"
                          ? JSON.stringify(fb.comment)
                          : fb.comment}
                        {fb.date && (
                          <em> ({new Date(fb.date).toLocaleString()})</em>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  "No feedback yet"
                )}
              </td>
              <td>
                <button
                  className="feedback-btn"
                  onClick={() => openFeedbackModal(task._id)}
                >
                  Add Feedback
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );

  const MeetingsSection = () => (
    <section className="mentor-section">
      <h2>Meetings</h2>
      <table className="mentor-table">
        <thead>
          <tr>
            <th>Meeting ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting._id}>
              <td>{meeting._id}</td>
              <td>{meeting.meeting_date || meeting.date || "N/A"}</td>
              <td>{meeting.meeting_time || meeting.time || "N/A"}</td>
              <td>{meeting.note || meeting.Notes || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );

  return (
    <DashboardLayout role="MENTOR" setActiveSection={setActiveSection}>
      {activeSection === "dashboard" && <DashboardHome />}
      {activeSection === "tasks" && <TasksSection />}
      {activeSection === "meetings" && <MeetingsSection />}
      {activeSection === "feedback" && <TasksSection />}

      {/* Feedback Modal: move outside sections so it stays mounted */}
      {isModalOpen && (
        <div className="feedback-modal">
          <div className="modal-content">
            <h3>Add Feedback</h3>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Write feedback..."
              autoFocus
              style={{ direction: "ltr", textAlign: "left" }}
            />
            <div className="modal-actions">
              <button onClick={submitFeedback} className="submit-btn">
                Submit
              </button>
              <button onClick={closeFeedbackModal} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback success card */}
      {showFeedbackCard && (
        <FeedbackCard
          message="Feedback added successfully!"
          onClose={() => setShowFeedbackCard(false)}
        />
      )}
    </DashboardLayout>
  );
};

export default MentorDashboard;
