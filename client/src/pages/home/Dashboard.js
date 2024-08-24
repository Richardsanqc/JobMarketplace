import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/header/Navbar";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../global.css";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Ensure the endpoint is correct
        const res = await axios.get(
          "http://localhost:5050/api/auth/dashboard",
          config
        );
        setUser(res.data);
      } catch (err) {
        console.error(
          "Failed to fetch user data:",
          err.response?.data?.errors || err.message
        );
      }
    };

    fetchUserData();
  }, []);

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
      </div>
    </div>
  );
};

export default Dashboard;
