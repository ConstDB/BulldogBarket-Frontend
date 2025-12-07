import React, { useState } from "react";
import burgerIcon from "../../assets/burger.svg";
import shirtIcon from "../../assets/shirt.svg";
import listingIcon from "../../assets/listingType.svg";

export default function ListingTypeSelector() {
  const [type, setType] = useState("single");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        padding: 20,
        border: "1px solid #E5E7EB",
        backgroundColor: "white",
        borderRadius: 10,
        width: 800 
      }}>
        
      <div style={{ fontSize: 16, fontFamily: "Inter", fontWeight: 700, color: "#334155", textAlign: "left", display: "flex", alignItems: "center", gap: 8 }}>
        <img src={listingIcon} alt="listing type" style={{ width: 24, height: 24 }} />
        Listing Type
      </div>

      <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
        <div
          onClick={() => setType("single")}
          style={{
            width: 350,
            height: 140,
            background: type === "single" ? "#EFF6FF" : "white",
            border: "1px solid #E5E7EB",
            borderRadius: 10,
            padding: 10,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "transform 0.2s, box-shadow 0.2s"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <img src={shirtIcon} alt="shirt" style={{ width: 40, height: 40 }} />
          <div style={{ fontSize: 14, fontWeight: 700 }}>Single Item</div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>
            Unique items like uniforms, books, or old gadgets.
          </div>
          <div style={{ fontSize: 10, color: "#35408E", fontWeight: 700 }}>REQUEST WORKFLOW</div>
        </div>

        <div
          onClick={() => setType("bulk")}
          style={{
            width: 350,
            height: 140,
            background: type === "bulk" ? "#EFF6FF" : "white",
            border: "1px solid #E5E7EB",
            borderRadius: 10,
            padding: 10,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "transform 0.2s, box-shadow 0.2s"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <img src={burgerIcon} alt="burger" style={{ width: 40, height: 40 }} />
          <div style={{ fontSize: 14, fontWeight: 700 }}>Bulk / Food</div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>
            Items with multiple stocks like graham balls, pins.
          </div>
          <div style={{ fontSize: 10, color: "#16A34A", fontWeight: 700 }}>INSTANT ORDER</div>
        </div>
      </div>
    </div>
  );
}
