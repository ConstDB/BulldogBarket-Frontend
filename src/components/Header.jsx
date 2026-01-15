import { useState } from "react";
import { Link } from "react-router-dom";
import barket from "../assets/barket.svg";
import search from "../assets/search.svg";
import home from "../assets/home.svg";
import bookmark from "../assets/bookmark.svg";
import notif from "../assets/notif.svg";
import useUserStore from "@/stores/useUserStore";

function Header() {
  const [open, setOpen] = useState(false);
  const user = useUserStore((state) => state.user);

  // shitty implementation muna since walang global auth context
  const handleLogout = () => {
    window.location.href = "/signin";
    localStorage.removeItem("token");
  };

  return (
    <header className="fixed top-0 left-0 w-full h-14 bg-[#2E3A8C] flex items-center justify-between px-6 font-sen shadow-md z-50">
      <div className="flex items-center gap-2.5 px-[60px]">
        <Link to="/marketfeed">
          <img src={barket} alt="BarkKart Logo" className="h-5" />
        </Link>
        <span className="text-white text-xl font-bold">BarkKart</span>
      </div>

      <div className="flex">
        <div className="relative w-[550px] bg-white rounded-[40px]">
          <img
            src={search}
            alt="Search"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search for uniforms, food, etc..."
            className="w-full h-[30px] rounded-[40px] border-none pl-10 pr-4 text-base outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 px-[60px]">
        <Link to="/marketfeed">
          <img src={home} alt="MarketFeed" className="h-4 cursor-pointer" />
        </Link>
        <Link to="/saveditems">
          <img src={bookmark} alt="Bookmarks" className="h-4 cursor-pointer" />
        </Link>
        <Link to="/notifications">
          <img src={notif} alt="Notifications" className="h-4 cursor-pointer" />
        </Link>

        <div className="relative" onClick={() => setOpen((prev) => !prev)}>
          <img
            src={user?.avatarUrl}
            className="rounded-full border border-blue-300 h-7 cursor-pointer"
          />

          {open && (
            <div className="absolute top-9 right-0 bg-white rounded-md shadow-lg w-[120px] flex flex-col z-50 overflow-hidden">
              <Link
                to="/profile"
                className="px-4 py-2 text-sm text-[#2E3A8C] border-b border-gray-200 hover:bg-gray-100 text-left cursor-pointer"
              >
                Profile
              </Link>

              <button
                className="px-4 py-2 text-sm text-[#2E3A8C] hover:bg-gray-100 text-left cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;