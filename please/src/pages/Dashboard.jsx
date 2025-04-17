import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
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
        setError(
          "failed to load dashboard. reason: failed to load profile data"
        );
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchTopFiveTracks = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("No access token found");
        setError("No access token found");
        return;
      }
      try {
        const result = await fetch(
          "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5&offset=0",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!result.ok) {
          throw new Error(`Error: ${result.status} ${result.statusText}`);
        }

        const data = await result.json();
        console.log("Top tracks data:", data);
        setTopTracks(data.items); // Update the topTracks state
      } catch (error) {
        console.error("Error fetching top tracks:", error);
        setError(
          "dashboard failed to load. reason: failed to fetch top tracks"
        );
      }
    };
    fetchTopFiveTracks();
  }, [profile]);

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
    "sup",
    "meowdy",
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
          <h3>Top 5 Tracks</h3>
          <ul>
            {topTracks.map((track) => (
              <li key={track.id}>
                <img
                  src={track.album.images[0]?.url}
                  alt={track.name}
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                <strong>{track.name}</strong> by{" "}
                {track.artists.map((artist) => artist.name).join(", ")}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
