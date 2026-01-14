import React from "react";
import { FaPlus } from "react-icons/fa";

import "../../styles/SellerDashboard/SellerHeader.css";
import { useNavigate } from "react-router-dom";

export default function SellerHeader() {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <div className="title-group">
        <h1 className="header-title">Seller Hub</h1>
        <p className="header-subtitle">Manage your orders and listings</p>
      </div>

      <button className="post-btn" onClick={() => navigate("/post-product")}>
        <FaPlus size={14} /> Post New Item
      </button>
    </div>
  );
}
