import React from "react";
import { FaStore } from "react-icons/fa";
import { BiPackage } from "react-icons/bi";

// 1. Import the new CSS file
import "../..//styles/SignIn/SigninHeroPanel.css";

export default function SigninHeroPanel() {
  return (
    <div className="hero-panel">
      <div className="brand-row">
        <FaStore className="brand-icon" />
        <span className="brand-name">BarkKart</span>
      </div>

      <h1 className="hero-title">
        Welcome back<br />
        <span className="highlight">Nationalian.</span>
      </h1>

      <p className="hero-desc">
        Log in to manage your orders, check your sales,
        and discover new items in the marketplace.
      </p>

      <div className="feature-row">
        <div className="icon-circle">
          <BiPackage />
        </div>
        <div className="feature-text">
          <span className="feature-title">Track Orders</span>
          <span className="feature-sub">Real-time updates on your purchases.</span>
        </div>
      </div>

      <div className="feature-row">
        <div className="icon-circle">
          <FaStore />
        </div>
        <div className="feature-text">
          <span className="feature-title">Seller Dashboard</span>
          <span className="feature-sub">Monitor your revenue and inventory</span>
        </div>
      </div>

      <div className="copyright">
        © 2025 BarkKart. Information Assurance and Security Project.
      </div>
    </div>
  );
}