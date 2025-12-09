import React from "react";
import "../../styles/SignUp/barkkartPanel.css";

export default function barkkartPanel() {
  return (
    <div className="barkkart-panel">
      <div>
        <h1>BarkKart</h1>
        <h2>
          Buy, Sell, and Trade within <span>the Bulldog Community</span>.
        </h2>
        <p>
          Join the exclusive marketplace for Nationalians. Find preloved uniforms, books, food, and more from verified students.
        </p>
      </div>

      <div className="feature-container">
        <div className="feature-row">
          <div className="icon-circle"></div>
          <div className="feature-text">
            <span className="feature-title">Secure & Verified</span>
            <span className="feature-sub">Student ID verification required.</span>
          </div>   
        </div>
        
        <div className="feature-row">
          <div className="icon-circle"></div>
          <div className="feature-text">
            <span className="feature-title">Meetup or Delivery</span>
            <span className="feature-sub">Choose what works best for you.</span>
          </div>
        </div>
      </div>

        <p className="footer">
          © 2025 BarkKart. Information Assurance and Security Project.
        </p>
      </div>
  );
}
