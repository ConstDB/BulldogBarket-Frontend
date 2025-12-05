import React from "react";

export default function ImageUploader() {
  return (
    <div style={{
      width: 660,
      height: 160,
      border: "1px solid #9CA3AF",
      borderRadius: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: 20
    }}>
      <div style={{ fontWeight: 700 }}>Click or drag photos here</div>
      <div style={{ fontSize: 12, color: "#9CA3AF" }}>Max 5 photos (5MB each)</div>
      <div style={{
        width: 36,
        height: 36,
        background: "#DBEAFE",
        borderRadius: "50%",
        marginTop: 10
      }} />
    </div>
  );
}
