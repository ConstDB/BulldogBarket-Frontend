import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NU_CAMPUSES, NU_COURSES, NU_YEAR_LEVELS } from "../../constants/nuConstants";
import { validateSignup } from "../../schemas/user_schema";
import "../../styles/SignUp/signup.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import passwordIcon from "../../assets/password.svg";
import person from "../../assets/person.svg";
import ID from "../../assets/ID.svg";
import campusIcon from "../../assets/campus.svg";

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
  const [showPassword, setShowPassword] = useState(false);
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
      name: formData.fullName,
      studentNumber: formData.studentNumber,
      course: formData.course,
      yearLevel: formData.year,
      campus: formData.campus,
      password: formData.password,
    };

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/v1/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (data?.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        navigate("/signin");
      }
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

        <div className="input-wrapper">
          <span className="icon-left">
            <img src={person} alt="person icon" className="input-icon" />
          </span>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Juan Dela Cruz"
            required
          />
        </div>

        <div>
          <label>
            Student Number <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <span className="icon-left">
              <img src={ID} alt="student ID icon" className="input-icon" />
            </span>
            <input
              type="text"
              name="studentNumber"
              value={formData.studentNumber}
              onChange={handleChange}
              placeholder="2022-123456"
              required
            />
          </div>
          <p className="signup-helper-text">
            Required for verification. Must be a valid NU ID
          </p>
        </div>

        <div className="signup-select-row">
          <div className="select-wrapper">
            <label>Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className={formData.course === "" ? "placeholder" : ""}
            >
              <option value="" disabled>
                e.g., BSCS-ML
              </option>
              {NU_COURSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="select-wrapper">
            <label>Year</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={formData.year === "" ? "placeholder" : ""}
            >
              <option value="" disabled>
                e.g., 3rd year
              </option>
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
          <div className="input-wrapper">
            <span className="icon-left">
              <img src={campusIcon} alt="campus icon" className="input-icon" />
            </span>
            <select
              name="campus"
              value={formData.campus}
              onChange={handleChange}
              className={formData.campus === "" ? "placeholder" : ""}
              required
            >
              <option value="" disabled>
                NU Manila
              </option>
              {NU_CAMPUSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-wrapper">
          <span className="icon-left">
            <img src={passwordIcon} alt="password icon" className="input-icon" />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="************"
            required
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <FaEyeSlash color="#6B7280" /> : <FaEye color="#6B7280" />}
          </button>
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
