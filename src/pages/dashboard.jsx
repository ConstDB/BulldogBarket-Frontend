import React from "react";
import SellerHeader from "../components/seller-dashboard/SellerHeader";
import SellerStats from "../components/seller-dashboard/SellerStats";
import OrderSection from "../components/seller-dashboard/OrderSection";
import SellerListings from "../components/seller-dashboard/SellerListings";
import Navbar from "../components/seller-dashboard/NavBar";

export default function SellerDashboard() {
  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#F9FAFB",
      padding: "40px",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      justifyContent: "center",
    },
    container: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      flexDirection: "column",
      gap: "30px",
    },
    mainContentGrid: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "30px",
      alignItems: "start",
    },
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.container}>
          <SellerHeader />
          <SellerStats />
          <div style={styles.mainContentGrid}>
            <OrderSection />
            <SellerListings />
          </div>
        </div>
      </div>
    </>
  );
}
