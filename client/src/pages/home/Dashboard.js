import React, { useEffect, useState } from "react";
import Navbar from "../../components/header/Navbar";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../global.css";

const Dashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [hasProfile, setHasProfile] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const response = await axios.get('/profile/check-profile');
        setHasProfile(response.data.hasProfile);
      } catch (error) {
        console.error("There was an error checking the profile!", error);
      }
    };

    if (user) {
      checkProfile();
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar isAuthenticated={true} handleLogout={handleLogout} />
      <div className="content">
        <h2>Welcome to your dashboard!</h2>
        <p>
          This is where you can manage your profile, job listings, and more.
        </p>
        <h3>Your Details:</h3>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <p>
          Account Created At: {new Date(user.createdAt).toLocaleDateString()}
        </p>

        {!hasProfile && (
          <button onClick={() => navigate('/create-profile')}>
            Create Profile
          </button>
        )}
        {hasProfile && (
          <p>Your profile is already created. You can edit it <a href="/edit-profile">here</a>.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
