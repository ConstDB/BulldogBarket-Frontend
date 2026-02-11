import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import UserSidebar from "../components/UserProfileEdit/UserSidebar";
import UserBanner from "../components/UserProfileEdit/UserBanner";
import UserInfoEdit from "../components/UserProfileEdit/UserInfoEdit";
import { useFetchProfileQuery } from "@/hooks/useFetchProfileQuery";
import Loading from "@/components/Loading";
import "../styles/SavedItems/SavedItems.css";

function UserProfileEdit() {
  const navigate = useNavigate();
  const { data, isPending } = useFetchProfileQuery();

  if (isPending) return <Loading />;
  
  return (
    <div className="saved-items-page">
      <div className="saved-header-bg">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>
        <span className="page-title">Edit Profile</span>
      </div>

      <div className="flex justify-center items-center font-sans pt-8">
        <div className="flex-col items-center ">
          <UserBanner user={data} />

          <div className="flex justify-between min-h-screen pt-9 box-border gap-7">
            <UserSidebar />
            <UserInfoEdit user={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileEdit;