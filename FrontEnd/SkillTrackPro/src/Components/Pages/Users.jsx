import React from "react";

const Users = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>

      <input
        type="text"
        placeholder="Search user..."
        style={{ width: "300px", padding: "10px", margin: "20px 0" }}
      />

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Test User</td>
            <td>Intern</td>
            <td>test@mail.com</td>
            <td>...</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Users;
