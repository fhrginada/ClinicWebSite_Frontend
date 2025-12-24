"use client";

import "./register.css";
import { useState } from "react";
import api from "../../api/api";

export default function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      await api.post("/users/register", form);
      alert("Account created successfully");
      window.location.href = "/login";
    } catch (err) {
      alert("Register failed");
      console.error(err);
    }
  };

  return (
    <>
      <div className="fakebody"></div>
      <div className="Register">
        <h2>Sign Up</h2>
        <input
          className="input1"
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />

        <input
          className="input1"
          placeholder="Gender"
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        />

        <input
          className="input1"
          placeholder="Phone Number"
          onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
        />

        <input
          className="input1"
          placeholder="Address"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          className="input1"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="input1"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button id="btn" onClick={handleRegister}>
          Sign Up
        </button>

        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </>
  );
}
