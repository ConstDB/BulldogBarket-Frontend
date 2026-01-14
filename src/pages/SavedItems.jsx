import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import SavedItemCard from "../components/SavedItems/SavedItemCard";
import "../styles/SavedItems/SavedItems.css";

export default function SavedItems() {
  const navigate = useNavigate();

  // start with mock data while offline / before backend responds
  const [savedItems, setSavedItems] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    fetchSavedItems();
  }, []);

  async function fetchSavedItems() {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const url = `${API_BASE}/api/v1/users/saved-listings`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || "Failed to fetch saved items");
      }

      const data = await res.json();

      // Expecting an array of saved item objects matching the mock structure
      if (Array.isArray(data) && data.length > 0) {
        setSavedItems(data);
      } else if (Array.isArray(data)) {
        setSavedItems(data);
      } else {
        // If backend returns an object wrapper, try to extract
        setSavedItems(data.saved || data.items || []);
      }
    } catch (err) {
      setError(err?.message || "Unable to load saved items");
      // keep mock items as fallback
    } finally {
      setLoading(false);
    }
  }

  // Remove both locally and on server
  const handleRemove = async (listingId) => {
    // optimistic update: remove locally first
    const prev = savedItems;
    const updatedList = savedItems.filter(
      (item) => item.listing._id !== listingId
    );
    setSavedItems(updatedList);

    try {
      const token = localStorage.getItem("token");
      // backend expects saved-listings under users namespace
      const url = `${API_BASE}/api/v1/users/saved-listings/${listingId}`;

      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || "Failed to remove saved item on server");
      }

      // success; no further action needed
    } catch (err) {
      // rollback on failure
      setSavedItems(prev);
      setError(err?.message || "Failed to remove item");
    }
  };

  return (
    <div className="saved-items-page">
      <div className="saved-header-bg">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>
        <span className="page-title">Saved Items</span>
      </div>

      {/* Main Content Area */}
      <div className="saved-content">
        <div className="list-header">
          <h2>Your Watchlist ({savedItems.length})</h2>
          <p className="list-subtitle">Items you've bookmarked for later.</p>
        </div>

        {error && (
          <div style={{ color: "#DC2626", marginBottom: 12 }}>{error}</div>
        )}

        {loading && (
          <div style={{ color: "#64748B", marginBottom: 12 }}>
            Loading saved items...
          </div>
        )}

        {/* Dynamic Grid: Maps through your data array */}
        <div className="saved-grid">
          {savedItems.map((item, index) => (
            <SavedItemCard
              key={item.listing?._id || index}
              data={item}
              onRemove={handleRemove}
            />
          ))}
        </div>

        {/* Empty State Message */}
        {!loading && savedItems.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "#6B7280",
              marginTop: "50px",
              fontSize: "1.1rem",
            }}
          >
            Your watchlist is empty.{" "}
            <Link to="/" style={{ color: "#2A3B8F", fontWeight: "bold" }}>
              Browse items
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
