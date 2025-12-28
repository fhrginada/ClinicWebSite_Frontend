"use client";
// Fixed: Remove unused useEffect import
import { useState } from "react";
import "../admin.css";

export default function UsersList() {
  // Fixed: Use lazy initialization to avoid setState in effect
  const [users] = useState(() => {
    // Mock data - frontend only
    return [
      { id: 1, fullName: "John Doe", email: "john@example.com", role: "Patient" },
      { id: 2, fullName: "Dr. Jane Smith", email: "jane@example.com", role: "Doctor" },
      { id: 3, fullName: "Nurse Mary", email: "mary@example.com", role: "Nurse" },
      { id: 4, fullName: "Admin User", email: "admin@example.com", role: "Admin" },
    ];
  });

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