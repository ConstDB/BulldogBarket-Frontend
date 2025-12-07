import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

export default function SellerListings() {
  // --- MOCK DATA STATE ---
  const [listings, setListings] = useState([
    { 
      id: 1, 
      name: "Graham Balls", 
      stockLabel: "15 stocks", 
      isReserved: false, 
      isActive: true 
    },
    { 
      id: 2, 
      name: "PE Uniform", 
      stockLabel: "Reserved", 
      isReserved: true, 
      isActive: false 
    },
    { 
      id: 3, 
      name: "Computer Science Book", 
      stockLabel: "1 Stock", 
      isReserved: false, 
      isActive: true 
    },
  ]);

  // --- THEME COLORS ---
  const colors = {
    white: "#FFFFFF",
    textDark: "#1F2937",
    textLight: "#6B7280",
    border: "#E5E7EB",
    green: "#10B981",
    orange: "#F59E0B",
    trash: "#9CA3AF",
    bgHover: "#F9FAFB",
  };

  // --- DYNAMIC STYLES OBJECT ---
  const styles = {
    card: {
      backgroundColor: colors.white,
      borderRadius: "16px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
      border: `1px solid ${colors.border}`,
      padding: "24px",
      height: "fit-content",
      width: "100%",
    },
    title: {
      fontSize: "1.1rem",
      fontWeight: "700",
      color: colors.textDark,
      marginBottom: "24px",
    },
    listContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    itemRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    itemGroup: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    imagePlaceholder: {
      width: "48px",
      height: "48px",
      borderRadius: "8px",
      backgroundColor: "#E5E7EB",
      objectFit: "cover",
    },
    textGroup: {
      display: "flex",
      flexDirection: "column",
    },
    itemName: {
      fontSize: "0.95rem",
      fontWeight: "700",
      color: colors.textDark,
      lineHeight: "1.2",
    },
    stockText: (isReserved) => ({
      fontSize: "0.8rem",
      fontWeight: "600",
      marginTop: "4px",
      color: isReserved ? colors.orange : colors.green, 
    }),
    toggleIcon: {
      color: colors.green,
      fontSize: "1.8rem",
      cursor: "pointer",
    },
    trashIcon: {
      color: colors.trash,
      fontSize: "1.1rem",
      cursor: "pointer",
      transition: "color 0.2s",
    },
  };

  // --- ACTIONS (This fixes the 'setListings' unused warning) ---
  
  // 1. Function to Toggle Active Status
  const handleToggle = (id) => {
    const updatedList = listings.map((item) => {
      if (item.id === id) {
        return { ...item, isActive: !item.isActive }; // Flip the active state
      }
      return item;
    });
    setListings(updatedList); // We are now using setListings!
  };

  // 2. Function to Delete an Item
  const handleDelete = (id) => {
    // Filter out the item with the matching ID
    const updatedList = listings.filter((item) => item.id !== id);
    setListings(updatedList); // We are now using setListings!
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>My Active Listings</h3>

      <div style={styles.listContainer}>
        {listings.map((item) => (
          <div key={item.id} style={styles.itemRow}>
            
            {/* Left: Image & Details */}
            <div style={styles.itemGroup}>
              <div style={styles.imagePlaceholder} />
              
              <div style={styles.textGroup}>
                <span style={styles.itemName}>{item.name}</span>
                <span style={styles.stockText(item.isReserved)}>
                  {item.stockLabel}
                </span>
              </div>
            </div>

            {/* Right: Actions */}
            <div>
              {item.isReserved ? (
                // Delete Button
                <FaTrash 
                  style={styles.trashIcon} 
                  title="Delete Listing"
                  onClick={() => handleDelete(item.id)} // Added Click Event
                />
              ) : (
                // Toggle Button
                item.isActive ? (
                  <BsToggleOn 
                    style={styles.toggleIcon} 
                    title="Deactivate"
                    onClick={() => handleToggle(item.id)} // Added Click Event
                  />
                ) : (
                  <BsToggleOff 
                    style={{...styles.toggleIcon, color: colors.textLight}} 
                    onClick={() => handleToggle(item.id)} // Added Click Event
                  />
                )
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}