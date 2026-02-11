import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

// 1. Import the new CSS file
import "../../styles/SellerDashboard/SellerListings.css";
import { useGetActiveListings } from "@/hooks/useListingApi";

export default function SellerListings() {
  // --- MOCK DATA STATE ---
  const [listings, setListings] = useState([
    {
      id: 1,
      name: "Graham Balls",
      stockLabel: "15 stocks",
      isReserved: false,
      isActive: true,
    },
    {
      id: 2,
      name: "PE Uniform",
      stockLabel: "Reserved",
      isReserved: true,
      isActive: false,
    },
    {
      id: 3,
      name: "Computer Science Book",
      stockLabel: "1 Stock",
      isReserved: false,
      isActive: true,
    },
  ]);
  const { data = [] } = useGetActiveListings();

  // 1. Function to Toggle Active Status
  const handleToggle = (id) => {
    const updatedList = listings.map((item) => {
      if (item.id === id) {
        return { ...item, isActive: !item.isActive };
      }
      return item;
    });
    setListings(updatedList);
  };

  // 2. Function to Delete an Item
  const handleDelete = (id) => {
    const updatedList = listings.filter((item) => item.id !== id);
    setListings(updatedList);
  };

  return (
    <div className="listing-card">
      <h3 className="listing-title">My Active Listings</h3>

      <div className="list-container">
        {data.map((item) => (
          <div key={item.id} className="listing-row">
            {/* Left: Image & Details */}
            <div className="listing-group">
              <div className="listing-img-placeholder" />

              <div className="text-group">
                <span className="item-name">{item.name}</span>
                {/* Dynamic Class for Color: "reserved" or "active" */}
                <span
                  className={`stock-label ${
                    item.status === "reserved" ? "reserved" : "available"
                  }`}
                >
                  {item.stocks} Stocks
                </span>
              </div>
            </div>

            {/* Right: Actions */}
            <div>
              {item.isReserved ? (
                // Delete Button
                <FaTrash
                  className="action-icon icon-trash"
                  title="Delete Listing"
                  onClick={() => handleDelete(item.id)}
                />
              ) : // Toggle Button
              item.isActive ? (
                <BsToggleOn
                  className="action-icon icon-toggle-on"
                  title="Deactivate"
                  onClick={() => handleToggle(item.id)}
                />
              ) : (
                <BsToggleOff
                  className="action-icon icon-toggle-off"
                  onClick={() => handleToggle(item.id)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
