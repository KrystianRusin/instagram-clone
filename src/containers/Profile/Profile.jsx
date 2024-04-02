import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useParams } from "react-router-dom";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import updateSessionStorage from "../../util/sessionStorage";

const Profile = ({ setSelectedPost, handlePostModal }) => {
  const [userData, setUserData] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const { username } = useParams();
  const [currUser, setCurrUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const navigate = useNavigate();
  //change this to comapre if user is on following list
  const [isFollowing, setIsFollowing] = useState();

  // Fetch user data from server used to populate the profile page on username change
  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/${username}`
      );
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.log("An error occurred while fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [username]);

  // Check if the current user is following the user whose profile is being viewed
  useEffect(() => {
    if (
      currUser &&
      currUser.following &&
      currUser.following.includes(userData._id)
    ) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [userData, currUser]);

  const handleEditProfile = () => {
    navigate("/accounts/edit");
  };

  const handleProfilePostClick = (post) => {
    setSelectedPost({ ...post, user: userData });
    handlePostModal();
  };

  // Follow and Unfollow functions which update user followers and following lists
  const handleFollow = () => {
    const updatedFollowers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/users/${userData._id}/follow`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ followerId: currUser._id }),
          }
        );
        const { user, follower } = await response.json();
        setUserData(user);
        const updatedCurrUser = await updateSessionStorage();
        setCurrUser(updatedCurrUser);
        setIsFollowing(updatedCurrUser.following.includes(userData._id));
        fetchUser();
      } catch (error) {
        console.log("An error occurred while updating followers:", error);
      }
    };
    updatedFollowers();
  };

  const handleUnFollow = () => {
    const updatedFollowers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/users/${userData._id}/unfollow`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ followerId: currUser._id }),
          }
        );
        const { user, follower } = await response.json();
        setUserData(user);
        const updatedCurrUser = await updateSessionStorage();
        setCurrUser(updatedCurrUser);
        setIsFollowing(updatedCurrUser.following.includes(userData._id));
        fetchUser();
      } catch (error) {
        console.log("An error occurred while updating followers:", error);
      }
    };
    updatedFollowers();
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
                <button onClick={handleEditProfile}>Edit Profile</button>
              ) : isFollowing ? (
                <button onClick={handleUnFollow}>Unfollow</button>
              ) : (
                <button onClick={handleFollow}>Follow</button>
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
