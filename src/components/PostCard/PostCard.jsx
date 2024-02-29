import React from "react";
import "../../styles/PostCard.css";

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <img src={post.image} alt="Post-Img" />
      <p>{post.caption}</p>
    </div>
  );
};

export default PostCard;
