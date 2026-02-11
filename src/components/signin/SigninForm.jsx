import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaRegIdCard } from "react-icons/fa";
import { PiLockKeyFill } from "react-icons/pi";
import "../../styles/SignIn/SignInForm.css";
import useUserStore from "@/stores/useUserStore";
import { useNavigate } from "react-router-dom";

export default function SigninForm() {
  const [formData, setFormData] = useState({ studentNumber: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const setUser = useUserStore((s) => s.setUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const API_BASE = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sign in failed");
      }

      const data = await response.json();
      setUser(data.user);

      localStorage.setItem("token", data.token);
      navigate("/marketfeed");
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-form-panel">
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}

        <label>Student Number / Email</label>
        <div className="input-wrapper">
          <span className="icon-left">
            <FaRegIdCard />
          </span>
          <input
            type="text"
            name="studentNumber"
            placeholder="e.g., 2022-123456"
            value={formData.studentNumber}
            onChange={handleChange}
            required
          />
        </div>

        <label>Password</label>
        <div className="input-wrapper">
          <span className="icon-left">
            <PiLockKeyFill />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="*************"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>

        <a href="#" className="forgot-link">
          Forgot Password?
        </a>

        <button type="submit" className="main-btn" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className="create-account">
          New to BarkKart?{" "}
          <a href="/signup" className="create-link">
            Create Account
          </a>
        </div>
      </form>
    </div>
  );
}
