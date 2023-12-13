// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found. Please log in.");
          return;
        }

        const response = await fetch("/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          const errorMessage = await response.text();
          setError(errorMessage || "Error fetching user profile");
        }
      } catch (error) {
        console.error("Fetch user profile error:", error);
        setError("Internal Server Error");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {userData ? (
            <div>
              <p>Welcome, {userData.username}!</p>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <p>{error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
