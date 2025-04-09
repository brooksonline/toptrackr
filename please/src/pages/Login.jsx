import React from "react";
import { redirectToAuthCodeFlow } from "../services/Spotify";

const Login = () => {
  const handleLogin = () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    redirectToAuthCodeFlow(clientId);
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Login;
