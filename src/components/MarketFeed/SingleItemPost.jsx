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

export default function SingleItemPost() {
  const mockData = {
    user: {
      name: "Rodrigo",
      yearCourse: "3rd year BSCS-DF",
      location: "NU Manila",
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

  const [bookmarked, setBookmarked] = useState(false);
  const [upvotes, setUpvotes] = useState(mockData.post.upvotes);
  const [downvotes, setDownvotes] = useState(0);
  const [comments, setComments] = useState(mockData.post.comments);

  return (
    <div className="sip-container">
      <div className="sip-user-row">
        <div className="sip-user-info">
          <img src={mockData.user.avatar} className="sip-avatar" />

          <div>
            <div className="sip-user-name">
              <span className="sip-name">{mockData.user.name}</span>
              <span className="sip-year">{` • ${mockData.user.yearCourse}`}</span>
            </div>

            <div className="sip-meta">
              {mockData.post.timestamp} • {mockData.user.location}
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

      <div className="sip-description">{mockData.post.description}</div>

      <div className="sip-item-box">
        <div className="sip-category">{mockData.post.category}</div>

        <img src={mockData.post.image} className="sip-item-img" />

        <div className="sip-price">₱{mockData.post.price}.00</div>

        <div className="sip-title">{mockData.post.title}</div>

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

      <hr className="sip-divider" />

      <div className="sip-actions">
        <button className="sip-action-btn" onClick={() => setUpvotes(upvotes + 1)}>
          <img src={upvoteIcon} className="sip-action-icon" /> Upvote
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
