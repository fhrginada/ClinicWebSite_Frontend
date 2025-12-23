"use client";

import "./Login.css";
import { useState } from "react";
import api from "../../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/users/login", {
        email: email,
        password: password,
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
      setError("Email or password is incorrect");
    }
};

  return (
    <>
      <div className="welcome">
        <h1 id="title">Welcome To Health Clinic</h1>
      </div>

      <div className="form_container">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="user_div">
            <label htmlFor="user_field" style={{ color: "white" }}>
              Email
            </label>
            <input
              id="user_field"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="pass_div">
            <label htmlFor="pass_field" style={{ color: "white" }}>
              Password
            </label>
            <input
              id="pass_field"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="submit_btn">
            <input
              type="button"
              id="submit"
              value="Submit"
              onClick={handleLogin}
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


