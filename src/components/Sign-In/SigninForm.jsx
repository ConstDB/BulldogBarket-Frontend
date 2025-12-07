import { useState } from "react";
import {FaEye,  FaEyeSlash, FaRegIdCard } from "react-icons/fa";
import { PiLockKeyFill } from "react-icons/pi";

export default function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="form-content">
      <h2 className="form-title">Sign In</h2>
      <p className="form-subtitle">Access your account using student credentials.</p>
      <div className="input-group">
        <label>Student Number / Email</label>
        <div className="input-wrapper">
          <span className="icon">
            <FaRegIdCard size={18}/>
            </span>
        
          <input 
            type="text" 
            placeholder="e.g., 2022-123456" 
            className="form-input"
          />
        </div>
      </div>

<div className="input-group">
  <label>Password</label>
  <div className="input-wrapper">
    <span className="icon">
      <PiLockKeyFill size={18} />
    </span>
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
      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
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