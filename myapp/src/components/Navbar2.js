import React from "react";
import un from '../img/un.png';
import { Link } from 'react-router-dom';


import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar2({ onLogout, isAdmin, isLoggedIn }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const navigate = useNavigate();

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);

  const handleAdminLogin = () => {
    window.open("/Admin", "_blank");
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="logo-section">
          <img
            className="logo-img"
            src={un}
            alt="UN logo"
            onDoubleClick={handleAdminLogin}
            style={{ cursor: "pointer" }}
          />
        </div>
        <p className="site-name">Bhartiya Railway Booking Platform</p>

        <nav className="nav-links">
          
          {isAdmin ? (
            <>
              <Link to="/">Home</Link>
            </>
          ) : isLoggedIn ? (
            <>
              <Link to="/Home">Home</Link>
              <Link to="/booking">Booking</Link>
              <Link to="/Aboutus">About Us</Link>
              <Link to="/ContactUs">Contact Us</Link>
              <Link to="/Helpus">Help Us</Link>

              <div className="my-panel">
                <button className="my-panel-btn" onClick={togglePanel}>
                  My Panel ▾
                </button>

                {isPanelOpen && (
  <ul className="my-panel-dropdown">
    <li>
      <Link className="my-panel-link" to="/MyProfile" onClick={() => setIsPanelOpen(false)}>
        My Profile
      </Link>
    </li>
    <li>
      <Link className="my-panel-link" to="/MyBooking" onClick={() => setIsPanelOpen(false)}>
        My Booking
      </Link>
    </li>
    <li>
      <Link className="my-panel-link" to="/offer" onClick={() => setIsPanelOpen(false)}>
        My Offer
      </Link>
    </li>
    <li>
      <Link className="my-panel-link" to="/HelpSupport" onClick={() => setIsPanelOpen(false)}>
        Help & Support
      </Link>
    </li>
    <li>
      <button
        className="my-panel-link logout-link"
        onClick={() => {
          onLogout();
          setIsPanelOpen(false);
        }}
      >
        Logout
      </button>
    </li>
  </ul>
)}
              </div>
            </>
          ) : null}
        </nav>
      </div>
    </header>
  );
}