import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    studentNumber: "",
    course: "",
    year: "",
    campus: "",
    password: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div style={{ flex: 1, background: "white", padding: "3rem" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 700 }}>Create your account</h1>
      <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "2rem" }}>
        Enter your details to join the marketplace.
      </p>

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
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="BSCS-ML"
              style={{ width: "100%", padding: "0.75rem", borderRadius: 8, border: "1px solid #9CA3AF" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 700 }}>Year</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="3rd year"
              style={{ width: "100%", padding: "0.75rem", borderRadius: 8, border: "1px solid #9CA3AF" }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontWeight: 700 }}>Campus</label>
          <input
            type="text"
            name="campus"
            value={formData.campus}
            onChange={handleChange}
            placeholder="NU Manila"
            style={{ width: "100%", padding: "0.75rem", borderRadius: 8, border: "1px solid #9CA3AF" }}
          />
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
          style={{ background: "#35408E", color: "white", padding: "0.75rem", borderRadius: 4, fontWeight: 700, marginTop: "1rem", cursor: "pointer" }}
        >
          Create Account
        </button>
      </form>

      <p style={{ marginTop: "1rem", fontSize: "14px" }}>
        Already have an account? <Link to="/signin" style={{ color: "#35408E", fontWeight: 700 }}>Sign In</Link>
      </p>
    </div>
  );
}
