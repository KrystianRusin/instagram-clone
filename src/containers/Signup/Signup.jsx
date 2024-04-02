import { useState } from "react";
import PropTypes from "prop-types";
import InstagramLogo from "../../assets/instagram-1.svg";
import "../../styles/Signup.css";

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullName, username, password }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      onSignup(data.user);
      sessionStorage.setItem("user", JSON.stringify(data.user));
    } else {
      sessionStorage.setItem("user", JSON.stringify(data.user));
      setError(data.message);
      resetForm();
      console.error(data);
    }
  };

  const resetForm = () => {
    setEmail("");
    setFullName("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <div className="signup-form-container">
          <div>
            <img src={InstagramLogo} alt="" className="insta-signup-logo" />
            <p className="intro-p">
              Sign up to see photos and videos from your friends.
            </p>
          </div>
          {error && <p className="error-message">{error}</p>}
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
    </div>
  );
};

Signup.propTypes = {
  onSignup: PropTypes.func.isRequired,
};

export default Signup;
