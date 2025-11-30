import React from "react";

export default function BarkKartPanel() {
  return (
    <div
      style={{
        flex: 1,
        background: "#35408E",
        color: "white",
        padding: "3rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h1 style={{ fontSize: "28px", fontWeight: 700 }}>BarkKart</h1>
        <h2
          style={{
            fontSize: "36px",
            fontWeight: 700,
            marginTop: "2rem",
            lineHeight: 1.2,
          }}
        >
          Buy, Sell, and Trade within <span style={{ color: "#FFD400" }}>the Bulldog Community</span>.
        </h2>
        <p
          style={{
            marginTop: "1rem",
            color: "#DBEAFE",
            fontSize: "18px",
            lineHeight: 1.5,
          }}
        >
          Join the exclusive marketplace for Nationalians. Find preloved uniforms, books, food, and more from verified students.
        </p>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", marginTop: "2rem" }}>
          <div style={{ width: 48, height: 48, borderRadius: "9999px", background: "rgba(255,255,255,0.2)", marginRight: "1rem" }} />
          <div>
            <p style={{ fontWeight: 700 }}>Secure & Verified</p>
            <p>Safe transactions on campus.</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
          <div style={{ width: 48, height: 48, borderRadius: "9999px", background: "rgba(255,255,255,0.2)", marginRight: "1rem" }} />
          <div>
            <p style={{ fontWeight: 700 }}>Meetup or Delivery</p>
          </div>
        </div>

        <p style={{ marginTop: "2rem", fontSize: "14px", color: "#E5E7EB" }}>
          © 2025 BarkKart. Information Assurance and Security Project.
        </p>
      </div>
    </div>
  );
}
