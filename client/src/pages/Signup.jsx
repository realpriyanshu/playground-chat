import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Heading from "../components/Heading.jsx";
import Subheading from "../components/Subheading.jsx";
import Inputbox from "../components/Inputbox.jsx";
import Btn from "../components/Button.jsx";
import BottomWarning from "../components/BottomWarning.jsx";
import BgAnimation from "../components/BgAnimation.jsx"; // Import Background Animation

export default function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      const user = {
        username,
        password,
        firstname: firstName,
        lastname: lastName,
      };

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, user);

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      console.error("Sign-up error:", err.response?.data || err.message);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-evenly h-screen">
      {/* Background Animation */}
      <BgAnimation />

      <div className="relative z-10 p-6 bg-purple-300/30 backdrop-blur-lg rounded-2xl shadow-lg">
        <Heading label="Sign Up" />
        <Subheading label="Enter your information to create your account" />

        <Inputbox label="First Name" onchange={(e) => setFirstname(e.target.value)} />
        <Inputbox label="Last Name" onchange={(e) => setLastname(e.target.value)} />
        <Inputbox label="Email" onchange={(e) => setUsername(e.target.value)} />
        <Inputbox label="Password" onchange={(e) => setPassword(e.target.value)} />

        <Btn label="Sign Up" onClick={handleSignup} />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <BottomWarning label="Already have an account?" to="/signin" Bottomtext="Sign In" />
      </div>
    </div>
  );
}
