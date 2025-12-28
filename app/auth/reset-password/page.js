"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [form, setForm] = useState({ email: "", token: "", newPassword: "" });
  const router = useRouter();

  const handleReset = async () => {
    if (!form.email || !form.token || !form.newPassword) {
      alert("Please fill in all fields");
      return;
    }

    // Mock implementation - frontend only
    alert("Password successfully reset (demo mode).");
    router.push("/login");
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
