import { useState } from "react";
import { Link } from "react-router-dom";
import barket from "../assets/barket.svg";
import search from "../assets/search.svg";
import home from "../assets/home.svg";
import bookmark from "../assets/bookmark.svg";
import notif from "../assets/notif.svg";
import profileicon from "../assets/profileicon.svg";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        width: "100%",
        height: "58px",
        backgroundColor: "#2E3A8C",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        fontFamily: "Sen, sans-serif",
        boxSizing: "border-box",
        boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)",
        position: "relative",
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "0 60px",
        }}
      >
        <Link to="/marketfeed">
          <img src={barket} alt="BarkKart Logo" style={{ height: "20px" }} />
        </Link>

        <span
          style={{
            color: "white",
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          BarkKart
        </span>
      </div>

      <div
        style={{
          display: "flex",
          position: "absolute",
          left: "444px",
        }}
      >
        <div style={{ width: "550px", position: "relative" }}>
          <img
            src={search}
            alt="Search"
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              height: "18px",
              width: "18px",
              pointerEvents: "none",
            }}
          />

          <input
            type="text"
            placeholder="Search for uniforms, food, etc..."
            style={{
              width: "100%",
              height: "30px",
              borderRadius: "40px",
              border: "none",
              padding: "0 18px 0 40px",
              fontSize: "16px",
              outline: "none",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          padding: "0 60px",
        }}
      >
        <Link to="/marketfeed">
          <img src={home} alt="MarketFeed" style={{ height: "16px", cursor: "pointer" }} />
        </Link>

        <Link to="/post-product">
          <img src={bookmark} alt="Bookmarks" style={{ height: "16px", cursor: "pointer" }} />
        </Link>

        <Link to="/notifications">
          <img src={notif} alt="Notifications" style={{ height: "16px", cursor: "pointer" }} />
        </Link>

        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <img
            src={profileicon}
            alt="Profile"
            style={{
              height: "30px",
              cursor: "pointer",
            }}
          />

          {open && (
            <div
              style={{
                position: "absolute",
                top: "36px",
                right: 0,
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                width: "120px",
                display: "flex",
                flexDirection: "column",
                zIndex: 1000,
                overflow: "hidden",
              }}
            >
              <Link
                to="/profile"
                style={{
                  padding: "10px 16px",
                  fontSize: "14px",
                  color: "#2E3A8C",
                  textDecoration: "none",
                  cursor: "pointer",
                  borderBottom: "1px solid #f0f0f0",
                  textAlign: "left",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f2f2f2")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "white")
                }
              >
                Profile
              </Link>

              <Link
                to="/logout"
                style={{
                  padding: "10px 16px",
                  fontSize: "14px",
                  color: "#2E3A8C",
                  textDecoration: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f2f2f2")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "white")
                }
              >
                Logout
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default Header;
