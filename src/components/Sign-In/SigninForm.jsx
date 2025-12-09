import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaRegIdCard } from "react-icons/fa";
import { PiLockKeyFill } from "react-icons/pi";

// 1. Import the new CSS file
import "../../styles/SignIn/SigninForm.css"; 

export default function SigninForm() {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sign in failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-panel">
      <div className="form-content">
        <h2 className="signin-header">Sign In</h2>
        <p className="signin-subheader">Access your account using student credentials.</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Student Number / Email</label>
            <div className="input-wrapper">
              <span className="icon-left">
                <FaRegIdCard />
              </span>
              <input
                type="text"
                name="identifier"
                placeholder="e.g., 2022-123456"
                value={formData.identifier}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
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
                className="form-input"
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
          </div>

          <a href="#" className="forgot-link">Forgot Password?</a>

          <button
            type="submit"
            className="main-btn"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="create-account">
          New to BarkKart?
          <a href="#" className="create-link">Create Account</a>
        </div>
      </div>
    </div>
  );
}