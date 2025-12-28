"use client";

import "./Login.css";
import { useState } from "react";
// Fixed: Remove unused imports
import { useAuth } from "../../src/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // Fixed: Remove unused variables
  const { login } = useAuth();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      await login({ email, password });
      // Redirect is handled by AuthContext
    } catch {
      // Fixed: Remove unused error variable
      setError("Login failed. Please try again.");
    }
  };

  return (
    <>
      {/* Welcome message */}
      <div className="welcome">
        <h1 id="title">Welcome Back</h1>
      </div>

      {/* Login form */}
      <div className="form_container">
        <form onSubmit={handleLogin}>
          <div className="user_div">
            <label htmlFor="user_field" style={{ color: "white" }}>
              Email
            </label>
            <input
              id="user_field"
              type="text"
              value={email}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
          </div>

          <div className="submit_btn">
            <input
              type="submit"
              id="submit"
              value="Sign in"
            />
          </div>

          {/* Error message */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <p>
            Haven&apos;t an account?{" "}
            <a href="/signup" style={{ color: "white" }}>
              Register now
            </a>
          </p>
        </form>
      </div>

      {/* Background */}
      <div className="fakebody"></div>
    </>
  );
}
