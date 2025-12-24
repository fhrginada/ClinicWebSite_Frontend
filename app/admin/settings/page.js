"use client";
import { useState, useEffect } from "react";
import api from "../../../api/api";
import "../admin.css"; 

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    platformName: "",
    timeZoneId: "Egypt Standard Time",
    defaultConsultationDurationMinutes: 30
  });

  useEffect(() => {
    
    api.get("/settings").then(res => setSettings(res.data));
  }, []);

  const handleUpdate = async () => {
    try {
      
      await api.put("/settings", settings);
      alert("Settings updated successfully");
    } catch (err) { alert("Error updating settings"); }
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