import React from "react";
// Import the components we built
// Note: Ensure these paths match exactly where you saved the files in your 'components' folder
import SellerHeader from "../../components/seller-dashboard/SellerHeader";
import SellerStats from "../../components/seller-dashboard/SellerStats";
import OrderSection from "../../components/seller-dashboard/OrderSection";
import SellerListings from "../../components/seller-dashboard/SellerListings";
export default function SellerDashboard() {
  // --- DYNAMIC STYLES ---
  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#F9FAFB", // Light grey background like Figma
      padding: "40px",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      justifyContent: "center", // Centers the content on huge screens
    },
    container: {
      width: "100%",
      maxWidth: "1280px", // Prevents it from stretching too wide on ultrawide monitors
      display: "flex",
      flexDirection: "column",
      gap: "30px",
    },
    // The Layout Grid: Left Column is wider (2fr), Right Column is narrower (1fr)
    mainContentGrid: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr", 
      gap: "30px",
      alignItems: "start", // Ensures columns don't stretch vertically weirdly
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        
        {/* 1. Header (Title + Post Button) */}
        <SellerHeader />

        {/* 2. Stats Row (4 Cards) */}
        <SellerStats />

        {/* 3. Main Split Layout */}
        <div style={styles.mainContentGrid}>
          
          {/* Left Side: Requests & Meetups */}
          <OrderSection />

          {/* Right Side: Active Listings */}
          <SellerListings />
          
        </div>

      </div>
    </div>
  );
}