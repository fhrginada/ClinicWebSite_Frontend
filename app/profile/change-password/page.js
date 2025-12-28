"use client";
import { useState } from "react";
import "../profile.css"; 
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const router = useRouter();
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

    if (!formData.CurrentPassword || !formData.NewPassword) {
      setError("Please fill in all fields.");
      return;
    }

    // Mock implementation - frontend only
    alert("Password changed successfully! (demo mode)");
    router.push("/profile");
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