import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaRegIdCard } from "react-icons/fa";
import { PiLockKeyFill } from "react-icons/pi";

export default function SigninForm() {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [hoverBtn, setHoverBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const colors = {
    blue: "#2A3B8F",
    blueDark: "#1e2b6e",
    textDark: "#1F2937",
    textLight: "#6B7280",
    inputFocus: "#2A3B8F",
  };

  const styles = {
    panel: {
      width: "700px",
      padding: "60px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    formContent: {
      width: "544px",
    },
    header: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: colors.textDark,
      marginBottom: "10px",
    },
    subHeader: {
      color: colors.textLight,
      fontSize: "0.95rem",
      marginBottom: "35px",
    },
    inputGroup: {
      marginBottom: "20px",
      width: "100%",
    },
    label: {
      display: "block",
      fontSize: "0.9rem",
      fontWeight: "700",
      color: colors.textDark,
      marginBottom: "8px",
    },
    inputWrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    input: (isFocused) => ({
      width: "544px",
      height: "48px",
      padding: "12px 12px 12px 45px",
      borderRadius: "8px",
      border: `1px solid ${isFocused ? colors.inputFocus : "#9CA3AF"}`,
      fontSize: "1rem",
      outline: "none",
      transition: "border-color 0.2s ease",
      color: colors.textDark,
      boxSizing: "border-box",
    }),
    iconLeft: {
      position: "absolute",
      left: "14px",
      color: colors.textLight,
      fontSize: "1.2rem",
      display: "flex",
      alignItems: "center",
    },
    eyeBtn: {
      position: "absolute",
      right: "14px",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: colors.textLight,
      display: "flex",
      alignItems: "center",
    },
    forgotLink: {
      display: "block",
      textAlign: "right",
      fontSize: "0.9rem",
      color: colors.blue,
      fontWeight: "600",
      textDecoration: "none",
      marginBottom: "30px",
      marginTop: "5px",
    },
    mainBtn: {
      width: "544px",
      height: "48px",
      backgroundColor: hoverBtn ? colors.blueDark : colors.blue,
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "700",
      cursor: "pointer",
      transition: "background-color 0.2s",
      marginBottom: "25px",
    },
    createAccount: {
      textAlign: "center",
      fontSize: "0.95rem",
      color: colors.textLight,
      fontWeight: "500",
      width: "100%",
    },
    createLink: {
      color: colors.blue,
      fontWeight: "700",
      textDecoration: "none",
      marginLeft: "5px",
    },
    errorMessage: {
      color: "#DC2626",
      fontSize: "0.9rem",
      marginBottom: "15px",
      padding: "10px",
      backgroundColor: "#FEE2E2",
      borderRadius: "6px",
      border: "1px solid #FCA5A5",
    },
  };

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
      // Store token and redirect
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.panel}>
      <div style={styles.formContent}>
        <h2 style={styles.header}>Sign In</h2>
        <p style={styles.subHeader}>Access your account using student credentials.</p>

        {error && <div style={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Student Number / Email</label>
            <div style={styles.inputWrapper}>
              <span style={styles.iconLeft}>
                <FaRegIdCard />
              </span>
              <input
                type="text"
                name="identifier"
                placeholder="e.g., 2022-123456"
                value={formData.identifier}
                onChange={handleChange}
                style={styles.input(focusedInput === "user")}
                onFocus={() => setFocusedInput("user")}
                onBlur={() => setFocusedInput(null)}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <span style={styles.iconLeft}>
                <PiLockKeyFill />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="*************"
                value={formData.password}
                onChange={handleChange}
                style={styles.input(focusedInput === "pass")}
                onFocus={() => setFocusedInput("pass")}
                onBlur={() => setFocusedInput(null)}
                required
              />
              <button
                type="button"
                style={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          <a href="#" style={styles.forgotLink}>Forgot Password?</a>

          <button
            type="submit"
            style={styles.mainBtn}
            onMouseEnter={() => setHoverBtn(true)}
            onMouseLeave={() => setHoverBtn(false)}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div style={styles.createAccount}>
          New to BarkKart?
          <a href="#" style={styles.createLink}>Create Account</a>
        </div>
      </div>
    </div>
  );
}