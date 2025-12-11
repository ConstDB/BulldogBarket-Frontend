import React from "react";
import { FaTrash } from "react-icons/fa";
import "../../styles/SavedItems/SavedItems.css";

export default function SavedItemCard({ data, onRemove }) {
  // Destructure the nested "listing" object from the mock data
  const { listing } = data;
  
  // Logic to determine availability (mock logic: stock > 0 means available)
  const isAvailable = listing.stocks > 0;
  
  return (
    <div className="saved-card">
      {/* Image Area */}
      <div className="card-image-container">
        {/* Use the first image from the array */}
        <img 
          src={listing.images[0]} 
          alt={listing.name} 
          className="card-image" 
        />
        
        {/* Category Badge */}
        <span className="category-badge">{listing.category}</span>

        {/* Sold Out Overlay (Conditional) */}
        {!isAvailable && (
          <span className="sold-out-badge">SOLD OUT</span>
        )}

        {/* Delete Button */}
        <button 
          className="delete-btn" 
          // Pass the listing ID to the remove function
          onClick={() => onRemove(listing._id)}
          title="Remove from watchlist"
        >
          <FaTrash />
        </button>
      </div>

      {/* Details Area */}
      <div className="card-details">
        <div className="card-header">
          <h3 className="card-title">{listing.name}</h3>
          <span className="card-price">₱{listing.price}</span>
        </div>
        
        <p className="card-seller">Seller: {listing.seller.name}</p>

        {/* Status Row */}
        <div className="status-row">
          <span className={`status-badge ${isAvailable ? "available" : "unavailable"}`}>
            {isAvailable ? "Available" : "Unavailable"}
          </span>
          {isAvailable && (
            <span className="stock-count">• {listing.stocks} Stock</span>
          )}
        </div>

        {/* Action Button */}
        <button 
          className={`action-btn ${!isAvailable ? "disabled" : "primary"}`}
          disabled={!isAvailable}
        >
          Order Now
        </button>
      </div>
    </div>
  );
}