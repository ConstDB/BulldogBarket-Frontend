import React, { useEffect, useState } from "react";
import { FaStore, FaMoon, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom"; 

import "../../styles/SellerDashboard/NavBar.css";

export default function NavBar() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== "undefined" && document.documentElement) {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    if (typeof document === "undefined" || !document.documentElement) return;

    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  const toggleDark = () => setIsDark((v) => !v);

  return (
    <div className="navbar">
      {/* Brand Logo Group */}
      <Link to="/" className="brand-group">
        <FaStore className="brand-icon" />
        <span className="brand-name">BarkKart</span>
      </Link>

      <div className="nav-group">
        <button
          className="icon-link"
          title="Toggle dark mode"
          onClick={toggleDark}
          aria-pressed={isDark}
        >
          <FaMoon />
        </button>

        <Link to="/" className="icon-link" title="Home">
          <FaHome />
        </Link>

        <Link to="/signin"> 
          <img 
            src="https://placehold.co/100" 
            alt="Profile" 
            className="profile-img" 
          />
        </Link>
      </div>
    </div>
  );
}