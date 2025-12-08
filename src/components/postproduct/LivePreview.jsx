import React from "react";
import "../../styles/PostProduct/livePreview.css";
import ImageCarousel from "./ImageCarousel";

export default function LivePreview({
  userName = "Duterte (You)",
  userLocation = "NU Manila",
  timestamp = "Just Now",
  avatarUrl = "https://placehold.co/40x40",
  itemName = "Item Title", // <-- changed from itemTitle
  description = "Describe your item...",
  price = 0,
  category = "Pre-loved",
  itemImages = []
}) {
  return (
    <div className="livePreview">
      <div className="lp-card" />

      <img className="lp-avatar" src={avatarUrl} alt="user" />

      <div className="lp-username">{userName}</div>
      <div className="lp-meta">
        {timestamp} • {userLocation}
      </div>

      <div className="lp-description">{description}</div>

      <div className="lp-carousel">
        <ImageCarousel itemImages={itemImages} />
      </div>

      <div className="lp-cat-bg"></div>
      <div className="lp-cat-label">Category</div>

      <div className="lp-cat2-bg"></div>
      <div className="lp-cat2-label">{category}</div>

      <div className="lp-price-bg"></div>
      <div className="lp-price-label">₱{price}</div>

      <div className="lp-action-bg"></div>
      <div className="lp-action-title">{itemName}</div> {/* <-- changed from itemTitle */}

      <div className="lp-action-btn-bg"></div>
      <div className="lp-action-btn-label">Action Button</div>
    </div>
  );
}
