import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("pumpTrackUser"));

  const handleLogout = () => {
    localStorage.removeItem("pumpTrackUser");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <Link to="/" className="navbar-logo">
        ⛽ Pump Track
      </Link>

      {/* Navigation Links */}
      <div className="navbar-links">

        <Link to="/">Home</Link>

        <Link to="/dashboard">Dashboard</Link>

        {/* Admin link ONLY for admin */}
        {user && user.role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}

        {/* Logout */}
        {user && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}

export default Navbar;

