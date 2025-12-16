// src/Components/dashboards/PSEBDashboard.jsx
import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import api from "../../api/Axiosconfig.jsx";
import "../styles/PSEBDashboard.css";

const PSEBDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [assignTaskData, setAssignTaskData] = useState({ task_id: "", mentor_id: "" });
  const [scheduleMeetingData, setScheduleMeetingData] = useState({
    User_id: "",
    date: "",
    time: "",
    Note: "",
  });

  // --- Fetch functions ---
  const fetchUsers = async () => {
    try {
      const res = await api.get("/pseb/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await api.get("/pseb/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

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

  // --- Action functions ---
  const assignTask = async () => {
    if (!assignTaskData.task_id || !assignTaskData.mentor_id) return;
    try {
      await api.post("/pseb/assign-task", assignTaskData);
      alert("Task assigned successfully");
      setAssignTaskData({ task_id: "", mentor_id: "" });
      fetchTasks();
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  const scheduleMeeting = async () => {
    const { User_id, date, time, Note } = scheduleMeetingData;
    if (!User_id || !date || !time) return;
    try {
      await api.post("/pseb/schedule-meeting", scheduleMeetingData);
      alert("Meeting scheduled successfully");
      setScheduleMeetingData({ User_id: "", date: "", time: "", Note: "" });
      fetchMeetings();
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  // --- Sections ---
  const DashboardHome = () => <h2>Welcome to PSEB Dashboard</h2>;

  const UsersSection = () => (
    <section className="pseb-section">
      <h2>Users</h2>
      <table className="pseb-table">
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
  );

  const TasksSection = () => (
    <section className="pseb-section">
      <h2>Tasks</h2>
      <table className="pseb-table-1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Intern</th>
            <th>Mentor</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.intern_id}</td>
              <td>{task.mentor_id || "N/A"}</td>
              <td>
                {Array.isArray(task.feedback) && task.feedback.length > 0 ? (
                  <ul>
                    {task.feedback.map((fb, idx) => (
                      <li key={idx}>
                        {typeof fb.comment === "object"
                          ? JSON.stringify(fb.comment)
                          : fb.comment}{" "}
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

      <div className="pseb-form">
        <h3>Assign Task to Mentor</h3>
        <select
          value={assignTaskData.task_id}
          onChange={(e) =>
            setAssignTaskData({ ...assignTaskData, task_id: e.target.value })
          }
        >
          <option value="">Select Task</option>
          {tasks.map((task) => (
            <option key={task._id} value={task._id}>
              {task.title}
            </option>
          ))}
        </select>
        <select
          value={assignTaskData.mentor_id}
          onChange={(e) =>
            setAssignTaskData({ ...assignTaskData, mentor_id: e.target.value })
          }
        >
          <option value="">Select Mentor</option>
          {users
            .filter((u) => u.role === "mentor")
            .map((mentor) => (
              <option key={mentor._id} value={mentor._id}>
                {mentor.name}
              </option>
            ))}
        </select>
        <button onClick={assignTask}>Assign Task</button>
      </div>
    </section>
  );

  const MeetingsSection = () => (
    <section className="pseb-section">
      <h2>Meetings</h2>
      <table className="pseb-table">
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
              <td>{meeting.User_id || meeting.task_id || "N/A"}</td>
              <td>{meeting.date || meeting.meeting_date || "N/A"}</td>
              <td>{meeting.time || meeting.meeting_time || "N/A"}</td>
              <td>{meeting.Note || meeting.note || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pseb-form">
        <h3>Schedule Meeting</h3>
        <select
          value={scheduleMeetingData.User_id}
          onChange={(e) =>
            setScheduleMeetingData({ ...scheduleMeetingData, User_id: e.target.value })
          }
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={scheduleMeetingData.date}
          onChange={(e) =>
            setScheduleMeetingData({ ...scheduleMeetingData, date: e.target.value })
          }
        />
        <input
          type="time"
          value={scheduleMeetingData.time}
          onChange={(e) =>
            setScheduleMeetingData({ ...scheduleMeetingData, time: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Note"
          value={scheduleMeetingData.Note}
          onChange={(e) =>
            setScheduleMeetingData({ ...scheduleMeetingData, Note: e.target.value })
          }
        />
        <button onClick={scheduleMeeting}>Schedule</button>
      </div>
    </section>
  );

  return (
    <DashboardLayout role="PSEB" setActiveSection={setActiveSection}>
      {activeSection === "dashboard" && <DashboardHome />}
      {activeSection === "users" && <UsersSection />}
      {activeSection === "tasks" && <TasksSection />}
      {activeSection === "meetings" && <MeetingsSection />}
    </DashboardLayout>
  );
};

export default PSEBDashboard;
