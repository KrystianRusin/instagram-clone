import React from "react";
import "../../styles/PostModal.css";

const PostModal = ({ handlePostModal }) => {
  return (
    <div className="modal-container" onClick={handlePostModal}>
      <div className="post-modal"></div>
    </div>
  );
};

export default PostModal;
