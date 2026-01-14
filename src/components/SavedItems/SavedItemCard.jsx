import React from "react";
import { useRef } from "react";
import { FaTrash } from "react-icons/fa";
import "../../styles/SavedItems/SavedItems.css";
import OrderModal from "../../modals/OrderModal";
import RequestModal from "../../modals/RequestModal";
import useModalManager from "@/hooks/useModalManager";

export default function SavedItemCard({ data, onRemove }) {
  // Destructure the nested "listing" object from the mock data
  const { listing } = data;

  // Logic to determine availability (mock logic: stock > 0 means available)
  const isAvailable = listing?.stocks > 0;

  const isBulk = listing?.type === "bulk";
  const { modals, open, close } = useModalManager();

  const requestModalRef = useRef();

  return (
    <div className="saved-card">
      {/* Image Area */}
      <div className="card-image-container">
        {/* Use the first image from the array */}
        <img
          src={listing?.images[0]}
          alt={listing?.name}
          className="card-image"
        />

        {/* Category Badge */}
        <span className="category-badge">{listing?.category}</span>

        {/* Sold Out Overlay (Conditional) */}
        {!isAvailable && <span className="sold-out-badge">SOLD OUT</span>}

        {/* Delete Button */}
        <button
          className="delete-btn"
          // Pass the listing ID to the remove function
          onClick={() => onRemove(listing?._id)}
          title="Remove from watchlist"
        >
          <FaTrash />
        </button>
      </div>

      {/* Details Area */}
      <div className="card-details">
        <div className="card-header">
          <h3 className="card-title">{listing?.name}</h3>
          <span className="card-price">₱{listing?.price}</span>
        </div>

        <p className="card-seller">Seller: {listing?.seller?.name}</p>

        {/* Status Row */}
        <div className="status-row">
          <span
            className={`status-badge ${
              isAvailable ? "available" : "unavailable"
            }`}
          >
            {isAvailable ? "Available" : "Unavailable"}
          </span>
          {isAvailable && (
            <span className="stock-count">• {listing?.stocks} Stock</span>
          )}
        </div>

        {/* Action Button */}

        {isBulk ? (
          <button
            className={`action-btn ${!isAvailable ? "disabled" : "primary"}`}
            disabled={!isAvailable}
            onClick={() => open("order")}
          >
            Order Now
          </button>
        ) : (
          <button
            className={`action-btn ${!isAvailable ? "disabled" : "primary"}`}
            disabled={!isAvailable}
            onClick={() => requestModalRef.current.open()}
          >
            Request Item
          </button>
        )}
      </div>
      {modals.order && (
        <OrderModal onClose={() => close("order")} listing={listing} />
      )}

      <RequestModal ref={requestModalRef} listing={listing} />
    </div>
  );
}
