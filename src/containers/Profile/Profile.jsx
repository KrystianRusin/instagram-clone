import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles/Profile.css";
import { useParams } from "react-router-dom";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Profile = ({ setSelectedPost, handlePostModal }) => {
  const [userData, setUserData] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${username}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.log("An error occurred while fetching user data:", error);
      }
    };
    fetchUser();
  }, [username]);

  const handleProfilePostClick = (post) => {
    setSelectedPost({ ...post, user: userData });
    handlePostModal();
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <img
              src={userData.profilePic}
              alt="profile-avatar"
              className="avatar"
            />
          </div>
          <div className="profile-details">
            <div className="profile-actions">
              <div className="profile-username">{userData.username}</div>
              {JSON.parse(sessionStorage.getItem("user"))._id ===
              userData._id ? (
                <button>Edit Profile</button>
              ) : (
                <button>Follow</button>
              )}
              {JSON.parse(sessionStorage.getItem("user"))._id !==
              userData._id ? (
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
              onMouseEnter={() => setHoveredItem(post)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {hoveredItem !== null && hoveredItem._id === post._id ? (
                <div className="profile-post-overlay">
                  <div className="post-overlay-stats">
                    {hoveredItem.likes.length} <FavoriteIcon />
                    {hoveredItem.comments.length} <ModeCommentIcon />
                  </div>
                </div>
              ) : null}
              <img src={post.image} alt="post" className="profile-post" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    profilePic: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedPost: PropTypes.func.isRequired,
  handlePostModal: PropTypes.func.isRequired,
};

export default Profile;
