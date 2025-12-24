"use client";

import "./Login.css";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { validateMockCredentials, setMockAuth } from "../../src/auth/mockAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = (e) => {
    if (e) {
      e.preventDefault();
    }
    
    setError("");

    // TEMPORARY MOCK AUTHENTICATION - Frontend only
    const role = validateMockCredentials(email, password);

    if (role) {
      // Set mock auth state in localStorage
      setMockAuth(role);

      // Redirect based on role
      let redirectPath = "/";
      if (role === "Doctor") {
        redirectPath = "/doctor";
      } else if (role === "Nurse") {
        redirectPath = "/nurse";
      } else if (role === "Patient") {
        redirectPath = "/patient";
      }

      // Check if there's a redirect query parameter
      const redirectParam = searchParams?.get("redirect");
      if (redirectParam) {
        redirectPath = decodeURIComponent(redirectParam);
      }

      // Use push instead of replace for better navigation
      router.push(redirectPath);
    } else {
      setError("Invalid credentials. Use password: doctor123, nurse123, or patient123");
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
                  handleLogin(e);
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
            Haven't an account?{" "}
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
