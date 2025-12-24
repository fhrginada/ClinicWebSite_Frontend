"use client";
import { useState } from "react";
import api from "../../../api/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      // API: POST /api/users/forgot-password [2]
      const res = await api.post("/users/forgot-password", email, {
        headers: { "Content-Type": "application/json" }
      });
      alert(res.data.message || "Request processed, check your console for the token.");
    } catch (err) {
      alert("Error sending request");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Forgot Password</h2>
      <input 
        type="email" 
        placeholder="Enter your email" 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button onClick={handleSubmit}>Send Reset Token</button>
    </div>
  );
}