import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../../styles/PostModal.css";
import Comment from "../Comment/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

const PostModal = ({ handlePostModal, post }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(
    post && post.likes ? post.likes.length : 0
  );
  const inputRef = useRef();

  //Fetch comments for the post
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${post._id}/comment`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setComments(data))
      .catch((error) => console.log("Error fetching comments:", error));
    console.log(comments);
  }, [post._id]);

  //Check if user has liked the post and if they have set isLiked to true
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (post.likes.includes(user._id)) {
      setIsLiked(true);
    }
  }, []);

  const handleCommentClick = () => {
    inputRef.current.focus();
  };

  const handleLikeClick = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    //Send a POST request to the server to like the post
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/posts/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: post._id,
          userId: user._id,
        }),
      }
    );
    //If the request is successful, set isLiked to the opposite of its current value
    if (response.ok) {
      setIsLiked(!isLiked);
      setLikes(isLiked ? likes - 1 : likes + 1);
    } else {
      console.error("An error occurred while liking the post");
    }
  };

  const createCommentHandler = (event) => {
    event.preventDefault();

    const user = JSON.parse(sessionStorage.getItem("user"));

    try {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user._id,
          postId: post._id,
          text: commentText,
        }),
      });
    } catch (error) {
      alert("An error occurred while creating the comment:", error);
    }
    setCommentText("");
  };

  return (
    <div className="modal-container" onClick={handlePostModal}>
      <div className="post-modal" onClick={(e) => e.stopPropagation()}>
        <div className="image-container">
          <img src={post.image} alt="Placeholder" className="post-modal-img" />
        </div>
        <div className="post-modal-sidebar">
          <div className="post-modal-sidebar-top">
            <div className="post-modal-header">
              <img
                src={post.user.profilePic}
                alt="Placeholder"
                className="nav-profile-img"
              />
              <h4>{post.user.username}</h4>
            </div>
            <div className="post-modal-comments">
              <ul className="post-modal-comments-list">
                <li className="post-modal-comment">
                  <span className="modal-caption-content">
                    <img
                      src={post.user.profilePic}
                      alt="Placeholder"
                      className="nav-profile-img"
                    />
                    <span className="modal-caption-information">
                      <span className="modal-caption-text">
                        <h4>{post.user.username}: </h4>
                        <p>{post.caption}</p>
                      </span>
                      <p className="time-posted">4m</p>
                    </span>
                  </span>
                </li>
                {comments.map((comment) => (
                  <li key={comment._id} className="post-modal-comment">
                    <Comment comment={comment} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="post-modal-footer">
            <div className="post-modal-actions">
              <div className="like-button" onClick={handleLikeClick}>
                {isLiked ? (
                  <FavoriteIcon sx={{ fontSize: "1.75rem" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ fontSize: "1.75rem" }} />
                )}
              </div>
              <div>
                <div className="comment-button">
                  <ModeCommentOutlinedIcon
                    sx={{ fontSize: "1.75rem" }}
                    onClick={handleCommentClick}
                  />
                </div>
              </div>
            </div>
            <div className="post-modal-likes">
              <p>{likes} Likes</p>
            </div>
            <form
              action=""
              onSubmit={createCommentHandler}
              className="comment-form"
            >
              <input
                type="text"
                className="comment-input"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                ref={inputRef}
              />
              <input
                type="submit"
                value="Post"
                className="comment-submit"
                disabled={commentText == ""}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

PostModal.propTypes = {
  handlePostModal: PropTypes.func.isRequired,
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
    user: PropTypes.shape({
      profilePic: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    image: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostModal;
