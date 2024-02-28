import { useState } from "react";
import "../../styles/CreateModal.css";

const createModal = ({ user, createModalHandler }) => {
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);

  const createPostHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("user", user._id);
    formData.append("comment", comment);
    formData.append("image", image); // add the image file to the form data

    try {
      const response = await fetch("http://localhost:5000/posts/create", {
        method: "POST",
        body: formData, // send the form data
      });

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
        <input
          type="file"
          name="image"
          id="create-image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div className="form-container">
          <form className="create-form" onSubmit={createPostHandler}>
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