import React, { useState } from "react";
import InstagramLogo from "../../assets/instagram-1.svg";
import "../../styles/Signup.css";

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, fullName, username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      onLogin(data.user);
    } else {
      sessionStorage.setItem("user", JSON.stringify(data.user));
      console.error(data);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div>
          <img src={InstagramLogo} alt="" className="insta-signup-logo" />
          <p className="intro-p">
            Sign up to see photos and videos from your friends.
          </p>
        </div>

        <form onSubmit={onSubmit} className="signup-form">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="input-text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Full Name"
            className="input-text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="input-text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="input-text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          Have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
