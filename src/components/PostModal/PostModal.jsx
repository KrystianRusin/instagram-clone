import React, { useEffect } from "react";
import "../../styles/PostModal.css";

const PostModal = ({ handlePostModal, post }) => {
  return (
    <div className="modal-container" onClick={handlePostModal}>
      <div className="post-modal">
        <div className="image-container">
          <img src={post.image} alt="Placeholder" className="post-modal-img" />
        </div>
        <div className="post-modal-sidebar">
          <div className="post-modal-header">
            <img
              src={post.user.profilePic}
              alt="Placeholder"
              className="nav-profile-img"
            />
            <h4>{post.user.username}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
