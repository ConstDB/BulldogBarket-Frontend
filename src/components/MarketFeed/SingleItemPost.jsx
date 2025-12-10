import { useState } from "react";
import "../../styles/MarketFeed/SingleItemPost.css";
 
import bookmarkIcon from "../../assets/bookmarks.svg";
import upvoteIcon from "../../assets/upvote.svg";
import downvoteIcon from "../../assets/downvote.svg";
import commentIcon from "../../assets/comment.svg";
import chatIcon from "../../assets/chat.svg";
import CountVotes from "../../assets/countvotes.svg";
import profileIcon from "../../assets/profileicon.svg";
import itemImage from "../../assets/item.svg";
 
const API_BASE = "http://127.0.0.1:3000/api/v1";
 
export default function SingleItemPost({ post }) {
  const listing = post;
  const upvoteCount = listing.upvotes?.length || 0;
  const commentCount = listing.comments?.length || 0;
  const listingId = listing._id || listing.id || "";
 
  const [bookmarked, setBookmarked] = useState(false);
  const [upvoted, setUpvoted] = useState(false);
  const [upvotesLocal, setUpvotesLocal] = useState(upvoteCount);
  const [downvotes, setDownvotes] = useState(0);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");
 
  const handleUpvote = async () => {
    try {
      setActionLoading(true);
      setActionError("");
 
      const token = localStorage.getItem("token");
      const method = upvoted ? "DELETE" : "PATCH";
      const url = `${API_BASE}/listings/${listingId}/upvotes`;

      if (!listingId) {
        setActionError("Cannot upvote: missing listing id");
        return;
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
 
      if (res.status === 204 || res.ok) {
        setUpvoted(!upvoted);
        setUpvotesLocal((prev) => (upvoted ? prev - 1 : prev + 1));
      } else {
        const text = await res.text().catch(() => null);
        setActionError(text || "Failed to upvote");
      }
    } catch (err) {
      setActionError(err?.message || "Error upvoting");
    } finally {
      setActionLoading(false);
    }
  };
 
  return (
    <div className="sip-container">
      <div className="sip-user-row">
        <div className="sip-user-info">
          <img src={listing.seller?.avatarUrl || profileIcon} className="sip-avatar" />
 
          <div>
            <div className="sip-user-name">
              <span className="sip-name">{listing.seller?.name || "User"}</span>
              <span className="sip-year">{` • ${listing.seller?.yearLevel || ""} ${listing.seller?.course || ""}`}</span>
            </div>
 
            <div className="sip-meta">
              {listing.seller?.campus || "NU Manila"}
            </div>
          </div>
        </div>
 
        <button className="sip-bookmark-btn" onClick={() => setBookmarked(!bookmarked)}>
          <img
            src={bookmarkIcon}
            className="sip-bookmark-icon"
            style={{ opacity: bookmarked ? 1 : 0.4 }}
          />
        </button>
      </div>
 
      <div className="sip-description">{listing.description}</div>
 
      <div className="sip-item-box">
        <div className="sip-category">{listing.category}</div>
 
        <img src={listing.images?.[0] || itemImage} className="sip-item-img" />
 
        <div className="sip-price">₱{listing.price || 0}.00</div>
 
        <div className="sip-title">{listing.name}</div>
 
        <div className="sip-buttons">
          <button className="sip-request-btn">Request Item</button>
 
          <button className="sip-chat-btn">
            <img src={chatIcon} /> Chat
          </button>
        </div>
 
        <div className="sip-note">Seller approval required for single items.</div>
      </div>
 
      <div className="sip-stats">
        <span className="sip-stat">
          <img src={CountVotes} className="sip-stat-icon" />
          {upvotesLocal} upvotes
        </span>
 
        <span className="sip-stat">{commentCount} comments</span>
      </div>
 
      {actionError && (
        <div style={{ color: "#DC2626", fontSize: 12, marginTop: 8 }}>
          {actionError}
        </div>
      )}
 
      <hr className="sip-divider" />
 
      <div className="sip-actions">
        <button
          className="sip-action-btn"
          onClick={handleUpvote}
          disabled={actionLoading}
        >
          <img src={upvoteIcon} className="sip-action-icon" />
          {actionLoading ? "..." : "Upvote"}
        </button>
 
        <button className="sip-action-btn" onClick={() => setDownvotes(downvotes + 1)}>
          <img src={downvoteIcon} className="sip-action-icon" /> Downvote
        </button>
 
        <button className="sip-action-btn" onClick={() => alert("modal tol")}>
          <img src={commentIcon} className="sip-action-icon" /> Comment
        </button>
      </div>
    </div>
  );
}