import React from "react";
import arrowIcon from "../../assets/LeftArrow.svg";

export default function HeaderBar() {
  return (
    <div style={{
      width: "100%",
      height: 100,
      background: "#35408E",
      display: "flex",
      alignItems: "center",
      paddingLeft: "40px",
      color: "white",
      fontFamily: "Inter",
      fontWeight: 700,
      fontSize: 18
    }}>
        <img src={arrowIcon} alt="back" style={{ width: 16, height: 16, marginRight: 10 }} />
      Create Listing
    </div>
  );
}
