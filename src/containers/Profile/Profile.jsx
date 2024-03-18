import React from "react";
import "../../styles/Profile.css";

const Profile = ({ user }) => {
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
                <span>0</span> posts
              </div>
              <div className="profile-stats-item">
                <span>0</span> followers
              </div>
              <div className="profile-stats-item">
                <span>0</span> following
              </div>
            </div>
            <div className="profile-name">{user.fullName}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
