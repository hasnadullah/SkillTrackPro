// src/Components/dashboards/MentorDashboard.jsx
import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import api from "../../api/Axiosconfig.jsx";
import "../styles/MentorDashboard.css";

const MentorDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Fetch tasks assigned to this mentor
  const fetchTasks = async () => {
    try {
      const res = await api.get("/mentor/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  // Fetch meetings
  const fetchMeetings = async () => {
    try {
      const res = await api.get("/meetings/");
      setMeetings(res.data);
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  // Handle feedback submission
  const submitFeedback = async () => {
    if (!selectedTaskId || !feedbackText.trim()) return;

    try {
      await api.post(`/mentor/tasks/${selectedTaskId}/feedback`, {
        mentor_id: "auto", // backend replaces with token user_id
        comment: feedbackText,
      });

      alert("Feedback added!");
      setFeedbackText("");
      setSelectedTaskId(null);
      fetchTasks(); // refresh tasks
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchMeetings();
  }, []);

  return (
    <DashboardLayout role="mentor">
      <h1>Mentor Dashboard</h1>

      {/* Tasks Section */}
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

                {/* Feedback Display */}
                <td>
                  {Array.isArray(task.feedback) && task.feedback.length > 0 ? (
                    <ul>
                      {task.feedback.map((fb, idx) => (
                        <li key={idx}>
                          {/* Safely render comment */}
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

                {/* Add Feedback Button */}
                <td>
                  <button
                    className="feedback-btn"
                    onClick={() => setSelectedTaskId(task._id)}
                  >
                    Add Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Meetings Section */}
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

      {/* Feedback Modal */}
      {selectedTaskId && (
        <div className="feedback-modal">
          <div className="modal-content">
            <h3>Add Feedback</h3>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Write feedback..."
            ></textarea>
            <div className="modal-actions">
              <button onClick={submitFeedback} className="submit-btn">
                Submit
              </button>
              <button
                onClick={() => setSelectedTaskId(null)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default MentorDashboard;
