import React from "react";
import "../../styles/Comment.css";

const Comment = ({ comment }) => {
  return (
    <span className="modal-comment-content">
      <img
        src={comment.user.profilePic}
        alt="Placeholder"
        className="nav-profile-img"
      />
      <span className="modal-comment-information">
        <span className="modal-comment-text">
          <h4>{comment.user.username}: </h4>
          <p>{comment.text}</p>
        </span>
        <p className="time-posted">4m</p>
      </span>
    </span>
  );
};

export default Comment;
