import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/user/signup`, {
        name,
        email,
        password,
      });

      console.log("Response:", response.data);

      setName("");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.error("Error", error);
    }
  };

  function moveToLogin() {
    navigate("/");
  }
  return (
    <div className="head_wrapper_signup">
        <div className="wrapper_signup">
          <h1>Hello Again!</h1>
          <p>Welcome back you've been missed!</p>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter username"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          <button type="submit">Sign up</button>
          </form>
          <div className="not-member">
            Already have an account? <span onClick={moveToLogin}>
                Login
            </span>
          </div>
        </div>
    </div>
  );
};

export default Signup;
