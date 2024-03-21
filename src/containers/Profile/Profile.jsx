import React, { useState, useEffect } from "react";
import "../../styles/Profile.css";
import PostModal from "../../components/PostModal/PostModal";

const Profile = ({ user, setSelectedPost, handlePostModal }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${user._id}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.log("An error occurred while fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  const handleProfilePostClick = (post) => {
    setSelectedPost(post);
    handlePostModal();
  };

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
                <span className="profile-data-value">
                  {userData.posts?.length}
                </span>{" "}
                posts
              </div>
              <div className="profile-stats-item">
                <span className="profile-data-value">
                  {userData.followers?.length}
                </span>{" "}
                followers
              </div>
              <div className="profile-stats-item">
                <span className="profile-data-value">
                  {userData.following?.length}
                </span>{" "}
                following
              </div>
            </div>
            <div className="bio-content">
              <div className="profile-name">{userData.fullName}</div>
              <div className="profile-bio">{userData.bio}</div>
            </div>
          </div>
        </div>
        <div className="profile-posts">
          {userData.posts?.map((post) => (
            <div
              className="profile-post-card"
              key={post._id}
              onClick={() => handleProfilePostClick(post)}
            >
              <img src={post.image} alt="post" className="profile-post" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
