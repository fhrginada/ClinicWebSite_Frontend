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
    const authResult = validateMockCredentials(email, password);

    if (authResult) {
      // Set mock auth state in localStorage
      setMockAuth(authResult.role, authResult.userId, authResult.userName);
      
      const role = authResult.role;

      // Redirect based on role and user ID
      let redirectPath = "/";
      if (role === "Doctor" && authResult.userId) {
        redirectPath = `/doctor/${authResult.userId}/dashboard`;
      } else if (role === "Nurse" && authResult.userId) {
        redirectPath = `/nurse/${authResult.userId}/dashboard`;
      } else if (role === "Patient" && authResult.userId) {
        redirectPath = `/patient/${authResult.userId}/dashboard`;
      }

      // Check if there's a redirect query parameter
      const redirectParam = searchParams?.get("redirect");
      if (redirectParam) {
        redirectPath = decodeURIComponent(redirectParam);
      }

      // Use push instead of replace for better navigation
      router.push(redirectPath);
    } else {
      setError("Invalid email or password. Please check your credentials and try again.");
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
