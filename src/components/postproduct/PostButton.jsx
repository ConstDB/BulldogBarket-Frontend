import React from "react";

export default function PostButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 710,
        height: 50,
        background: "#35408E",
        color: "white",
        borderRadius: 12,
        fontSize: 18,
        fontWeight: 700,
        marginTop: 20
      }}
    >
      Post Listing
    </button>
  );
}
