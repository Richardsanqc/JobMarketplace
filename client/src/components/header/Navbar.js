import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import "../../global.css";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ isAuthenticated, handleLogout }) => {
  const { user } = useAuth();

  return (
    <nav>
      <Link className="lrg-heading" to="/">
        JobHive
      </Link>
      <div className="navbar-links">
        <Link to="/job-listings">Job Listings</Link>
        {isAuthenticated && user.role === "employer" ? (
          <>
            <Link to="/test">TEST FUCK YOU</Link>
          </>
        ) : (
          <>
          </>
        )}
        <Link to="/browse-employees">Browse Employers</Link>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <Link className="btn" onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link className="btn" to="/login">
              Login
            </Link>
            <Link className="btn" to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
