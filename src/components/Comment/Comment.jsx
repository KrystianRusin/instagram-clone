import React from "react";
import "../../styles/Comment.css";

const Comment = ({ post }) => {
  return (
    <span className="modal-comment-content">
      <img
        src={post.user.profilePic}
        alt="Placeholder"
        className="nav-profile-img"
      />
      <span className="modal-comment-information">
        <span className="modal-comment-text">
          <h4>{post.user.username}: </h4>
          <p>{post.caption}</p>
        </span>
        <p className="time-posted">4m</p>
      </span>
    </span>
  );
};

export default Comment;
