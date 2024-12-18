import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css"

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (userId) {
      try {
        await axios.post("http://localhost:5000/api/login", { userId });
        localStorage.setItem("userId", userId);
        navigate("/score");
      } catch (error) {
        console.error("Error logging in", error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Login Page</h2>
      <input
        className="input-box"
        type="text"
        placeholder="Enter ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button
       className="btn-sub"
      onClick={handleLogin}>Submit</button>
    </div>
  );
};

export default LoginPage;
