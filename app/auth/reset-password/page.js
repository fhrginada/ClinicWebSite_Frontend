"use client";
import { useState } from "react";
import api from "../../../api/api";

export default function ResetPassword() {
  const [form, setForm] = useState({ email: "", token: "", newPassword: "" });

  const handleReset = async () => {         
    try {
      // API: POST /api/users/reset-password [3]
      await api.post("/users/reset-password", form);
      alert("Password successfully reset.");
      window.location.href = "/login";
    } catch (err) {
      alert("Reset failed. Check your data.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Reset Password</h2>
      <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} />
      <input placeholder="Token" onChange={(e) => setForm({...form, token: e.target.value})} />
      <input type="password" placeholder="New Password" onChange={(e) => setForm({...form, newPassword: e.target.value})} />
      <button onClick={handleReset}>Update Password</button>
    </div>
  );
}
