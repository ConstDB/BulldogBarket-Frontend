import { useState } from "react";
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
import BulkOrderModal from "./BulkOrderModal";
 
const API_BASE = "http://127.0.0.1:3000/api/v1";
 
export default function MultipleItemPost({ post }) {
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
 
  const {modals, open, close} = useModalManager();
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
 
  const handleCommentClick = () => alert("modal tol");

  
 
  return (
    <div className="mip-container">
 
      <div className="mip-user-row">
        <div className="mip-user-info">
          <img src={listing.seller?.avatarUrl || profileIcon} alt="User" className="mip-avatar" />
 
          <div>
            <div className="mip-user-name">
              <span className="mip-name">{listing.seller?.name || "User"}</span>
              <span className="mip-year"> • {listing.seller?.yearLevel || ""} {listing.seller?.course || ""}</span>
            </div>
 
            <div className="mip-meta">
              {listing.seller?.campus || "NU Manila"}
            </div>
          </div>
        </div>
 
        <button
          onClick={() => setBookmarked(!bookmarked)}
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
        <div className="mip-category">{listing.category}</div>
 
        <img src={listing.images?.[0] || foodImage} alt="Item" className="mip-item-img" />
 
        <div className="mip-price">
          ₱{listing.price || 0}.00 / piece
        </div>
 
        <div className="mip-title">{listing.name}</div>
 
        <div className="mip-buttons">
          <button className="mip-request-btn"
            onClick={() => open("order")} >Order Item</button>
 
          <button className="mip-chat-btn">
            <img src={chatIcon} alt="Chat" />
            Chat
          </button>
        </div>
 
        <div className="mip-note">
          Stocks reserved automatically. Pay on meetup.
        </div>
      </div>
 
      <div className="mip-stats">
        <span className="mip-stat">
          <img src={CountVotes} alt="Count" className="mip-stat-icon" />
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
        >
          <img src={upvoteIcon} alt="Upvote" className="mip-action-icon" />
          {actionLoading ? "..." : "Upvote"}
        </button>
 
        <button className="mip-action-btn" onClick={() => setDownvotes(downvotes + 1)}>
          <img src={downvoteIcon} alt="Downvote" className="mip-action-icon" />
          Downvote
        </button>
 
        <button className="mip-action-btn" onClick={handleCommentClick}>
          <img src={commentIcon} alt="Comments" className="mip-action-icon" />
          Comment
        </button>
      </div>
      {modals.order && <BulkOrderModal onClose={() => close("order")} listing={post}/>}
    </div>
  );
}