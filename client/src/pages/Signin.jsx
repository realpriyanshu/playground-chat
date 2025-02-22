import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import Heading from "../components/Heading.jsx";
import Subheading from "../components/Subheading.jsx";
import Inputbox from "../components/Inputbox.jsx";
import Btn from "../components/Button.jsx";
import BottomWarning from "../components/BottomWarning.jsx";
import BgAnimation from "../components/BgAnimation.jsx"; // Import Background Animation

export default function Signin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const redirectPath = new URLSearchParams(location.search).get("redirect") || "/";

  const handleSignin = async () => {
    try {
      const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signin`, {
        username,
        password,
      });

      localStorage.setItem("token", resp.data.token);
      navigate(redirectPath);
    } catch (err) {
      console.error("Sign-in error:", err.response?.data || err.message);
      setError("Invalid credentials or server error. Please try again.");
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-evenly h-screen">
      {/* Background Animation */}
      <BgAnimation />

      <div className="relative z-10 p-6 bg-purple-300/30 backdrop-blur-lg rounded-2xl shadow-lg">
        <Heading label="Sign In" />
        <Subheading label="Enter your information to access your account" />
        
        <Inputbox
          label="Email"
          onchange={(e) => setUsername(e.target.value)}
        />
        <Inputbox
          label="Password"
          onchange={(e) => setPassword(e.target.value)}
        />
        <Btn label="Sign In" onClick={handleSignin} />
        
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        
        <BottomWarning label="Don't have an account ?  " to="/signup" Bottomtext="Sign Up" />
      </div>
    </div>
  );
}
