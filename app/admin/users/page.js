"use client";
import { useState, useEffect } from "react";
import api from "../../../api/api";

import "../admin.css";;

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // API: GET /api/users [5]
    api.get("/users").then(res => setUsers(res.data));
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