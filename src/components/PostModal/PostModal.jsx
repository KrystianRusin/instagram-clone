import React, { useState } from "react";
import "../../styles/PostModal.css";
import Comment from "../Comment/Comment";

const PostModal = ({ handlePostModal, post }) => {
  const [commentText, setCommentText] = useState("");

  const createCommentHandler = (event) => {
    event.preventDefault();

    const user = JSON.parse(sessionStorage.getItem("user"));

    try {
      fetch("http://localhost:5000/posts/comment", {
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
                {post.comments.map((comment) => (
                  <li key={comment._id} className="post-modal-comment">
                    <Comment comment={comment} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <form action="" onSubmit={createCommentHandler}>
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <input type="submit" value="Post" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
