"use client";

import "./register.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!form.email || !form.password || !form.fullName) {
      setError("Please fill in all required fields");
      return;
    }

    // MOCK MODE - No backend API call
    // Just simulate registration and redirect to login
    console.log("📝 MOCK: Registration attempt:", form.email);
    
    // In mock mode, just redirect to login
    // User can then login with one of the mock passwords
    alert("Account created successfully (Mock Mode). Please login with: doctor123, nurse123, or patient123");
    router.push("/login");
  };

  return (
    <>
      <div className="fakebody"></div>
      <div className="Register">
        <h2>Sign Up</h2>
        <form onSubmit={handleRegister}>
          <input
            className="input1"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
          />

          <input
            className="input1"
            placeholder="Gender"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          />

          <input
            className="input1"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          />

          <input
            className="input1"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <input
            className="input1"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            className="input1"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

          <button type="submit" id="btn">
            Sign Up
          </button>

          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </>
  );
}
