import UserSidebar from "../components/UserProfileEdit/UserSidebar";
import UserBanner from "../components/UserProfileEdit/UserBanner";
import UserInfoEdit from "../components/UserProfileEdit/UserInfoEdit"; // ✅ ADD THIS

function UserProfileEdit() {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
      }}
    >
      {/* USER BANNER WITH 270PX PADDING */}
      <div
        style={{
          paddingLeft: "270px",
          paddingTop: "40px",
          boxSizing: "border-box",
        }}
      >
        <UserBanner />
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          paddingLeft: "270px", // sidebar is 270px from the left
          paddingTop: "35px",   // 35px lower than the banner
          boxSizing: "border-box",
        }}
      >
        {/* LEFT SIDEBAR */}
        <div style={{ marginRight: "30px" }}>
          <UserSidebar />
        </div>

        {/* RIGHT CONTENT */}
        <div style={{ flex: 1 }}>

          {/* ✅ INSERTED USER INFO EDIT PANEL */}
          <UserInfoEdit />

        </div>
      </div>
    </div>
  );
}

export default UserProfileEdit;
