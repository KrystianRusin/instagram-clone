import { useEffect, useState } from "react";
import "../../styles/PostCard.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const PostCard = ({ post, handlePostModal }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);

  //Check if User has liked post, if so, set isLiked to true
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (post.likes.includes(user._id)) {
      setIsLiked(true);
    }
  }, []);

  //When user clicks like button
  const handleLikeClick = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    //Send a POST request to the server to like the post
    const response = await fetch("http://localhost:5000/posts/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: post._id,
        userId: user._id,
      }),
    });
    //If the request is successful, set isLiked to the opposite of its current value
    if (response.ok) {
      setIsLiked(!isLiked);
    } else {
      console.error("An error occurred while liking the post");
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <img
          src={post.user.profilePic}
          alt="PLACEHOLDER"
          className="nav-profile-img"
        ></img>
        <h4>{post.user.username}</h4>
      </div>

      <img src={post.image} alt="Post-Img" className="post-img" />
      <div className="post-footer">
        <div className="post-actions">
          <div className="main-post-actions">
            <div className="like-button" onClick={handleLikeClick}>
              {isLiked ? (
                <FavoriteIcon sx={{ fontSize: "2rem" }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: "2rem" }} />
              )}
            </div>
            <div>
              <div className="comment-button" onClick={handlePostModal}>
                <ModeCommentOutlinedIcon sx={{ fontSize: "2rem" }} />
              </div>
            </div>
          </div>
          <div>
            <BookmarkBorderIcon sx={{ fontSize: "2rem" }} />
          </div>
        </div>
        <div className="post-likes">
          <p>{likes} Likes</p>
        </div>
        <div className="post-caption">
          <img
            src={post.user.profilePic}
            alt="PLACEHOLDER"
            className="nav-profile-img"
          ></img>
          <p>
            {post.user.username}: {post.caption}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
