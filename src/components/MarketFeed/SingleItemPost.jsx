import { useState } from "react";
import "../../styles/MarketFeed/SingleItemPost.css";
import { NU_CAMPUSES, NU_COURSES, NU_YEAR_LEVELS } from "../../constants/nuConstants";

import bookmarkIcon from "../../assets/bookmarks.svg";
import upvoteIcon from "../../assets/upvote.svg";
import downvoteIcon from "../../assets/downvote.svg";
import commentIcon from "../../assets/comment.svg";
import chatIcon from "../../assets/chat.svg";
import CountVotes from "../../assets/countvotes.svg";
import profileIcon from "../../assets/profileicon.svg";
import itemImage from "../../assets/item.svg";

const mockData = {
  user: {
    name: "Rodrigo",
    yearCourse: `${NU_COURSES[4]} • ${NU_YEAR_LEVELS[2]}`,
    location: NU_CAMPUSES[0],
    avatar: profileIcon,
  },
  post: {
    timestamp: "2 hrs ago",
    category: "Uniform",
    price: 350,
    title: "NU PE Uniform - Medium",
    description:
      "Selling my old PE Uniform. Good condition, used only for one term. Size medium. Meetup at Garden tomorrow!",
    image: itemImage,
    upvotes: 12,
    comments: 3,
  },
};

export default function SingleItemPost({ post = mockData.post, user = mockData.user }) {
  const [bookmarked, setBookmarked] = useState(post.bookmarked || false);
  const [upvotes, setUpvotes] = useState(post.upvotes || 0);
  const [downvotes, setDownvotes] = useState(post.downvotes || 0);
  const [comments, setComments] = useState(post.comments || 0);
  const [actionLoading, setActionLoading] = useState(null);
  const [actionError, setActionError] = useState(null);

  async function handleAction(action) {
    setActionLoading(action);
    setActionError(null);

    try {
      const res = await fetch(`/api/posts/${post.id}/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Action failed: ${res.status}`);
      }

      const data = await res.json();
      if (action === "upvote") setUpvotes(data.upvotes || upvotes + 1);
      if (action === "downvote") setDownvotes(data.downvotes || downvotes + 1);
      if (action === "bookmark") setBookmarked(!bookmarked);
    } catch (err) {
      setActionError(err?.message || "Action failed");
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <div className="sip-container">
      <div className="sip-user-row">
        <div className="sip-user-info">
          <img src={user.avatar || profileIcon} className="sip-avatar" />

          <div>
            <div className="sip-user-name">
              <span className="sip-name">{user.name || "User"}</span>
              <span className="sip-year">{` • ${user.yearCourse || ""}`}</span>
            </div>

            <div className="sip-meta">
              {post.timestamp || "just now"} • {user.location || ""}
            </div>
          </div>
        </div>

        <button 
          className="sip-bookmark-btn" 
          onClick={() => handleAction("bookmark")}
          disabled={actionLoading === "bookmark"}
        >
          <img
            src={bookmarkIcon}
            className="sip-bookmark-icon"
            style={{ opacity: bookmarked ? 1 : 0.4 }}
          />
        </button>
      </div>

      <div className="sip-description">{post.description || ""}</div>

      <div className="sip-item-box">
        <div className="sip-category">{post.category || ""}</div>

        <img src={post.image || itemImage} className="sip-item-img" />

        <div className="sip-price">₱{post.price || 0}.00</div>

        <div className="sip-title">{post.title || ""}</div>

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
          {upvotes} upvotes
        </span>

        <span className="sip-stat">{comments} comments</span>
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
          onClick={() => handleAction("upvote")}
          disabled={actionLoading === "upvote"}
        >
          <img src={upvoteIcon} className="sip-action-icon" /> 
          {actionLoading === "upvote" ? "..." : "Upvote"}
        </button>

        <button 
          className="sip-action-btn" 
          onClick={() => handleAction("downvote")}
          disabled={actionLoading === "downvote"}
        >
          <img src={downvoteIcon} className="sip-action-icon" /> 
          {actionLoading === "downvote" ? "..." : "Downvote"}
        </button>

        <button 
          className="sip-action-btn" 
          onClick={() => handleAction("comment")}
          disabled={actionLoading === "comment"}
        >
          <img src={commentIcon} className="sip-action-icon" /> 
          {actionLoading === "comment" ? "..." : "Comment"}
        </button>
      </div>
    </div>
  );
}
