"use client";
import { useState, useEffect } from "react";
import "../admin.css";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Mock data - frontend only
    const mockUsers = [
      { id: 1, fullName: "John Doe", email: "john@example.com", role: "Patient" },
      { id: 2, fullName: "Dr. Jane Smith", email: "jane@example.com", role: "Doctor" },
      { id: 3, fullName: "Nurse Mary", email: "mary@example.com", role: "Nurse" },
      { id: 4, fullName: "Admin User", email: "admin@example.com", role: "Admin" },
    ];
    setUsers(mockUsers);
  }, []);

  return (
    <div className="admin_container">
      <h2 className="title">User Management</h2>
      <table className="admin_table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Current Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td className="role_badge">{user.role}</td>
              <td>
                <a href={`/admin/users/${user.id}`} className="edit_link">Manage Role</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}