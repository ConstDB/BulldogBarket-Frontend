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

export default function MultipleItemPost() {
  const mockData = {
    user: {
      name: "Marcos",
      yearCourse: "5th year BS Chemical Engineering",
      location: "NU Moa",
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

  const [bookmarked, setBookmarked] = useState(false);
  const [upvotes, setUpvotes] = useState(mockData.post.upvotes);
  const [downvotes, setDownvotes] = useState(0);
  const [comments, setComments] = useState(mockData.post.comments);

  const handleUpvote = () => setUpvotes(upvotes + 1);
  const handleDownvote = () => setDownvotes(downvotes + 1);
  const handleCommentClick = () => alert("modal tol");

  return (
    <div className="mip-container">

      <div className="mip-user-row">
        <div className="mip-user-info">
          <img src={mockData.user.avatar} alt="User" className="mip-avatar" />

          <div>
            <div className="mip-user-name">
              <span className="mip-name">{mockData.user.name}</span>
              <span className="mip-year"> • {mockData.user.yearCourse}</span>
            </div>

            <div className="mip-meta">
              {mockData.post.timestamp} • {mockData.user.location}
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

      <div className="mip-description">{mockData.post.description}</div>

      <div className="mip-item-box">
        <div className="mip-category">{mockData.post.category}</div>

        <img src={mockData.post.image} alt="Item" className="mip-item-img" />

        <div className="mip-price">
          ₱{mockData.post.price}.00 / {mockData.post.item}
        </div>

        <div className="mip-title">{mockData.post.title}</div>

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

      <hr className="mip-divider" />

      <div className="mip-actions">
        <button className="mip-action-btn" onClick={handleUpvote}>
          <img src={upvoteIcon} alt="Upvote" className="mip-action-icon" />
          Upvote
        </button>

        <button className="mip-action-btn" onClick={handleDownvote}>
          <img src={downvoteIcon} alt="Downvote" className="mip-action-icon" />
          Downvote
        </button>

        <button className="mip-action-btn" onClick={handleCommentClick}>
          <img src={commentIcon} alt="Comments" className="mip-action-icon" />
          Comment
        </button>
      </div>
    </div>
  );
}
