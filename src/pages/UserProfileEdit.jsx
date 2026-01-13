import UserSidebar from "../components/UserProfileEdit/UserSidebar";
import UserBanner from "../components/UserProfileEdit/UserBanner";
import UserInfoEdit from "../components/UserProfileEdit/UserInfoEdit";
import { useFetchProfileQuery } from "@/hooks/useFetchProfileQuery";
import Loading from "@/components/Loading";

function UserProfileEdit() {
  const { data, isPending } = useFetchProfileQuery();


  if (isPending) return <Loading />;
  return (
    <div className="flex justify-center items-center font-sans pt-8">
      <div className="flex-col items-center ">
        <UserBanner user={data} />

        <div className="flex justify-between min-h-screen pt-9 box-border gap-7">
          <UserSidebar />
          <UserInfoEdit user={data} />
        </div>
      </div>
    </div>
  );
}

export default UserProfileEdit;
