"use client";
import Link from "next/link";
import "./admin.css"; 

export default function AdminDashboard() {
  return (
    <div className="admin_container">
      <div className="welcome">
        <h1 id="title">Admin Control Center</h1>
      </div>

      <div className="dashboard_grid">
       
        <div className="admin_card">
          <h3>User Management</h3>
          <p>Manage platform users, view profiles, and assign administrative roles.</p>
          <Link href="/admin/users" className="admin_link_btn">
            View Users List
          </Link>
        </div>

      
        <div className="admin_card">
          <h3>System Configuration</h3>
          <p>Update platform name, timezone, and consultation duration settings.</p>
          <Link href="/admin/settings" className="admin_link_btn">
            Edit Settings
          </Link>
        </div>
      </div>

      
      <div className="fakebody"></div>
    </div>
  );
}