import PropTypes from "prop-types";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import "../../styles/CreateModal.css";

const CreateModal = ({ user, createModalHandler }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null); // state to hold the preview image source

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
      setPreviewSrc(URL.createObjectURL(acceptedFiles[0])); // create an object URL for the file
    },
  });

  const navigate = useNavigate();

  const createPostHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("user", user._id);
    formData.append("caption", caption);
    formData.append("image", image); // add the image file to the form data

    try {
      const response = await fetch("http://localhost:5000/posts/create", {
        method: "POST",
        body: formData, // send the form data
      });

      const data = await response.json();
      console.log(data);
      setCaption("");
      createModalHandler();
    } catch (error) {
      alert("An error occurred while creating the post:", error);
    }
    navigate("/");
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
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          {previewSrc ? (
            <img src={previewSrc} alt="preview" className="preview-image" /> // if there's a preview source, display the image
          ) : (
            <p>Drag a picture here, or click to select picture</p> // otherwise, display the dropzone text
          )}
        </div>
        <div className="form-container">
          <form className="create-form" onSubmit={createPostHandler}>
            <input
              type="text"
              name="caption"
              id="create-caption"
              placeholder="Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <input
              type="submit"
              value="Create"
              className="create-submit-button"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

CreateModal.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  createModalHandler: PropTypes.func.isRequired,
};

export default CreateModal;
