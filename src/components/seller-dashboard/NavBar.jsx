import React from "react";
import { FaStore, FaMoon, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom"; 

// 👇 IMPORT THE CSS FILE HERE
import "../../styles/NavigationBar/NavBar.css"; 

export default function NavBar() {
  return (
    <div className="navbar">
      {/* Brand Logo Group */}
      <Link to="/" className="brand-group">
        <FaStore className="brand-icon" />
        <span className="brand-name">BarkKart</span>
      </Link>

      <div className="nav-group">
        <button className="icon-link" title="Dark Mode">
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