// src/Components/dashboards/HRDashboard.jsx
import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import api from "../../api/Axiosconfig.jsx";
import "../styles/HRDashboard.css";

const HRDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [meetings, setMeetings] = useState([]);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/hr/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get("/hr/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  // Fetch meetings
  const fetchMeetings = async () => {
    try {
      const res = await api.get("/meetings/");
      setMeetings(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTasks();
    fetchMeetings();
  }, []);

  // Helper: Convert intern_id → Intern Name
  const getInternName = (internId) => {
    const intern = users.find((u) => u._id === internId);
    return intern ? intern.name : "Unknown";
  };

  return (
    <DashboardLayout role="hr">
      <h1>HR Dashboard</h1>

      {/* Users Section */}
      <section className="hr-section">
        <h2>Users</h2>
        <table className="hr-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Tasks Section */}
      <section className="hr-section">
        <h2>Tasks</h2>
        <table className="hr-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Intern</th>
              <th>Status</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>

                {/* Intern Name Instead of ID */}
                <td>{getInternName(task.intern_id)}</td>

                <td>{task.status}</td>

                {/* Safe Feedback Rendering */}
                <td>
                  {Array.isArray(task.feedback) && task.feedback.length > 0 ? (
                    <ul>
                      {task.feedback.map((fb, idx) => (
                        <li key={idx}>
                          {String(fb.comment || "No comment")}{" "}
                          {fb.date && (
                            <em>({new Date(fb.date).toLocaleString()})</em>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No feedback yet"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Meetings Section */}
      <section className="hr-section">
        <h2>Meetings</h2>
        <table className="hr-table">
          <thead>
            <tr>
              <th>Meeting ID</th>
              <th>User / Task</th>
              <th>Date</th>
              <th>Time</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting._id}>
                <td>{meeting._id}</td>

                {/* User or Task */}
                <td>
                  {String(meeting.user_id || meeting.task_id || "N/A")}
                </td>

                {/* Date */}
                <td>
                  {meeting.meeting_date || meeting.date || "N/A"}
                </td>

                {/* Time */}
                <td>
                  {meeting.meeting_time || meeting.time || "N/A"}
                </td>

                {/* Note */}
                <td>
                  {String(meeting.note || meeting.Notes || "N/A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </DashboardLayout>
  );
};

export default HRDashboard;
