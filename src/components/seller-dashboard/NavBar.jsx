import React from "react";
// 1. Import Link so we can navigate
import { Link } from "react-router-dom"; 
import { FaStore, FaMoon, FaHome } from "react-icons/fa";

export default function Navbar() {
  const styles = {
    navbar: {
      width: "100%",
      height: "64px",
      backgroundColor: "#2A3B8F", 
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 40px",
      boxSizing: "border-box", 
      color: "white",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    brandGroup: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer",
      textDecoration: "none", // Removes underline
      color: "white",
    },
    brandIcon: {
      fontSize: "1.5rem",
      color: "#FBBF24", 
    },
    brandName: {
      fontSize: "1.2rem",
      fontWeight: "800",
      letterSpacing: "0.5px",
    },
    navGroup: {
      display: "flex",
      alignItems: "center",
      gap: "24px",
    },
    iconLink: {
      color: "white",
      fontSize: "1.2rem",
      display: "flex",
      alignItems: "center",
      opacity: 0.9,
      transition: "opacity 0.2s",
      textDecoration: "none",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    profileImg: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      backgroundColor: "#E5E7EB",
      border: "2px solid rgba(255,255,255,0.2)",
      objectFit: "cover",
      cursor: "pointer",
    }
  };

  return (
    <div style={styles.navbar}>
      {/* LEFT: Logo -> Link to Home */}
      <Link to="/" style={styles.brandGroup}>
        <FaStore style={styles.brandIcon} />
        <span style={styles.brandName}>BarkKart</span>
      </Link>

      {/* RIGHT: Icons */}
      <div style={styles.navGroup}>
        <button style={styles.iconLink} title="Dark Mode">
          <FaMoon />
        </button>

        {/* Home Icon -> Link to Home */}
        <Link to="/" style={styles.iconLink} title="Home">
          <FaHome />
        </Link>

        {/* Profile Image -> Link to Sign In */}
        <Link to="/signin"> 
          <img 
            src="https://placehold.co/100" 
            alt="Profile" 
            style={styles.profileImg} 
          />
        </Link>
      </div>
    </div>
  );
}