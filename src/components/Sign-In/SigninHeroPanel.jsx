import React from "react";
import { FaStore } from "react-icons/fa";
import { BiPackage } from "react-icons/bi";

export default function SigninHeroPanel() {
  const colors = {
    blue: "#35408E", // Updated to match the specific hex in your styles
    yellow: "#FBBF24",
  };

  const styles = {
    panel: {
      width: "640px",
      backgroundColor: colors.blue,
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      color: "white",
      position: "relative",
    },
    brandRow: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      position: "absolute",
      top: "40px",
      left: "40px",
    },
    brandIcon: {
      fontSize: "1.5rem",
      color: colors.yellow,
    },
    brandName: {
      fontSize: "1.2rem",
      fontWeight: "800",
      letterSpacing: "0.5px",
    },
    heroTitle: {
      fontSize: "2.5rem",
      fontWeight: "800",
      lineHeight: "1.1",
      marginBottom: "20px",
      marginTop: "20px",
    },
    highlight: {
      color: colors.yellow,
    },
    heroDesc: {
      fontSize: "0.95rem",
      opacity: "0.9",
      marginBottom: "40px",
      lineHeight: "1.5",
      maxWidth: "350px",
    },
    featureRow: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      marginBottom: "25px",
    },
    iconCircle: {
      width: "48px",
      height: "48px",
      backgroundColor: "rgba(255,255,255, 0.2)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.2rem",
    },
    featureText: {
      display: "flex",
      flexDirection: "column",
    },
    featureTitle: {
      fontWeight: "700",
      fontSize: "0.95rem",
    },
    featureSub: {
      fontSize: "0.8rem",
      opacity: "0.8",
    },
    copyright: {
      position: "absolute",
      bottom: "30px",
      left: "40px",
      fontSize: "0.75rem",
      opacity: 0.6,
    },
  };

  return (
    <div style={styles.panel}>
      <div style={styles.brandRow}>
        <FaStore style={styles.brandIcon} />
        <span style={styles.brandName}>BarkKart</span>
      </div>

      <h1 style={styles.heroTitle}>
        Welcome back<br />
        <span style={styles.highlight}>Nationalian.</span>
      </h1>

      <p style={styles.heroDesc}>
        Log in to manage your orders, check your sales,
        and discover new items in the marketplace.
      </p>

      <div style={styles.featureRow}>
        <div style={styles.iconCircle}>
          <BiPackage />
        </div>
        <div style={styles.featureText}>
          <span style={styles.featureTitle}>Track Orders</span>
          <span style={styles.featureSub}>Real-time updates on your purchases.</span>
        </div>
      </div>

      <div style={styles.featureRow}>
        <div style={styles.iconCircle}>
          <FaStore />
        </div>
        <div style={styles.featureText}>
          <span style={styles.featureTitle}>Seller Dashboard</span>
          <span style={styles.featureSub}>Monitor your revenue and inventory</span>
        </div>
      </div>

      <div style={styles.copyright}>
        © 2025 BarkKart. Information Assurance and Security Project.
      </div>
    </div>
  );
}