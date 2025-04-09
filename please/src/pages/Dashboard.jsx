import React from "react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("No access token found");
        return;
      }
      const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      return await result.json();
    };
    fetchProfile();
  }, []);
};


return (
    <div>
        <>
        
        </>
    </div>
)