import { useState, useEffect } from "react";
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
  const listingId = listing._id;
  const userId = localStorage.getItem("userId");
 
  const upvoteCount = listing.upvotes?.length || 0;
  const downvoteCount = listing.downvotes?.length || 0;
  const commentCount = listing.comments?.length || 0;
 
  const [bookmarked, setBookmarked] = useState(listing.isSaved || false);
  const [upvoted, setUpvoted] = useState(listing.upvotes?.includes(userId));
  const [downvoted, setDownvoted] = useState(listing.downvotes?.includes(userId));
 
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
          const isSaved = savedListings.some(
            (item) => item.listing._id === listingId
          );
          setBookmarked(isSaved);
        }
      } catch (err) {
        console.error("Error checking saved status:", err);
      }
    };

    checkIfSaved();
  }, [listingId]);
 
  // Handle Upvote
 const handleUpvote = async () => {
  if (!listingId) return setActionError("Missing listing ID");
  setActionLoading(true);
  setActionError("");
 
  const token = localStorage.getItem("token");
 
  try {
    const res = await fetch(`${API_BASE}/listings/${listingId}/upvotes`, {
      method: upvoted ? "DELETE" : "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
 
    if (!res.ok) throw new Error("Failed to upvote");
 
    // update state immediately
    if (upvoted) {
      setUpvoted(false);
      setUpvotesLocal((p) => p - 1);
    } else {
      setUpvoted(true);
      setUpvotesLocal((p) => p + 1);
      // remove downvote if any
      if (downvoted) {
        setDownvoted(false);
        setDownvotesLocal((p) => p - 1);
      }
    }
  } catch (err) {
    setActionError(err?.message || "Upvote failed");
  } finally {
    setActionLoading(false);
  }
};
 
// Downvote as DELETE on upvotes endpoint (current backend design)
const handleDownvote = async () => {
  if (!listingId) return setActionError("Missing listing ID");
  setActionLoading(true);
  setActionError("");
 
  const token = localStorage.getItem("token");
 
  try {
    const res = await fetch(`${API_BASE}/listings/${listingId}/upvotes`, {
      method: downvoted ? "DELETE" : "PATCH", // adjust logic depending on backend
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
 
    if (!res.ok) throw new Error("Failed to downvote");
 
    // toggle state
    if (downvoted) {
      setDownvoted(false);
      setDownvotesLocal((p) => p - 1);
    } else {
      setDownvoted(true);
      setDownvotesLocal((p) => p + 1);
 
      // remove upvote if any
      if (upvoted) {
        setUpvoted(false);
        setUpvotesLocal((p) => p - 1);
      }
    }
  } catch (err) {
    setActionError(err?.message || "Downvote failed");
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
<div className="sip-container">
<div className="sip-user-row">
<div className="sip-user-info">
<img src={listing.seller?.avatarUrl || profileIcon} className="sip-avatar" />
<div>
<div className="sip-user-name">
<span className="sip-name">{listing.seller?.name || "User"}</span>
<span className="sip-year">
                • {listing.seller?.yearLevel || ""} {listing.seller?.course || ""}
</span>
</div>
<div className="sip-meta">{listing.seller?.campus || "NU Manila"}</div>
</div>
</div>
 
        <button className="sip-bookmark-btn" onClick={handleBookmark} disabled={actionLoading}>
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
<img src={CountVotes} className="sip-stat-icon" /> {upvotesLocal} upvotes
</span>
<span className="sip-stat">{commentCount} comments</span>
</div>
 
      {actionError && (
<div style={{ color: "#DC2626", fontSize: 12, marginTop: 8 }}>{actionError}</div>
      )}
 
      <hr className="sip-divider" />
 
      <div className="sip-actions">
<button
          className="sip-action-btn"
          onClick={handleUpvote}
          disabled={actionLoading}
          style={{ opacity: upvoted ? 1 : 0.6 }}
>
<img src={upvoteIcon} className="sip-action-icon" /> Upvote
</button>
 
        <button
          className="sip-action-btn"
          onClick={handleDownvote}
          disabled={actionLoading}
          style={{ opacity: downvoted ? 1 : 0.6 }}
>
<img src={downvoteIcon} className="sip-action-icon" /> Downvote
</button>
 
        <button className="sip-action-btn" onClick={() => alert("Comment modal")}>
<img src={commentIcon} className="sip-action-icon" /> Comment
</button>
</div>
</div>
  );
}