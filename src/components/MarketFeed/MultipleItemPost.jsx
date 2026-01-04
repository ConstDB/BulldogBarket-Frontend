import { useState, useEffect } from "react";
import "../../styles/MarketFeed/MultipleItemPost.css";

import bookmarkIcon from "../../assets/bookmarks.svg";
import upvoteIcon from "../../assets/upvote.svg";
import downvoteIcon from "../../assets/downvote.svg";
import commentIcon from "../../assets/comment.svg";
import chatIcon from "../../assets/chat.svg";
import CountVotes from "../../assets/countvotes.svg";
import profileIcon from "../../assets/profileicon.svg";
import foodImage from "../../assets/food.svg";
import useModalManager from "../../hooks/useModalManager";
import BulkOrderModal from "../../modals/OrderModal";
import CommentModal from "../../modals/CommentModal";

const API_BASE = "http://127.0.0.1:3000/api/v1";

export default function MultipleItemPost({ post }) {
  const listing = post;
  const listingId = listing._id;
  const token = localStorage.getItem("token");

  let userId = null;
  if (token) {
    const payloadBase64 = token.split(".")[1]; // get payload part
    const decodedJson = atob(payloadBase64); // decode Base64
    const payload = JSON.parse(decodedJson); // convert to JS object

    const userId = payload["id"];
    console.log(payload);
  }

  const upvoteCount = listing.upvotes?.length || 0;
  const downvoteCount = listing.downvotes?.length || 0;
  const commentCount = listing.comments?.length || 0;

  const [bookmarked, setBookmarked] = useState(listing.isSaved || false);
  const [upvoted, setUpvoted] = useState(listing.upvotes?.includes(userId));
  const [downvoted, setDownvoted] = useState(
    listing.downvotes?.includes(userId)
  );

  const [upvotesLocal, setUpvotesLocal] = useState(upvoteCount);
  const [downvotesLocal, setDownvotesLocal] = useState(downvoteCount);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");

  // Check if listing is already saved
  useEffect(() => {
    const checkIfSaved = async () => {
      const token = localStorage.getItem("token");
      if (!token || !listingId) return;

      try {
        const res = await fetch(`${API_BASE}/users/saved-listings`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const savedListings = await res.json();
          const isSaved = savedListings.some((item) => item._id === listingId);
          setBookmarked(isSaved);
        }
      } catch (err) {
        console.error("Error checking saved status:", err);
      }
    };

    checkIfSaved();
  }, [listingId]);

  // Handle upvote
  const { modals, open, close } = useModalManager();
  
  const handleUpvote = async () => {
    if (!listingId) return setActionError("Missing listing ID");

    try {
      setActionLoading(true);
      setActionError("");
      const token = localStorage.getItem("token");
      const method = upvoted ? "DELETE" : "PATCH";
      const url = `${API_BASE}/listings/${listingId}/upvotes`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) return setActionError("Failed to upvote");

      if (upvoted) {
        setUpvoted(false);
        setUpvotesLocal((p) => p - 1);
      } else {
        setUpvoted(true);
        setUpvotesLocal((p) => p + 1);

        if (downvoted) {
          setDownvoted(false);
          setDownvotesLocal((p) => p - 1);
        }
      }
    } finally {
      setActionLoading(false);
    }
  };

  // Handle downvote
  const handleDownvote = async () => {
    if (!listingId) return setActionError("Missing listing ID");

    try {
      setActionLoading(true);
      setActionError("");
      const token = localStorage.getItem("token");
      const method = downvoted ? "DELETE" : "PATCH";
      const url = `${API_BASE}/listings/${listingId}/upvotes`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) return setActionError("Failed to downvote");

      if (downvoted) {
        setDownvoted(false);
        setDownvotesLocal((p) => p - 1);
      } else {
        setDownvoted(true);
        setDownvotesLocal((p) => p + 1);

        if (upvoted) {
          setUpvoted(false);
          setUpvotesLocal((p) => p - 1);
        }
      }
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Bookmark/Save Listing
  const handleBookmark = async () => {
    if (!listingId) {
      setActionError("Missing listing ID");
      return;
    }

    setActionLoading(true);
    setActionError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setActionError("No token found. Please login.");
      setActionLoading(false);
      return;
    }

    try {
      console.log("Sending bookmark request:", { listingId, bookmarked });

      const res = await fetch(`${API_BASE}/users/saved-listings`, {
        method: bookmarked ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ listingId }),
      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error response:", errorText);
        throw new Error(`Failed to bookmark: ${res.status}`);
      }

      // toggle bookmark state
      setBookmarked(!bookmarked);
    } catch (err) {
      console.error("Bookmark error:", err);
      setActionError(err?.message || "Bookmark failed");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="mip-container">
      <div className="mip-user-row">
        <div className="mip-user-info">
          <img
            src={listing.seller?.avatarUrl || profileIcon}
            alt="User"
            className="mip-avatar"
          />
          <div>
            <div className="mip-user-name">
              <span className="mip-name">{listing.seller?.name || "User"}</span>
              <span className="mip-year">
                • {listing.seller?.yearLevel || ""}{" "}
                {listing.seller?.course || ""}
              </span>
            </div>
            <div className="mip-meta">
              {listing.seller?.campus || "NU Manila"}
            </div>
          </div>
        </div>

        <button
          onClick={handleBookmark}
          disabled={actionLoading}
          className="mip-bookmark-btn"
        >
          <img
            src={bookmarkIcon}
            alt="Bookmark"
            className="mip-bookmark-icon"
            style={{ opacity: bookmarked ? 1 : 0.4 }}
          />
        </button>
      </div>

      <div className="mip-description">{listing.description}</div>

      <div className="mip-item-box">
        <div className="mip-image-wrapper">
          <div className="mip-category">{listing.category}</div>
          <img
            src={listing.images?.[0] || foodImage}
            alt="Item"
            className="mip-item-img"
          />
          <div className="mip-price">₱{listing.price || 0}.00 / piece</div>
        </div>
        
        <div className="mip-title">{listing.name}</div>

        <div className="mip-buttons">
          <button className="mip-request-btn" onClick={() => open("order")}>
            Order Item
          </button>

          <button className="mip-chat-btn">
            <img src={chatIcon} alt="Chat" /> Chat
          </button>
        </div>

        <div className="mip-note">
          Stocks reserved automatically. Pay on meetup.
        </div>
      </div>

      <div className="mip-stats">
        <span className="mip-stat">
          <img src={CountVotes} alt="Count" className="mip-stat-icon" />{" "}
          {upvotesLocal} upvotes
        </span>

        <span className="mip-stat">{commentCount} comments</span>
      </div>

      {actionError && (
        <div style={{ color: "#DC2626", fontSize: 12, marginTop: 8 }}>
          {actionError}
        </div>
      )}

      <hr className="mip-divider" />

      <div className="mip-actions">
        <button
          className="mip-action-btn"
          onClick={handleUpvote}
          disabled={actionLoading}
          style={{ opacity: upvoted ? 1 : 0.6 }}
        >
          <img src={upvoteIcon} alt="Upvote" className="mip-action-icon" />
          Upvote
        </button>

        <button
          className="mip-action-btn"
          onClick={handleDownvote}
          disabled={actionLoading}
          style={{ opacity: downvoted ? 1 : 0.6 }}
        >
          <img src={downvoteIcon} alt="Downvote" className="mip-action-icon" />
          Downvote
        </button>

        <button className="mip-action-btn" onClick={() => open("comment")}>
          <img src={commentIcon} alt="Comment" className="mip-action-icon" />{" "}
          Comment{" "}
        </button>
      </div>
      
      {modals.order && (
        <BulkOrderModal onClose={() => close("order")} listing={listing} />
      )}
      {modals.comment && (
        <CommentModal onClose={() => close("comment")} listing={listing} />
      )}
    </div>
  );
}