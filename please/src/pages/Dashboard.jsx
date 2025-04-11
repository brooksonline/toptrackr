import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("No access token found");
        setError("No access token found");
        return;
      }
      try {
        const result = await fetch("https://api.spotify.com/v1/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!result.ok) {
          throw new Error(`Error: ${result.status} ${result.statusText}`);
        }

        const data = await result.json();
        console.log("Profile data:", data);
        setProfile(data); // Update the profile state
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile. Please try again.");
      }
    };
    fetchProfile();
  }, []);

  const greetings = [
    "welcome",
    "nice to have you back",
    "what's poppin",
    "how's it going",
    "hey there",
    "good to see you",
    "howdy",
    "what's up",
    "greetings",
    "salutations",
    "howdy-doo",
    "what's shaking",
  ];

  const randomGreeting =
    greetings[Math.floor(Math.random() * greetings.length)];

  return (
    <div>
      <h1>Dashboard</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : profile ? (
        <div>
          <h2>
            {randomGreeting} {profile.display_name}!
          </h2>
          <img src={profile.images[0]?.url} alt="Profile" />
          <p>Email: {profile.email}</p>
          <p>Country: {profile.country}</p>
          <p>Followers: {profile.followers.total}</p>
          <p>
            Product:{" "}
            {profile.product.charAt(0).toUpperCase() +
              profile.product.slice(1).toLowerCase()}
          </p>
          <p>
            Spotify Profile:{" "}
            <a
              href={profile.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.external_urls.spotify}
            </a>
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
