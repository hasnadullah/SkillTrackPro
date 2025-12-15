import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import api from "../../api/Axiosconfig.jsx";
import "../styles/InternDashboard.css";   // 👈 external CSS

const InternDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskData, setEditTaskData] = useState({
    title: "",
    description: "",
    status: "",
  });

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

  const createTask = async () => {
    if (!newTask.title || !newTask.description) {
      return alert("Please fill all fields");
    }
    try {
      await api.post("/tasks/create", newTask);
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/delete/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (task) => {
    setEditTaskId(task._id);
    setEditTaskData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setEditTaskData({ title: "", description: "", status: "" });
  };

  const saveEdit = async () => {
    try {
      const payload = {};
      if (editTaskData.title.trim()) payload.title = editTaskData.title.trim();
      if (editTaskData.description.trim())
        payload.description = editTaskData.description.trim();
      if (editTaskData.status.trim())
        payload.status = editTaskData.status.trim();

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
      <h1 className="page-title">My Tasks</h1>

      {/* Create Task */}
      <div className="task-form">
        <h3 className="form-title">Create New Task</h3>

        <input
          type="text"
          className="input"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) =>
            setNewTask({ ...newTask, title: e.target.value })
          }
        />

        <input
          type="text"
          className="input input-wide"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />

        <button className="btn btn-primary" onClick={createTask}>
          Create
        </button>
      </div>

      {/* Task Table */}
      <table className="task-table">
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
              <td>
                {editTaskId === task._id ? (
                  <input
                    className="input"
                    value={editTaskData.title}
                    onChange={(e) =>
                      setEditTaskData({
                        ...editTaskData,
                        title: e.target.value,
                      })
                    }
                  />
                ) : (
                  task.title
                )}
              </td>

              <td>
                {editTaskId === task._id ? (
                  <input
                    className="input"
                    value={editTaskData.description}
                    onChange={(e) =>
                      setEditTaskData({
                        ...editTaskData,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  task.description
                )}
              </td>

              <td>
                {editTaskId === task._id ? (
                  <select
                    className="select"
                    value={editTaskData.status || task.status}
                    onChange={(e) =>
                      setEditTaskData({
                        ...editTaskData,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                ) : (
                  <span className={`status ${task.status}`}>
                    {task.status}
                  </span>
                )}
              </td>

              <td>
                {task.feedback?.length ? (
                  <ul className="feedback-list">
                    {task.feedback.map((fb, i) => (
                      <li key={i}>
                        {fb.comment || "No comment"}
                        <em> ({new Date(fb.date).toLocaleString()})</em>
                      </li>
                    ))}
                  </ul>
                ) : (
                  "No feedback yet"
                )}
              </td>

              <td>
                {editTaskId === task._id ? (
                  <>
                    <button className="btn btn-save" onClick={saveEdit}>
                      Save
                    </button>
                    <button className="btn btn-cancel" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-edit"
                      onClick={() => startEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>
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
