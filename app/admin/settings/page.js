"use client";
// Fixed: Remove unused useEffect import
import { useState } from "react";
import "../admin.css"; 

export default function SystemSettings() {
  // Fixed: Use lazy initialization to avoid setState in effect
  const [settings, setSettings] = useState(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem("systemSettings");
      if (savedSettings) {
        try {
          return JSON.parse(savedSettings);
        } catch {
          // Use default values
        }
      }
    }
    return {
      platformName: "",
      timeZoneId: "Egypt Standard Time",
      defaultConsultationDurationMinutes: 30
    };
  });

  const handleUpdate = async () => {
    // Mock implementation - save to localStorage
    localStorage.setItem("systemSettings", JSON.stringify(settings));
    alert("Settings updated successfully (demo mode)");
  };

  return (
    <div className="admin_container">
      <div className="form_box">
        <h2 className="title">System Settings</h2>
        <div className="input_group">
          <label>Platform Name</label>
          <input value={settings.platformName} onChange={(e) => setSettings({...settings, platformName: e.target.value})} />
        </div>
        <div className="input_group">
          <label>Consultation Duration (Minutes)</label>
          <input type="number" value={settings.defaultConsultationDurationMinutes} 
                 onChange={(e) => setSettings({...settings, defaultConsultationDurationMinutes: parseInt(e.target.value)})} />
        </div>
        <button className="admin_btn" onClick={handleUpdate}>Save Configuration</button>
      </div>
    </div>
  );
}