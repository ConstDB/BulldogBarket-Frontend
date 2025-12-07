import React from "react";
import "../../styles/MarketFeed/FilterButton.css";

export default function FilterButtons({ active, onChange }) {
  const buttons = [
    { label: "All Posts", value: "all" },
    { label: "General Market", value: "market" },
    { label: "Food Court", value: "food" }
  ];

  return (
    <div className="filter-btn-container">
      {buttons.map((btn) => {
        const isActive = active === btn.value;

        return (
          <button
            key={btn.value}
            className={`filter-btn ${isActive ? "active" : ""}`}
            onClick={() => onChange(btn.value)}
          >
            {btn.label}
          </button>
        );
      })}
    </div>
  );
}
