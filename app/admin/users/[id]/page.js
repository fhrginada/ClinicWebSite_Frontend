"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import "../admin.css";

export default function AssignRole() {
  const { id } = useParams();
  const [role, setRole] = useState("Patient");

  const handleAssign = async () => {
    // Mock implementation - frontend only
    alert(`Role "${role}" assigned to user ${id} (demo mode)`);
  };

  return (
    <div className="admin_container">
      <div className="form_box">
        <h2 className="title">Modify User Role (ID: {id})</h2>
        <select className="admin_select" onChange={(e) => setRole(e.target.value)}>
          <option value="Patient">Patient</option>
          <option value="Doctor">Doctor</option>
          <option value="Nurse">Nurse</option>
          <option value="Admin">Admin</option>
        </select>
        <button className="admin_btn" onClick={handleAssign}>Confirm Assignment</button>
      </div>
    </div>
  );
}
