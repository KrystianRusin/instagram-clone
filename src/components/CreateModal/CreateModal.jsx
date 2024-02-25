import { useState } from "react";
import "../../styles/CreateModal.css";

const createModal = ({ user }) => {
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
    } catch (error) {
      console.error("An error occurred while creating the post:", error);
    }
  };

  return (
    <div className="create-container">
      Create new post
      <div className="form-container">
        <form onSubmit={createPostHandler}>
          <input
            type="text"
            name="comment"
            id="create-commment"
            placeholder="Comment"
            onChange={(e) => setComment(e.target.value)}
          />
          <input type="submit" value="Create" />
        </form>
      </div>
    </div>
  );
};

export default createModal;
