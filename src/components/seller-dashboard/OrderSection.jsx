import React from "react";
import { FaUser, FaBox } from "react-icons/fa";

export default function SellerOrders() {
  // --- THEME COLORS ---
  const colors = {
    white: "#FFFFFF",
    textDark: "#1F2937",    // Dark Grey
    textLight: "#6B7280",   // Light Grey
    border: "#E5E7EB",      // Light Border
    
    // Request Section Colors
    blueHeader: "#EFF6FF",  // Light Blue BG
    blueText: "#1E40AF",    // Dark Blue Text
    blueBadge: "#2563EB",   // Blue Notification Badge
    blueBtn: "#2563EB",     // Accept Button
    
    // Meetup Section Colors
    greenHeader: "#ECFDF5", // Light Green BG
    greenText: "#065F46",   // Dark Green Text
    greenBadge: "#10B981",  // Green Notification Badge
    greenBtn: "#10B981",    // Mark Delivered Button
    
    redText: "#EF4444",     // Buyer No-Show
  };

  // --- DYNAMIC STYLES ---
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "30px", // Space between the two big cards
      width: "100%",
    },
    card: {
      backgroundColor: colors.white,
      borderRadius: "16px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
      border: `1px solid ${colors.border}`,
      overflow: "hidden", // Ensures header respects rounded corners
    },
    
    // --- DYNAMIC HEADER ---
    // We pass colors into this function so we can reuse it for Blue and Green headers
    header: (bgColor, textColor) => ({
      backgroundColor: bgColor,
      color: textColor,
      padding: "16px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: `1px solid ${colors.border}`,
      fontSize: "1rem",
      fontWeight: "700",
    }),
    headerTitle: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    badge: (bgColor) => ({
      backgroundColor: bgColor,
      color: "white",
      borderRadius: "50%",
      width: "24px",
      height: "24px",
      fontSize: "0.75rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
    }),

    // --- ROW ITEMS ---
    row: {
      padding: "24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: `1px solid ${colors.border}`,
    },
    // Removes border for the last item in a list
    rowLast: {
      padding: "24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "none",
    },
    
    // User Info (Left Side)
    userGroup: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    avatar: (color) => ({
      width: "48px",
      height: "48px",
      borderRadius: "50%",
      backgroundColor: color, // Placeholder color
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.2rem",
      color: "rgba(255,255,255,0.8)",
      objectFit: "cover",
    }),
    textGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "2px",
    },
    mainText: {
      fontSize: "0.95rem",
      fontWeight: "700",
      color: colors.textDark,
    },
    subText: {
      fontSize: "0.85rem",
      color: colors.textLight,
      lineHeight: "1.4",
    },
    bold: {
      fontWeight: "700",
      color: colors.textDark,
    },

    // Action Buttons (Right Side)
    actionGroup: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    btnReject: {
      padding: "8px 16px",
      borderRadius: "8px",
      border: `1px solid ${colors.border}`,
      backgroundColor: "white",
      color: colors.textDark,
      fontWeight: "600",
      fontSize: "0.85rem",
      cursor: "pointer",
    },
    btnAccept: {
      padding: "8px 16px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: colors.blueBtn,
      color: "white",
      fontWeight: "600",
      fontSize: "0.85rem",
      cursor: "pointer",
    },
    btnDelivered: {
      padding: "8px 16px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: colors.greenBtn,
      color: "white",
      fontWeight: "600",
      fontSize: "0.85rem",
      cursor: "pointer",
    },
    noShowText: {
      color: colors.redText,
      fontWeight: "700",
      fontSize: "0.85rem",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      
      {/* --- CARD 1: REQUESTS (BLUE) --- */}
      <div style={styles.card}>
        {/* Dynamic Header: Blue */}
        <div style={styles.header(colors.blueHeader, colors.blueText)}>
          <div style={styles.headerTitle}>
            <FaUser /> Requests (Approval Needed)
          </div>
          <div style={styles.badge(colors.blueBadge)}>1</div>
        </div>

        {/* Request Item */}
        <div style={styles.rowLast}>
          <div style={styles.userGroup}>
            {/* Avatar */}
            <div style={styles.avatar("#8B5CF6")}>ES</div> 
            <div style={styles.textGroup}>
              <div style={styles.mainText}>Edrich Darren Santuyo</div>
              <div style={styles.subText}>
                Wants: <span style={styles.bold}>PE Uniform</span>
                <br />
                Meetup: Garden, 2pm today
              </div>
            </div>
          </div>

          <div style={styles.actionGroup}>
            <button style={styles.btnReject}>Reject</button>
            <button style={styles.btnAccept}>Accept Deal</button>
          </div>
        </div>
      </div>


      {/* --- CARD 2: TO MEETUP / SHIP (GREEN) --- */}
      <div style={styles.card}>
        {/* Dynamic Header: Green */}
        <div style={styles.header(colors.greenHeader, colors.greenText)}>
          <div style={styles.headerTitle}>
            <FaBox /> To Meetup / Ship
          </div>
          <div style={styles.badge(colors.greenBadge)}>2</div>
        </div>

        {/* Order Item 1 */}
        <div style={styles.row}>
          <div style={styles.userGroup}>
            <div style={styles.avatar("#F59E0B")}>DM</div>
            <div style={styles.textGroup}>
              <div style={styles.mainText}>Order #7173</div>
              <div style={styles.subText}>
                2x Graham Balls • ₱100
                <br />
                Buyer: Danfred Martin • GCash Paid
              </div>
            </div>
          </div>

          <div style={styles.actionGroup}>
            <span style={styles.noShowText}>Buyer No-Show</span>
            <button style={styles.btnDelivered}>Mark Delivered</button>
          </div>
        </div>

        {/* Order Item 2 */}
        <div style={styles.rowLast}>
          <div style={styles.userGroup}>
            <div style={styles.avatar("#EC4899")}>NA</div>
            <div style={styles.textGroup}>
              <div style={styles.mainText}>Order #193</div>
              <div style={styles.subText}>
                2x Graham Balls • ₱100
                <br />
                Buyer: Nonie Andrew • Cash on Meetup
              </div>
            </div>
          </div>

          <div style={styles.actionGroup}>
            <span style={styles.noShowText}>Buyer No-Show</span>
            <button style={styles.btnDelivered}>Mark Delivered</button>
          </div>
        </div>

      </div>
    </div>
  );
}