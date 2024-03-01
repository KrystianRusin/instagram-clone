import React from "react";
import "../../styles/PostCard.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const PostCard = ({ post }) => {
  console.log(post.user);

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
            <div>
              <FavoriteBorderIcon sx={{ fontSize: "2rem" }} />
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
