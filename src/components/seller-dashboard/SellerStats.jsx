import React from "react";

export default function SellerStats() {
  const statsData = [
    { label: "TOTAL EARNINGS", value: "₱ 3,450" },
    { label: "ITEMS SOLD", value: "12" },
    { label: "TO MEETUP", value: "3" },
    { label: "RATING", value: "4.8" },
  ];

  const colors = {
    white: "#FFFFFF",
    textBlue: "#2A3B8F",    
    textGray: "#6B7280",    
    border: "#E5E7EB",      
  };

  const styles = {
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)", 
      gap: "20px",
      marginBottom: "30px",
    },
    card: {
      backgroundColor: colors.white,
      borderRadius: "16px", 
      border: `1px solid ${colors.border}`,
      padding: "24px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.02)", 
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    label: {
      fontSize: "0.75rem",
      fontWeight: "700",
      color: colors.textGray,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      marginBottom: "10px",
    },
    value: {
      fontSize: "2rem",
      fontWeight: "800",
      color: colors.textBlue,
      lineHeight: "1",
    },
  };

  return (
    <div style={styles.gridContainer}>
      {statsData.map((stat, index) => (
        <div key={index} style={styles.card}>
          <div style={styles.label}>{stat.label}</div>
          <div style={styles.value}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
}