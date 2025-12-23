"use client";
import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import "./register.css";
import "./bootstrap.min.css";

export default function Signup() {
  const { register } = useAuth();

  
  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
    password: "",
  });

  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      
      await register({ fullName, email, phoneNumber, password });
    } catch (err) {
      const message = err?.message || "Registration failed.";
      setError(message);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="Register">
        <form onSubmit={onSubmit}>
          <input 
            type="text" 
            placeholder="Full name" 
            className="input1" 
            id="full_name" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input 
            type="password" 
            placeholder="Password" 
            className="input1" 
            id="pass" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input 
            type="email" 
            placeholder="Email" 
            className="input1" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input 
            type="tel" 
            placeholder="Phone number"
            className="input1" 
            id="tel" 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          {error && (
            <div style={{ color: "#fff", marginTop: "10px" }}>{error}</div>
          )}

          <input 
            type="submit" 
            value={isSubmitting ? "Registering..." : "Register"}
            className="btn"
            id="btn" 
            disabled={isSubmitting}
          />

          <p style={{ marginTop: 12 }}>
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </>
  );
}
