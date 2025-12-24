"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../api/api";
import "../admin.css";;

export default function AssignRole() {
  const { id } = useParams();
  const [role, setRole] = useState("Patient");

  const handleAssign = async () => {
    try {
      // API: POST /api/roles/assign-role [10]
      await api.post("/roles/assign-role", { userId: parseInt(id), roleName: role });
      alert("Role assigned successfully");
    } catch (err) { alert("Action failed"); }
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
