"use client";
// Fixed: Remove unused useEffect import
import { useState } from "react";
import "./profile.css";

export default function Profile() {
  // Fixed: Use lazy initialization to avoid setState in effect
  const [profile, setProfile] = useState(() => {
    // Mock data - load from localStorage if available
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem("userProfile");
      if (savedProfile) {
        try {
          return JSON.parse(savedProfile);
        } catch {
          // Use default values
        }
      }
    }
    return { fullName: "", gender: "", address: "" };
  });

  const handleSave = async () => {
    // Mock implementation - save to localStorage
    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("Profile updated (demo mode)");
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
