import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/UserProfileEdit/UserSidebar.css";
import useUserStore from "@/stores/useUserStore";

function UserSidebar() {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  const clearUser = useUserStore((s) => s.clearUser);

  return (
    <div className="sidebar-container">
      <div
        className={`sidebar-item ${active === "purchases" ? "active" : ""}`}
        onClick={() => {
          setActive("purchases");
          navigate("/purchases");
        }}
      >
        My Purchases
      </div>

      <div
        className={`sidebar-item ${active === "seller" ? "active" : ""}`}
        onClick={() => {
          setActive("seller");
          navigate("/seller-dashboard");
        }}
      >
        Seller Dashboard
      </div>

      <div
        className={`sidebar-item ${active === "profile" ? "active" : ""}`}
        onClick={() => {
          setActive("profile");
          navigate("/profile");
        }}
      >
        Edit Profile
      </div>

      <div
        className={`sidebar-item ${active === "security" ? "active" : ""}`}
        onClick={() => {
          setActive("security");
          navigate("/account-security");
        }}
      >
        Account Security
      </div>

      <div
        className={`sidebar-item ${active === "notification" ? "active" : ""}`}
        onClick={() => {
          setActive("notification");
          navigate("/notification");
        }}
      >
        Notification
      </div>

      <div
        className={`sidebar-item logout ${active === "logout" ? "logout-active" : ""}`}
        onClick={clearUser}
      >
        Sign Out
      </div>
    </div>
  );
}

export default UserSidebar;
