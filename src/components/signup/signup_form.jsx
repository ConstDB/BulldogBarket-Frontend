import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NU_CAMPUSES, NU_COURSES, NU_YEAR_LEVELS } from "../../constants/nuConstants";
import { validateSignup } from "../../schemas/user_schema";

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
    
    // Use the validation schema
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
    <div style={{ flex: 1, background: "white", padding: "3rem" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 700 }}>Create your account</h1>
      <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "2rem" }}>
        Enter your details to join the marketplace.
      </p>

      {error && <div style={{ color: "#B91C1C", marginBottom: "1rem" }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ fontWeight: 700 }}>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Juan Dela Cruz"
            style={{ width: "100%", padding: "0.75rem", borderRadius: 8, border: "1px solid #9CA3AF" }}
          />
        </div>

        <div>
          <label style={{ fontWeight: 700 }}>Student Number <span style={{ color: "#EF4444" }}>*</span></label>
          <input
            type="text"
            name="studentNumber"
            value={formData.studentNumber}
            onChange={handleChange}
            placeholder="2022-123456"
            style={{ width: "100%", padding: "0.75rem", borderRadius: 8, border: "1px solid #9CA3AF" }}
          />
          <p style={{ fontSize: "14px", color: "#9CA3AF" }}>Required for verification. Must be a valid NU ID</p>
        </div>

        <div style={{ display: "flex", gap: "2.5rem" }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 700 }}>Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.75rem", borderRadius: 8, border: "1px solid #9CA3AF" }}
            >
              <option value="">Select a course</option>
              {NU_COURSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 700 }}>Year</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.75rem", borderRadius: 8, border: "1px solid #9CA3AF" }}
            >
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
          <label style={{ fontWeight: 700 }}>Campus</label>
          <select
            name="campus"
            value={formData.campus}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.75rem", borderRadius: 8, border: "1px solid #9CA3AF" }}
          >
            <option value="">Select a campus</option>
            {NU_CAMPUSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontWeight: 700 }}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="************"
            style={{ width: "100%", padding: "0.75rem", borderRadius: 8, border: "1px solid #9CA3AF" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
          <p style={{ fontSize: "14px" }}>
            I agree to the <span style={{ color: "#35408E", fontWeight: 700 }}>Terms of Service</span> and I certify that I am a bonafide student of National University.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ background: "#35408E", color: "white", padding: "0.75rem", borderRadius: 4, fontWeight: 700, marginTop: "1rem", cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Creating…" : "Create Account"}
        </button>
      </form>

      <p style={{ marginTop: "1rem", fontSize: "14px" }}>
        Already have an account? <Link to="/signin" style={{ color: "#35408E", fontWeight: 700 }}>Sign In</Link>
      </p>
    </div>
  );
}
