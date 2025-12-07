import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserSidebar() {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  const hoverOn = (e) => {
    e.currentTarget.style.background = "#f2f6ff";
    e.currentTarget.style.borderLeft = "4px solid #35408E";
    e.currentTarget.style.color = "#35408E";
  };

  const hoverOff = (e, key) => {
    if (active !== key) {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.borderLeft = "4px solid transparent";
      e.currentTarget.style.color = key === "logout" ? "red" : "#1f2a44";
    }
  };

  return (
    <div
      style={{
        width: "270px",
        height: "265px",
        background: "#ffffff",
        borderRadius: "10px",
        padding: "10px 0",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        fontFamily: "sans-serif",
        border: "1px solid #F3F4F6",
      }}
    >

      <div
        onClick={() => {
          setActive("purchases");
          navigate("/purchases");
        }}
        onMouseEnter={(e) => hoverOn(e)}
        onMouseLeave={(e) => hoverOff(e, "purchases")}
        style={{
          padding: "12px 20px",
          fontSize: "14px",
          fontWeight: "700",
          cursor: "pointer",
          borderLeft: active === "purchases"
            ? "4px solid #3b5bdb"
            : "4px solid transparent",
          background: active === "purchases" ? "#f2f6ff" : "transparent",
          color: active === "purchases" ? "#3b5bdb" : "#1f2a44",
        }}
      >
        My Purchases
      </div>

      <div
        onClick={() => {
          setActive("seller");
          navigate("/seller-dashboard");
        }}
        onMouseEnter={(e) => hoverOn(e)}
        onMouseLeave={(e) => hoverOff(e, "seller")}
        style={{
          padding: "12px 20px",
          fontSize: "14px",
          fontWeight: "700",
          cursor: "pointer",
          borderLeft: active === "seller"
            ? "4px solid #3b5bdb"
            : "4px solid transparent",
          background: active === "seller" ? "#f2f6ff" : "transparent",
          color: active === "seller" ? "#3b5bdb" : "#1f2a44",
        }}
      >
        Seller Dashboard
      </div>

      <div
        onClick={() => {
          setActive("edit");
          navigate("/edit-profile");
        }}
        onMouseEnter={(e) => hoverOn(e)}
        onMouseLeave={(e) => hoverOff(e, "edit")}
        style={{
          padding: "12px 20px",
          fontSize: "14px",
          fontWeight: "700",
          cursor: "pointer",
          borderLeft: active === "edit"
            ? "4px solid #3b5bdb"
            : "4px solid transparent",
          background: active === "edit" ? "#f2f6ff" : "transparent",
          color: active === "edit" ? "#3b5bdb" : "#1f2a44",
        }}
      >
        Edit Profile
      </div>

      <div
        onClick={() => {
          setActive("security");
          navigate("/account-security");
        }}
        onMouseEnter={(e) => hoverOn(e)}
        onMouseLeave={(e) => hoverOff(e, "security")}
        style={{
          padding: "12px 20px",
          fontSize: "14px",
          fontWeight: "700",
          cursor: "pointer",
          borderLeft: active === "security"
            ? "4px solid #3b5bdb"
            : "4px solid transparent",
          background: active === "security" ? "#f2f6ff" : "transparent",
          color: active === "security" ? "#3b5bdb" : "#1f2a44",
        }}
      >
        Account Security
      </div>

      <div
        onClick={() => {
          setActive("notification");
          navigate("/notification");
        }}
        onMouseEnter={(e) => hoverOn(e)}
        onMouseLeave={(e) => hoverOff(e, "notification")}
        style={{
          padding: "12px 20px",
          fontSize: "14px",
          fontWeight: "700",
          cursor: "pointer",
          borderLeft: active === "notification"
            ? "4px solid #3b5bdb"
            : "4px solid transparent",
          background: active === "notification" ? "#f2f6ff" : "transparent",
          color: active === "notification" ? "#3b5bdb" : "#1f2a44",
        }}
      >
        Notification
      </div>

      <div
        onClick={() => {
          setActive("logout");
          navigate("/logout");
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#f2f6ff";
          e.currentTarget.style.borderLeft = "4px solid red";
        }}
        onMouseLeave={(e) => {
          if (active !== "logout") {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderLeft = "4px solid transparent";
          }
        }}
        style={{
          padding: "12px 20px",
          fontSize: "14px",
          fontWeight: "700",
          cursor: "pointer",
          borderLeft: active === "logout"
            ? "4px solid red"
            : "4px solid transparent",
          background: active === "logout" ? "#f2f6ff" : "transparent",
          color: "red",
        }}
      >
        Sign Out
      </div>
    </div>
  );
}

export default UserSidebar;
