import React, { useState } from "react";
import "../../styles/PostProduct/ListingTypeSelector.css";
import burgerIcon from "../../assets/burger.svg";
import shirtIcon from "../../assets/shirt.svg";
import listingIcon from "../../assets/listingType.svg";

export default function ListingTypeSelector() {
  const [type, setType] = useState("single");

  return (
    <div className="listing-selector">
      <div className="listing-selector-header">
        <img src={listingIcon} alt="listing type" />
        Listing Type
      </div>

      <div className="listing-selector-cards">
        <div
          className={`listing-card ${type === "single" ? "active" : ""}`}
          onClick={() => setType("single")}
        >
          <img src={shirtIcon} alt="shirt" />
          <div className="listing-card-title">Single Item</div>
          <div className="listing-card-desc">
            Unique items like uniforms, books, or old gadgets.
          </div>
          <div className="listing-card-type request">REQUEST WORKFLOW</div>
        </div>

        <div
          className={`listing-card ${type === "bulk" ? "active" : ""}`}
          onClick={() => setType("bulk")}
        >
          <img src={burgerIcon} alt="burger" />
          <div className="listing-card-title">Bulk / Food</div>
          <div className="listing-card-desc">
            Items with multiple stocks like graham balls, pins.
          </div>
          <div className="listing-card-type instant">INSTANT ORDER</div>
        </div>
      </div>
    </div>
  );
}
