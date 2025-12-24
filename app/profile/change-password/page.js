"use client";
import { useState } from "react";
import api from "../../../api/api";
import "../profile.css"; 

export default function ChangePassword() {
  
  const [formData, setFormData] = useState({
    CurrentPassword: "",
    NewPassword: "",
    confirmPassword: "" 
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

   
    if (formData.NewPassword !== formData.confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    try {
      await api.put("/users/change-password", {
        CurrentPassword: formData.CurrentPassword,
        NewPassword: formData.NewPassword
      });

      alert("Password changed successfully!");
      window.location.href = "/profile"; 
    } catch (err) {
      
      setError(err.response?.data?.message || "Failed to change password. Please check your current password.");
    }
  };

  return (
    <>
      <div className="form_container">
        <h2 style={{ color: "white", marginBottom: "20px" }}>Secure Password Update</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="user_div">
            <label style={{ color: "white" }}>Current Password</label>
            <input
              type="password"
              required
              onChange={(e) => setFormData({ ...formData, CurrentPassword: e.target.value })}
            />
          </div>

          <div className="pass_div">
            <label style={{ color: "white" }}>New Password</label>
            <input
              type="password"
              required
              onChange={(e) => setFormData({ ...formData, NewPassword: e.target.value })}
            />
          </div>

          <div className="pass_div">
            <label style={{ color: "white" }}>Confirm New Password</label>
            <input
              type="password"
              required
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

          <div className="submit_btn">
            <input
              type="submit"
              id="submit"
              value="Update"
              style={{ cursor: "pointer" }}
            />
          </div>
        </form>
      </div>

      
      <div className="fakebody"></div>
    </>
  );
}