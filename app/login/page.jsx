"use client";

import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import "./Login.css";

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
        } catch {
            setError("Invalid credentials or server error.");
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="welcome">
                
                    <h1 id="title">
                        Welcome To Health Clinic
                    </h1>
                
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

                    {error && (
                        <div style={{ color: "#fff", marginTop: "10px" }}>
                            {error}
                        </div>
                    )}

                    <div className="submit_btn" style={{ backgroundColor: "aqua" }}>
                        <input
                            type="submit"
                            id="submit"
                            value={isSubmitting ? "Signing in..." : "Submit"}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="msg">
                        <p>
                            Haven't an account?{" "}
                            <a href="/signup" style={{ color: "white" }}>
                                Register now
                            </a>
                        </p>
                    </div>
                </form>
            </div>
            <div className="fakebody"> . </div>
        </>
    );
}

