import { useState } from "react";
import "../styles/SingleItemPost.css";

import bookmarkIcon from "../assets/bookmarks.svg";
import upvoteIcon from "../assets/upvote.svg";
import downvoteIcon from "../assets/downvote.svg";
import commentIcon from "../assets/comment.svg";
import chatIcon from "../assets/chat.svg";
import CountVotes from "../assets/countvotes.svg";
import profileIcon from "../assets/profileicon.svg";
import itemImage from "../assets/item.svg";

export default function SingleItemPost() {
// Mock backend-style data
const mockData = {
    user: {
      name: "Rodrigo",
      yearCourse: "3rd year BSCS-DF",
      location: "NU Manila",
      avatar: profileIcon
    },
    post: {
      timestamp: "2 hrs ago",
      category: "Uniform",
      price: 350,
      title: "NU PE Uniform - Medium",
      description:
        "Selling my old PE Uniform. Good condition, used only for one term. Size medium. Meetup at Garden tomorrow! Putanginamoooo",
      image: itemImage,
      upvotes: 12,
      comments: 3
    }
};

const [bookmarked, setBookmarked] = useState(false);

const [upvotes, setUpvotes] = useState(mockData.post.upvotes);
const [downvotes, setDownvotes] = useState(0);
const [comments, setComments] = useState(mockData.post.comments);

const handleUpvote = () => {
    setUpvotes(upvotes + 1);
};

const handleDownvote = () => {
    setDownvotes(downvotes + 1);
};

const handleCommentClick = () => {
    alert("modal tol");
};

return (
    <div className="postcard-container">

    <div className="postcard-header">
        <div className="postcard-user-left">
        <img src={mockData.user.avatar} alt="User" className="postcard-avatar" />

        <div className="postcard-user-text">

        <div className="postcard-user-header">
            <span className="postcard-username">{mockData.user.name}</span>
            <span className="postcard-yearcourse"> • {mockData.user.yearCourse}</span>
        </div>

        <div className="postcard-subinfo">
            {mockData.post.timestamp} • {mockData.user.location}
        </div>

        </div>

        </div>

        <button
          className="postcard-bookmark-btn"
          onClick={() => setBookmarked(!bookmarked)}
        >
        <img
            src={bookmarkIcon}
            alt="Bookmark"
            className={`postcard-bookmark ${bookmarked ? "active" : ""}`}
          />
        </button>
    </div>

    <div className="postcard-description">{mockData.post.description}</div>

<div className="postcard-card-container">
    <div className="postcard-tag">{mockData.post.category}</div>

    <img src={mockData.post.image} alt="Item" className="postcard-image" />

    <div className="postcard-price">₱{mockData.post.price}.00</div>

    <div className="postcard-item-title">{mockData.post.title}</div>

    <div className="postcard-actions-inline">
        <button className="postcard-request-btn">Request Item</button>

        <button className="postcard-chat-btn">
            <img src={chatIcon} alt="Chat" />
            Chat
        </button>
    </div>


    <div className="postcard-subnote">
    Seller approval required for single items.
    </div>
</div>
<div className="postcard-count-row">
  <span className="count-item">
    <img src={CountVotes} className="count-icon" alt="Count" />
    {upvotes} upvotes
  </span>

  <span className="count-item">
    {comments} comments
  </span>
</div>

    <hr className="postcard-divider" />

    <div className="postcard-footer">

        <button className="footer-action-btn" onClick={handleUpvote}>
          <img src={upvoteIcon} className="footer-btn" alt="Upvote" />
          Upvote
        </button>

        <button className="footer-action-btn" onClick={handleDownvote}>
          <img src={downvoteIcon} className="footer-btn" alt="Downvote" />
          Downvote
        </button>

        <button className="footer-action-btn" onClick={handleCommentClick}>
          <img src={commentIcon} className="footer-btn" alt="Comments" />
          Comment
        </button>

        </div>
    </div>
    );
}
