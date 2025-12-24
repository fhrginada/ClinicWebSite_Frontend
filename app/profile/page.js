"use client";
import { useState, useEffect } from "react";
import api from "../../api/api";
import "./profile.css";

export default function Profile() {
  const [profile, setProfile] = useState({ fullName: "", gender: "", address: "" });

  useEffect(() => {
    // API: GET /api/users/profile [11]
    api.get("/users/profile").then(res => setProfile(res.data));
  }, []);

  const handleSave = async () => {
    await api.put("/users/profile", profile); // API: PUT /api/users/me [5]
    alert("Profile updated");
  };

  return (
    <div className="profile_page">
      <div className="profile_card">
        <h2>My Information</h2>
        <input value={profile.fullName} onChange={(e) => setProfile({...profile, fullName: e.target.value})} placeholder="Full Name" />
        <input value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} placeholder="Address" />
        <button onClick={handleSave}>Update Profile</button>
        <a href="/profile/change-password">Change Security Password</a>
      </div>
    </div>
  );
}
