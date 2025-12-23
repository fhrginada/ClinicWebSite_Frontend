"use client";
import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import "./Login.css";
import api from "@/src/api/api"; 

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      
      await login({ email, password });

      
      const res = await api.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("role", res.data.role);

      const userRole = res.data.role;

      if (userRole === "Doctor") {
        window.location.href = "/doctor-dashboard";
      } else if (userRole === "Nurse") {
        window.location.href = "/nurse-dashboard";
      } else if (userRole === "Patient") {
        window.location.href = "/patient-dashboard";
      } else if (userRole === "Admin") {
        window.location.href = "/admin-dashboard";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      const message = err?.message || "Email or password is incorrect";
      setError(message);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="welcome">
        <h1 id="title">Welcome To Health Clinic</h1>
      </div>

      <div className="form_container">
        <form onSubmit={onSubmit}>
          <div className="user_div">
            <label htmlFor="user_field" style={{ color: "white" }}>
              Email
            </label>
            <input
              id="user_field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="pass_div">
            <label htmlFor="pass_field" style={{ color: "white" }}>
              Password
            </label>
            <input
              id="pass_field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="submit_btn" style={{ backgroundColor: "aqua" }}>
            <input
              type="submit"
              id="submit"
              value={isSubmitting ? "Signing in..." : "Submit"}
              disabled={isSubmitting}
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <p>
            Haven't an account?{" "}
            <a href="/signup" style={{ color: "white" }}>
              Register now
            </a>
          </p>
        </form>
      </div>

      <div className="fakebody"></div>
    </>
  );
}
