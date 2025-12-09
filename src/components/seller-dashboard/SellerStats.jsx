import React from "react";

// 1. Import the new CSS file
import "../../styles/SellerDashboard/SellerStats.css";

export default function SellerStats() {
  const statsData = [
    { label: "TOTAL EARNINGS", value: "₱ 3,450" },
    { label: "ITEMS SOLD", value: "12" },
    { label: "TO MEETUP", value: "3" },
    { label: "RATING", value: "4.8" },
  ];

  return (
    <div className="stats-grid">
      {statsData.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-label">{stat.label}</div>
          <div className="stat-value">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}