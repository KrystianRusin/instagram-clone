import React from "react";
import InstagramLogo from "../../assets/instagram-1.svg";
import "../../styles/Signup.css";

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div>
          <img src={InstagramLogo} alt="" className="insta-signup-logo" />
          <p className="intro-p">
            Sign up to see photos and videos from your friends.
          </p>
        </div>

        <form action="" className="signup-form">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="input-text"
          />
          <input
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Full Name"
            className="input-text"
          />
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
          <p className="terms-of-service">
            By signing up, you agree to our Terms, Privacy Policy and Cookies
            Policy
          </p>
          <input type="submit" value="Sign Up" className="signup-button" />
        </form>
      </div>
      <div className="login-link-container">
        <p>
          Have an account? <a href="/">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
