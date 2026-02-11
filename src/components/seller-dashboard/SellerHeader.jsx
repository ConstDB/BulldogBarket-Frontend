import React from "react";
import { FaPlus } from "react-icons/fa";

import "../../styles/SellerDashboard/SellerHeader.css";
import { useNavigate } from "react-router-dom";

export default function SellerHeader() {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <div className="title-group">
        <h1 className="text-3xl font-bold">Seller Hub</h1>
        <p className="text-lg text-neutral-500">
          Manage your orders and listings
        </p>
      </div>

      <button className="post-btn" onClick={() => navigate("/post-product")}>
        <FaPlus size={14} /> Post New Item
      </button>
    </div>
  );
}
