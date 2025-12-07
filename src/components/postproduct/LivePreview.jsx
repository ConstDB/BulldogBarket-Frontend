import React from "react";
import ImageCarousel from "./ImageCarousel";

export default function LivePreview({
  userName = "Duterte (You)",
  userLocation = "NU Manila",
  timestamp = "Just Now",
  avatarUrl = "https://placehold.co/40x40",
  itemTitle = "Item Title",
  description = "Describe your item...",
  price = 0,
  category = "Pre-loved",
  itemImages = []
}) {
  return (
    <div style={{ width: 352, height: 380, position: "relative" }}>
      <div
        style={{
          width: 352,
          height: 331,
          position: "absolute",
          left: 0,
          top: 0,
          background: "white",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 14,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          border: "1px #F3F4F6 solid"
        }}
      />

      <img
        style={{
          width: 40,
          height: 40,
          position: "absolute",
          left: 16,
          top: 16,
          borderRadius: 9999
        }}
        src={avatarUrl}
        alt="user"
      />
      <div
        style={{
          left: 68,
          top: 18,
          position: "absolute",
          color: "black",
          fontSize: 14,
          fontFamily: "Inter",
          fontWeight: 700,
          wordWrap: "break-word"
        }}
      >
        {userName}
      </div>
      <div
        style={{
          left: 68,
          top: 39,
          position: "absolute",
          color: "#6B7280",
          fontSize: 12,
          fontFamily: "Inter",
          fontWeight: 400,
          wordWrap: "break-word"
        }}
      >
        {timestamp} • {userLocation}
      </div>

      {/* Item description */}
      <div
        style={{
          left: 16,
          top: 72,
          position: "absolute",
          color: "black",
          fontSize: 12,
          fontFamily: "Inter",
          fontWeight: 400,
          wordWrap: "break-word"
        }}
      >
        {description}
      </div>

      {/* Image placeholder */}
      {/* Image carousel */}
      <div style={{ left: 16, top: 100, position: "absolute" }}>
        <ImageCarousel itemImages={itemImages} />
      </div>

      {/* Category badges */}
      <div
        style={{
          width: 70,
          height: 18,
          left: 24,
          top: 108,
          position: "absolute",
          background: "#F9FAFB",
          borderRadius: 20
        }}
      />
      <div
        style={{
          left: 32,
          top: 110,
          position: "absolute",
          color: "#334155",
          fontSize: 12,
          fontFamily: "Inter",
          fontWeight: 400,
          wordWrap: "break-word"
        }}
      >
        Category
      </div>
      <div
        style={{
          width: 71,
          height: 18,
          left: 102,
          top: 108,
          position: "absolute",
          background: "#EFF6FF",
          borderRadius: 20
        }}
      />
      <div
        style={{
          left: 110,
          top: 110,
          position: "absolute",
          color: "#35408E",
          fontSize: 12,
          fontFamily: "Inter",
          fontWeight: 400,
          wordWrap: "break-word"
        }}
      >
        {category}
      </div>

      {/* Price tag */}
      <div
        style={{
          width: 75,
          height: 35,
          left: 16,
          top: 215,
          position: "absolute",
          background: "#35408E",
          borderTopRightRadius: 5
        }}
      />
      <div
        style={{
          left: 28,
          top: 223,
          position: "absolute",
          color: "#FFD400",
          fontSize: 16,
          fontFamily: "Inter",
          fontWeight: 700,
          wordWrap: "break-word"
        }}
      >
        ₱{price}
      </div>

      {/* Action / item title */}
      <div
        style={{
          width: 320,
          height: 73,
          left: 16,
          top: 250,
          position: "absolute",
          background: "#F9FAFB",
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          border: "1px #F3F4F6 solid"
        }}
      />
      <div
        style={{
          left: 32,
          top: 266,
          position: "absolute",
          color: "#1F2937",
          fontSize: 14,
          fontFamily: "Inter",
          fontWeight: 700,
          wordWrap: "break-word"
        }}
      >
        {itemTitle}
      </div>
      <div
        style={{
          width: 288,
          height: 24,
          left: 32,
          top: 291,
          position: "absolute",
          background: "rgba(53, 64, 142, 0.50)",
          borderRadius: 5
        }}
      />
      <div
        style={{
          left: 135.19,
          top: 295,
          position: "absolute",
          color: "white",
          fontSize: 12,
          fontFamily: "Inter",
          fontWeight: 700,
          wordWrap: "break-word"
        }}
      >
        Action Button
      </div>
    </div>
  );
}
