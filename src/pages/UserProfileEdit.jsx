import UserSidebar from "../components/UserProfileEdit/UserSidebar";
import UserBanner from "../components/UserProfileEdit/UserBanner";
import UserInfoEdit from "../components/UserProfileEdit/UserInfoEdit";

function UserProfileEdit() {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
      }}
    >

      <div
        style={{
          paddingLeft: "270px",
          paddingTop: "40px",
          boxSizing: "border-box",
        }}
      >
        <UserBanner />
      </div>

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          paddingLeft: "270px",
          paddingTop: "35px", 
          boxSizing: "border-box",
        }}
      >

        <div style={{ marginRight: "30px" }}>
          <UserSidebar />
        </div>

        <div style={{ flex: 1 }}>
          <UserInfoEdit />

        </div>
      </div>
    </div>
  );
}

export default UserProfileEdit;
