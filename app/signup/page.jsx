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
    }
  };

  return (
    <>
      <div className="form_container">
        <input
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />

        <input
          placeholder="Gender"
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        />

        <input
          placeholder="Phone Number"
          onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
        />

        <input
          placeholder="Address"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={handleRegister}>Sign Up</button>

        <p>
          Already have an account?{" "}
          <a href="/login">Login</a>
        </p>
      </div>


    </>
  );
}


