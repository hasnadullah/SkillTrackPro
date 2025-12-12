// src/Components/Dashboard/InternDashboard.jsx
import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import api from "../../api/Axiosconfig.jsx";

const InternDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskData, setEditTaskData] = useState({ title: "", description: "", status: "" });

  // Fetch all tasks for the logged-in intern
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks/my");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create a new task
  const createTask = async () => {
    try {
      if (!newTask.title || !newTask.description) return alert("Please fill all fields");
      await api.post("/tasks/create", newTask);
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/delete/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Start editing a task
  const startEdit = (task) => {
    setEditTaskId(task._id);
    setEditTaskData({ title: task.title, description: task.description, status: task.status });
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditTaskId(null);
    setEditTaskData({ title: "", description: "", status: "" });
  };

  // Save edited task
  const saveEdit = async () => {
    try {
      const payload = {};
      if (editTaskData.title && editTaskData.title.trim() !== "") payload.title = editTaskData.title.trim();
      if (editTaskData.description && editTaskData.description.trim() !== "") payload.description = editTaskData.description.trim();
      if (editTaskData.status && editTaskData.status.trim() !== "") payload.status = editTaskData.status.trim();

      if (Object.keys(payload).length === 0) {
        return alert("Please provide at least one field to update");
      }

      await api.put(`/tasks/update/${editTaskId}`, payload);
      cancelEdit();
      fetchTasks();
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  return (
    <DashboardLayout>
      <h1>My Tasks</h1>

      {/* Create Task Form */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Create New Task</h3>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          style={{ marginRight: "10px", padding: "5px", width: "300px" }}
        />
        <button onClick={createTask}>Create</button>
      </div>

      {/* Tasks Table */}
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              {/* Title */}
              <td>
                {editTaskId === task._id ? (
                  <input
                    type="text"
                    value={editTaskData.title}
                    onChange={(e) => setEditTaskData({ ...editTaskData, title: e.target.value })}
                  />
                ) : (
                  task.title
                )}
              </td>

              {/* Description */}
              <td>
                {editTaskId === task._id ? (
                  <input
                    type="text"
                    value={editTaskData.description}
                    onChange={(e) => setEditTaskData({ ...editTaskData, description: e.target.value })}
                  />
                ) : (
                  task.description
                )}
              </td>

              {/* Status */}
              <td>
                {editTaskId === task._id ? (
                  <select
                    value={editTaskData.status || task.status}
                    onChange={(e) => setEditTaskData({ ...editTaskData, status: e.target.value })}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                ) : (
                  task.status
                )}
              </td>

              {/* Feedback */}
              <td>
                {task.feedback && task.feedback.length > 0 ? (
                  <ul style={{ paddingLeft: "15px" }}>
                    {task.feedback.map((fb, index) => (
                      <li key={index}>
                        {fb.comment || "No comment"} <em>({new Date(fb.date).toLocaleString()})</em>
                      </li>
                    ))}
                  </ul>
                ) : (
                  "No feedback yet"
                )}
              </td>

              {/* Actions */}
              <td>
                {editTaskId === task._id ? (
                  <>
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(task)}>Edit</button>
                    <button onClick={() => deleteTask(task._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default InternDashboard;
