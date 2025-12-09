import React from "react";
import { FaPlus } from "react-icons/fa";

// 1. Import the new CSS file
import "../../styles/SellerDashboard/SellerHeader.css";

export default function SellerHeader() {
  return (
    <div className="header-container">
      {/* Left: Title & Subtitle */}
      <div className="title-group">
        <h1 className="header-title">Seller Hub</h1>
        <p className="header-subtitle">Manage your orders and listings</p>
      </div>

      {/* Right: Action Button */}
      <button className="post-btn">
        <FaPlus size={14} /> Post New Item
      </button>
    </div>
  );
}