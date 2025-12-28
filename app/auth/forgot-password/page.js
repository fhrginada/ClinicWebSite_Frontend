"use client";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    // Mock implementation - frontend only
    alert("Password reset token sent to your email (demo mode). In a real app, this would send an email.");
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