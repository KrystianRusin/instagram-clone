import React from "react";
import "../../styles/Login.css";
import instaLogo from "../../assets/instagram-1.svg";
import FacebookIcon from "@mui/icons-material/Facebook";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-form-container">
        <img src={instaLogo} alt="Instagram" className="insta-login-logo" />
        <form action="" className="login-form">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="input-text"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="input-text"
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
          Don't have an account? <a href="/">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
