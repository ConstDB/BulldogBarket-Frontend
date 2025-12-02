import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import barket from '../assets/barket.svg';
import search from '../assets/search.svg';
import home from '../assets/home.svg';
import bookmark from '../assets/bookmark.svg';
import notif from '../assets/notif.svg';
import profileicon from '../assets/profileicon.svg';

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/marketfeed">
          <img src={barket} alt="BarkKart Logo" className="logo" />
        </Link>
        <span className="brand">BarkKart</span>
      </div>

      <div className="search-bar">
        <div className="search-container">
          <img src={search} alt="Search" className="search-icon" />
          <input type="text" placeholder="Search for uniforms, food, etc..." />
        </div>
      </div>

      <div className="header-icons">
        <Link to="/marketfeed">
          <img src={home} alt="MarketFeed" />
        </Link>

        <Link to="/bookmarks">
          <img src={bookmark} alt="Bookmarks" />
        </Link>

        <Link to="/notifications">
          <img src={notif} alt="Notifications" />
        </Link>

        <div className="profile-dropdown">
          <img
            src={profileicon}
            alt="Profile"
            className="profile"
            onClick={() => setOpen(!open)}
          />

          {open && (
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item">Profile</Link>
              <Link to="/logout" className="dropdown-item">Logout</Link>
            </div>

          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
