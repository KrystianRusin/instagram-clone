import React, { useState } from "react";
import "../../styles/Login.css";
import instaLogo from "../../assets/instagram-1.svg";
import FacebookIcon from "@mui/icons-material/Facebook";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      sessionStorage.setItem("user", JSON.stringify(data.user));
      onLogin(data.user);
    } else {
      console.error(data);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <img src={instaLogo} alt="Instagram" className="insta-login-logo" />
        <form onSubmit={onSubmit} className="login-form">
          <input
            type="text"
            name="username"
            id="username-login"
            placeholder="Username"
            className="input-text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password-login"
            placeholder="Password"
            className="input-text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Login" className="login-button" />
        </form>
        <div className="or-container">
          <div className="or-line"></div>
          <p>OR</p>
          <div className="or-line"></div>
        </div>
        <div className="alternate-login-options">
          <a href="" className="facebook-login-link">
            <FacebookIcon />
            Log In with Facebook
          </a>
          <a href="">Forgot your Password?</a>
        </div>
      </div>
      <div className="signup-link-container">
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
