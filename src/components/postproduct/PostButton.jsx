import React from "react";
import "../../styles/PostProduct/postListing.css";

export default function PostButton({ onClick }) {
  return (
    <button onClick={onClick} className="post-button">
      Post Listing
    </button>
  );
}
