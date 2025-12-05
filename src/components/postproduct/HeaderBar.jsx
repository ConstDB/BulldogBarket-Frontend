import React from "react";

export default function HeaderBar() {
  return (
    <div style={{
      width: "100%",
      height: 60,
      background: "#35408E",
      display: "flex",
      alignItems: "center",
      padding: "0 40px",
      color: "white",
      fontFamily: "Inter",
      fontWeight: 700,
      fontSize: 18
    }}>
      <div style={{ marginRight: 20, width: 20, height: 2, background: "#EFF6FF" }} />
      <div style={{ marginRight: 10, width: 9, height: 16, background: "#EFF6FF" }} />
      Create Listing
    </div>
  );
}
