import React, { useState, useEffect } from "react";
import "../../styles/Profile.css";

const Profile = ({ user }) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${user._id}`);
        const data = await response.json();
        console.log(data);
        setFollowers(data.followers);
        setFollowing(data.following);
        setPosts(data.posts);
      } catch (error) {
        console.log("An error occurred while fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <img
              src={user.profilePic}
              alt="profile-avatar"
              className="avatar"
            />
          </div>
          <div className="profile-details">
            <div className="profile-actions">
              <div className="profile-username">{user.username}</div>
              {sessionStorage.getItem("user") === JSON.stringify(user) ? (
                <button>Edit Profile</button>
              ) : (
                <button>Follow</button>
              )}
              {sessionStorage.getItem("user") !== JSON.stringify(user) ? (
                <button>Message</button>
              ) : null}
            </div>

            <div className="profile-stats">
              <div className="profile-stats-item">
                <span>{posts.length}</span> posts
              </div>
              <div className="profile-stats-item">
                <span>{followers.length}</span> followers
              </div>
              <div className="profile-stats-item">
                <span>{following.length}</span> following
              </div>
            </div>
            <div className="bio-content">
              <div className="profile-name">{user.fullName}</div>
              <div className="profile-bio">{user.bio}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
