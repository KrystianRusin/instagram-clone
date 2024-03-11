import { useState } from "react";
import "../../styles/PostCard.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user);
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
              <ModeCommentOutlinedIcon sx={{ fontSize: "2rem" }} />
            </div>
          </div>
          <div>
            <BookmarkBorderIcon sx={{ fontSize: "2rem" }} />
          </div>
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
