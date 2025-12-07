import React from "react";
import { FaPlus } from "react-icons/fa";

export default function SellerHeader() {
  // --- THEME COLORS ---
  const colors = {
    textDark: "#1F2937",    // Dark Grey
    textLight: "#6B7280",   // Light Grey
    yellow: "#FFD400",      // "Post Item" Button Yellow
    buttonText: "#111827",  // Almost black text for button
  };

  // --- DYNAMIC STYLES ---
  const styles = {
    headerContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
    },
    titleGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "800",
      color: colors.textDark,
      margin: 0,
      lineHeight: "1.2",
    },
    subtitle: {
      fontSize: "1rem",
      color: colors.textLight,
      fontWeight: "400",
    },
    postBtn: {
      backgroundColor: colors.yellow,
      color: colors.buttonText,
      border: "none",
      padding: "12px 24px",
      borderRadius: "8px", // Matches the rounded look of inputs
      fontWeight: "700",
      fontSize: "0.95rem",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Subtle shadow
      transition: "transform 0.1s ease",
    },
  };

  return (
    <div style={styles.headerContainer}>
      {/* Left: Title & Subtitle */}
      <div style={styles.titleGroup}>
        <h1 style={styles.title}>Seller Hub</h1>
        <p style={styles.subtitle}>Manage your orders and listings</p>
      </div>

      {/* Right: Action Button */}
      <button 
        style={styles.postBtn}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        <FaPlus size={14} /> Post New Item
      </button>
    </div>
  );
}