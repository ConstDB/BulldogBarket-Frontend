import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import SavedItemCard from "../components/SavedItems/SavedItemCard";
import "../styles/SavedItems/SavedItems.css";

export default function SavedItems() {
  const navigate = useNavigate();

  // start with mock data while offline / before backend responds
  const [savedItems, setSavedItems] = useState([
    {
      listing: {
        _id: "6935b2b7cdcc1bec7f563ca5",
        seller: { _id: "693428c5fdbfd10f55b2cfad", name: "Rj Silagan" },
        type: "bulk",
        name: "NU ID Lace",
        images: [
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3.amazonaws.com%2Fimages.ecwid.com%2Fimages%2F26273031%2F1377812301.jpg&f=1&nofb=1&ipt=3987cea91d3c720c7dd5b3e95f87c905784b35548c7c132d03d025d54ed3a988",
        ],
        price: 120,
        category: "Accessories",
        stocks: 50,
      },
      createdAt: "2025-12-09T17:32:05.788Z",
    },
    {
      listing: {
        _id: "69385eabe0f11e88240f4266",
        seller: { _id: "69385defe0f11e88240f4255", name: "EdrIch Santuyo" },
        type: "bulk",
        name: "OLFU ID Lace",
        images: [
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3.amazonaws.com%2Fimages.ecwid.com%2Fimages%2F26273031%2F1377812301.jpg&f=1&nofb=1&ipt=3987cea91d3c720c7dd5b3e95f87c905784b35548c7c132d03d025d54ed3a988",
        ],
        price: 120,
        category: "Accessories",
        status: "available",
        stocks: 50,
      },
      createdAt: "2025-12-09T17:39:59.388Z",
    },
  ]);

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

      const url = `${API_BASE}/api/v1/saved`;

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
    const updatedList = savedItems.filter((item) => item.listing._id !== listingId);
    setSavedItems(updatedList);

    try {
      const token = localStorage.getItem("token");
      const url = `${API_BASE}/api/v1/saved/${listingId}`;

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
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">
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
          <div style={{ color: "#64748B", marginBottom: 12 }}>Loading saved items...</div>
        )}

        {/* Dynamic Grid: Maps through your data array */}
        <div className="saved-grid">
          {savedItems.map((item, index) => (
            <SavedItemCard
              key={item.listing._id || index}
              data={item}
              onRemove={handleRemove}
            />
          ))}
        </div>

        {/* Empty State Message */}
        {!loading && savedItems.length === 0 && (
          <p style={{ textAlign: "center", color: "#6B7280", marginTop: "50px", fontSize: "1.1rem" }}>
            Your watchlist is empty. <Link to="/" style={{ color: "#2A3B8F", fontWeight: "bold" }}>Browse items</Link>
          </p>
        )}
      </div>
    </div>
  );
}