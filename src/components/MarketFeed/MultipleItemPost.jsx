import { useState } from "react";

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
      avatar: profileIcon
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
      comments: 3
    }
  };

  const [bookmarked, setBookmarked] = useState(false);
  const [upvotes, setUpvotes] = useState(mockData.post.upvotes);
  const [downvotes, setDownvotes] = useState(0);
  const [comments, setComments] = useState(mockData.post.comments);

  const handleUpvote = () => setUpvotes(upvotes + 1);
  const handleDownvote = () => setDownvotes(downvotes + 1);
  const handleCommentClick = () => alert("modal tol");

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "560px",
        background: "#ffffff",
        padding: "18px",
        borderRadius: "12px",
        border: "1px solid #e6e6e6",
        fontFamily: "Sen, sans-serif",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
        position: "absolute",
        left: "392px",
        top: "270px"
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center"
          }}
        >
          <img
            src={mockData.user.avatar}
            alt="User"
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "999px"
            }}
          />

          <div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "15px"
                }}
              >
                {mockData.user.name}
              </span>

              <span
                style={{
                  fontSize: "12px",
                  color: "gray"
                }}
              >
                {" • "}
                {mockData.user.yearCourse}
              </span>
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "gray"
              }}
            >
              {mockData.post.timestamp} • {mockData.user.location}
            </div>

          </div>
        </div>

        <button
          onClick={() => setBookmarked(!bookmarked)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer"
          }}
        >
          <img
            src={bookmarkIcon}
            alt="Bookmark"
            style={{
              width: "16px",
              opacity: bookmarked ? 1 : 0.4
            }}
          />
        </button>
      </div>

      <div
        style={{
          margin: "14px 0",
          fontSize: "15px"
        }}
      >
        {mockData.post.description}
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "530px",
          background: "#ffffff",
          padding: "14px",
          borderRadius: "12px",
          border: "1px solid #cdced0",
          fontFamily: "Sen, sans-serif",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            background: "#ffca28",
            width: "fit-content",
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "12px",
            color: "#000000",
            marginBottom: "10px"
          }}
        >
          {mockData.post.category}
        </div>

        <img
          src={mockData.post.image}
          alt="Item"
          style={{
            width: "100%",
            borderRadius: "10px",
            marginBottom: "10px"
          }}
        />

        <div
          style={{
            background: "#2d46a8",
            color: "#ffca28",
            width: "fit-content",
            padding: "6px 12px",
            borderRadius: "6px",
            marginBottom: "5px",
            fontSize: "18px",
            fontWeight: "bold",
            fontFamily: "Sen, sans-serif"
          }}
        >
          ₱{mockData.post.price}.00 / {mockData.post.item}
        </div>

        <div
          style={{
            fontWeight: 600,
            marginBottom: "14px"
          }}
        >
          {mockData.post.title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "-4px",
            marginBottom: "6px"
          }}
        >
          <button
            style={{
              width: "67%",
              height: "38px",
              background: "#2d46a8",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "Sen, sans-serif"
            }}
          >
            Order Item
          </button>

          <button
            style={{
              width: "30%",
              height: "38px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              background: "white",
              color: "#3b5bdb",
              border: "2px solid #d0d4e0",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 600,
              fontFamily: "Sen, sans-serif"
            }}
          >
            <img src={chatIcon} alt="Chat" />
            Chat
          </button>
        </div>

        <div
          style={{
            fontSize: "11px",
            textAlign: "center",
            marginTop: "5px",
            color: "gray"
          }}
        >
          Stocks reserved automatically. Pay on meetup.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "8px",
          fontSize: "14px",
          color: "#555"
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <img
            src={CountVotes}
            alt="Count"
            style={{
              width: "16px",
              height: "16px",
              objectFit: "contain"
            }}
          />
          {upvotes} upvotes
        </span>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          {comments} comments
        </span>
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #ddd"
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 40px 0"
        }}
      >
        <button
          onClick={handleUpvote}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "16px",
            color: "#444"
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          <img
            src={upvoteIcon}
            alt="Upvote"
            style={{
              width: "20px"
            }}
          />
          Upvote
        </button>

        <button
          onClick={handleDownvote}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "16px",
            color: "#444"
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          <img
            src={downvoteIcon}
            alt="Downvote"
            style={{
              width: "20px"
            }}
          />
          Downvote
        </button>

        <button
          onClick={handleCommentClick}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "16px",
            color: "#444"
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          <img
            src={commentIcon}
            alt="Comments"
            style={{
              width: "20px"
            }}
          />
          Comment
        </button>
      </div>
    </div>
  );
}
