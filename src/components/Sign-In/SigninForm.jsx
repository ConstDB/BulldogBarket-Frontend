import { useState } from "react";

export default function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="form-content">
      <h2 className="form-title">Sign In</h2>
      <p className="form-subtitle">Access your account using student credentials.</p>
      <div className="input-group">
        <label>Student Number / Email</label>
        <div className="input-wrapper">
          <span className="icon">🪪</span> 
          <input 
            type="text" 
            placeholder="e.g., 2022-123456" 
            className="form-input"
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="input-group">
        <label>Password</label>
        <div className="input-wrapper">
          <span className="icon">🔒</span>
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="*************" 
            className="form-input"
          />
          <button 
            type="button"
            className="eye-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <a href="#" className="forgot-link">Forgot Password?</a>
      </div>
      <button className="signin-btn">Sign In</button>
      <p className="create-account">
        New to BarkKart? <a href="#">Create Account</a>
      </p>
    </div>
  );
}