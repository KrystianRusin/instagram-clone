import { useState } from "react";
import "../../styles/CreateModal.css";

const createModal = ({ user, createModalHandler }) => {
  const [comment, setComment] = useState("");

  const createPostHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user._id, comment }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setComment("");
    } catch (error) {
      console.error("An error occurred while creating the post:", error);
    }
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") {
          createModalHandler();
        }
      }}
    >
      <div className="create-container">
        <div className="create-header">Create new post</div>

        <div className="form-container">
          <form className="create-form" onSubmit={createPostHandler}>
            <input
              type="file"
              name="image"
              id="create-image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <input
              type="text"
              name="comment"
              id="create-commment"
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <input type="submit" value="Create" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default createModal;
