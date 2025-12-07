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

      <div>
        <div className="feature">
          <div className="feature-icon" />
          <div className="feature-text">
            <p>Secure & Verified</p>
            <p>Safe transactions on campus.</p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-icon" />
          <div className="feature-text">
            <p>Meetup or Delivery</p>
          </div>
        </div>

        <p className="footer">
          © 2025 BarkKart. Information Assurance and Security Project.
        </p>
      </div>
    </div>
  );
}
