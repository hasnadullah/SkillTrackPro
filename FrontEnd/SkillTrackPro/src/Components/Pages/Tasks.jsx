import React from "react";

const Tasks = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>

      <input
        type="text"
        placeholder="Search..."
        style={{ width: "300px", padding: "10px", margin: "20px 0" }}
      />

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Assigned By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Example Task</td>
            <td>Admin</td>
            <td>Pending</td>
            <td>...</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
