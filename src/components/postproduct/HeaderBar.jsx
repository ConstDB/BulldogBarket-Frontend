import React from "react";
import arrowIcon from "../../assets/LeftArrow.svg";
import "../../styles/PostProduct/header.css";

export default function header() {
  return (
    <div className="header-bar">
      <img src={arrowIcon} alt="back" />
      Create Listing
    </div>
  );
}
