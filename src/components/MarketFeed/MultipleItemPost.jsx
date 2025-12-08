import { useState } from "react";
import "../../styles/MarketFeed/MultipleItemPost.css";
import { NU_CAMPUSES, NU_COURSES, NU_YEAR_LEVELS } from "../../constants/nuConstants";

import bookmarkIcon from "../../assets/bookmarks.svg";
import upvoteIcon from "../../assets/upvote.svg";
import downvoteIcon from "../../assets/downvote.svg";
import commentIcon from "../../assets/comment.svg";
import chatIcon from "../../assets/chat.svg";
import CountVotes from "../../assets/countvotes.svg";
import profileIcon from "../../assets/profileicon.svg";
import foodImage from "../../assets/food.svg";

const mockData = {
  user: {
    name: "Marcos",
    yearCourse: `${NU_COURSES[15]} • ${NU_YEAR_LEVELS[4]}`,
    location: NU_CAMPUSES[2],
    avatar: profileIcon,
  },
  post: {
    timestamp: "4 hrs ago",
    category: "Snacks",
    price: 50,
    item: "box",
    title: "Homemade Graham Balls (5 pcs)",
    description:
      "Fresh batch of Graham Balls just dropped! Also selling ID laces. Meetup agad sa garden",
    image: foodImage,
    upvotes: 12,
    comments: 3,
  },
};

export default function MultipleItemPost({ post = mockData.post, user = mockData.user }) {
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
    <div className="mip-container">

      <div className="mip-user-row">
        <div className="mip-user-info">
          <img src={user.avatar || profileIcon} alt="User" className="mip-avatar" />

          <div>
            <div className="mip-user-name">
              <span className="mip-name">{user.name || "User"}</span>
              <span className="mip-year"> • {user.yearCourse || ""}</span>
            </div>

            <div className="mip-meta">
              {post.timestamp || "just now"} • {user.location || ""}
            </div>
          </div>
        </div>

        <button
          onClick={() => handleAction("bookmark")}
          className="mip-bookmark-btn"
          disabled={actionLoading === "bookmark"}
        >
          <img
            src={bookmarkIcon}
            alt="Bookmark"
            className="mip-bookmark-icon"
            style={{ opacity: bookmarked ? 1 : 0.4 }}
          />
        </button>
      </div>

      <div className="mip-description">{post.description || ""}</div>

      <div className="mip-item-box">
        <div className="mip-category">{post.category || ""}</div>

        <img src={post.image || foodImage} alt="Item" className="mip-item-img" />

        <div className="mip-price">
          ₱{post.price || 0}.00 / {post.item || "item"}
        </div>

        <div className="mip-title">{post.title || ""}</div>

        <div className="mip-buttons">
          <button className="mip-request-btn">Order Item</button>

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
          {upvotes} upvotes
        </span>

        <span className="mip-stat">{comments} comments</span>
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
          onClick={() => handleAction("upvote")}
          disabled={actionLoading === "upvote"}
        >
          <img src={upvoteIcon} alt="Upvote" className="mip-action-icon" />
          {actionLoading === "upvote" ? "..." : "Upvote"}
        </button>

        <button 
          className="mip-action-btn" 
          onClick={() => handleAction("downvote")}
          disabled={actionLoading === "downvote"}
        >
          <img src={downvoteIcon} alt="Downvote" className="mip-action-icon" />
          {actionLoading === "downvote" ? "..." : "Downvote"}
        </button>

        <button 
          className="mip-action-btn" 
          onClick={() => handleAction("comment")}
          disabled={actionLoading === "comment"}
        >
          <img src={commentIcon} alt="Comments" className="mip-action-icon" />
          {actionLoading === "comment" ? "..." : "Comment"}
        </button>
      </div>
    </div>
  );
}
