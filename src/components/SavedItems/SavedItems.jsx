import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import SavedItemCard from "../components/SavedItems/SavedItemCard";

import "../styles/SavedItems/SavedItems.css"; 

export default function SavedItems() {
  const navigate = useNavigate();

  // MOCK DATA
  const [savedItems, setSavedItems] = useState([
    {
      "listing": {
        "_id": "6935b2b7cdcc1bec7f563ca5",
        "seller": {
          "_id": "693428c5fdbfd10f55b2cfad",
          "name": "Rj Silagan"
        },
        "type": "bulk",
        "name": "NU ID Lace",
        "images": [
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3.amazonaws.com%2Fimages.ecwid.com%2Fimages%2F26273031%2F1377812301.jpg&f=1&nofb=1&ipt=3987cea91d3c720c7dd5b3e95f87c905784b35548c7c132d03d025d54ed3a988"
        ],
        "price": 120,
        "category": "Accessories",
        "stocks": 50
      },
      "createdAt": "2025-12-09T17:32:05.788Z"
    },
    {
      "listing": {
        "_id": "69385eabe0f11e88240f4266",
        "seller": {
          "_id": "69385defe0f11e88240f4255",
          "name": "EdrIch Santuyo"
        },
        "type": "bulk",
        "name": "OLFU ID Lace",
        "images": [
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3.amazonaws.com%2Fimages.ecwid.com%2Fimages%2F26273031%2F1377812301.jpg&f=1&nofb=1&ipt=3987cea91d3c720c7dd5b3e95f87c905784b35548c7c132d03d025d54ed3a988"
        ],
        "price": 120,
        "category": "Accessories",
        "status": "available",
        "stocks": 50
      },
      "createdAt": "2025-12-09T17:39:59.388Z"
    }
  ]);

  const handleRemove = (listingId) => {
    const updatedList = savedItems.filter(item => item.listing._id !== listingId);
    setSavedItems(updatedList);
  };

  return (
    <div className="saved-items-page">
      {/* Header Bar */}
      <div className="saved-header-bg">
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">
          <FaArrowLeft />
        </button>
        <span className="page-title">Saved Items</span>
      </div>

      {/* Main Content */}
      <div className="saved-content">
        <div className="list-header">
          <h2>Your Watchlist ({savedItems.length})</h2>
          <p className="list-subtitle">Items you've bookmarked for later.</p>
        </div>

        {/* Dynamic Grid */}
        <div className="saved-grid">
          {savedItems.map((item, index) => (
            <SavedItemCard 
              key={item.listing._id || index} 
              data={item} 
              onRemove={handleRemove} 
            />
          ))}
        </div>

        {savedItems.length === 0 && (
          <p style={{ textAlign: "center", color: "#6B7280", marginTop: "50px", fontSize: "1.1rem" }}>
            Your watchlist is empty. <Link to="/" style={{ color: "#2A3B8F", fontWeight: "bold" }}>Browse items</Link>
          </p>
        )}
      </div>
    </div>
  );
}