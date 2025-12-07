import React from "react";

export default function FilterButtons({ active, onChange }) {
  const buttons = [
    { label: "All Posts", value: "all" },
    { label: "General Market", value: "market" },
    { label: "Food Court", value: "food" }
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        position: "absolute",
        left: "392px",
        top: "220px",
      }}
    >
      {buttons.map((btn) => {
        const isActive = active === btn.value;

        return (
          <button
            key={btn.value}
            onClick={() => onChange(btn.value)}
            style={{
              padding: "8px 20px",
              borderRadius: "999px",
              border: `1px solid ${isActive ? "#2e3fa8" : "#d9d9d9"}`,
              background: isActive ? "#2e3fa8" : "white",
              color: isActive ? "white" : "black",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontFamily: "Sen, sans-serif",
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.target.style.background = "#f4f4f4";
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.target.style.background = "white";
            }}
          >
            {btn.label}
          </button>
        );
      })}
    </div>
  );
}
