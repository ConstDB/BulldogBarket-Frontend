import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NU_CAMPUSES, NU_COURSES, NU_YEAR_LEVELS } from "../../constants/nuConstants";
import { validateSignup } from "../../schemas/user_schema";
import "../../styles/signup/signup.css"; // Make sure this path is correct

export default function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    studentNumber: "",
    course: "",
    year: "",
    campus: "",
    password: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL || "";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const validationErrors = validateSignup(formData);
    if (Object.keys(validationErrors).length > 0) {
      setError(Object.values(validationErrors)[0]);
      return;
    }

    const payload = {
      fullName: formData.fullName,
      studentNumber: formData.studentNumber,
      course: formData.course,
      year: formData.year,
      campus: formData.campus,
      password: formData.password,
    };

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.message || "Signup failed");
        return;
      }

      navigate("/signin");
    } catch (err) {
      setError(err?.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-form-container">
      <h1>Create your account</h1>
      <p>Enter your details to join the marketplace.</p>

      {error && <div className="signup-error">{error}</div>}

      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Juan Dela Cruz"
          />
        </div>

        <div>
          <label>
            Student Number <span className="required">*</span>
          </label>
          <input
            type="text"
            name="studentNumber"
            value={formData.studentNumber}
            onChange={handleChange}
            placeholder="2022-123456"
          />
          <p className="signup-helper-text">
            Required for verification. Must be a valid NU ID
          </p>
        </div>

        <div className="signup-select-row">
          <div>
            <label>Course</label>
            <select name="course" value={formData.course} onChange={handleChange}>
              <option value="">Select a course</option>
              {NU_COURSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Year</label>
            <select name="year" value={formData.year} onChange={handleChange}>
              <option value="">Select year level</option>
              {NU_YEAR_LEVELS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label>Campus</label>
          <select name="campus" value={formData.campus} onChange={handleChange}>
            <option value="">Select a campus</option>
            {NU_CAMPUSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="************"
          />
        </div>

        <div className="signup-checkbox">
          <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
          <p>
            I agree to the <span className="signup-highlight">Terms of Service</span> and I certify
            that I am a bonafide student of National University.
          </p>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating…" : "Create Account"}
        </button>
      </form>

      <p className="signup-signin-link">
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
}
