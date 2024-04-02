import { useRef } from "react";
import "../../styles/ChangePhotoModal.css";
import defaultAvatar from "../../assets/Default.png";

const defaultAvatarUrl =
  "https://firebasestorage.googleapis.com/v0/b/instagram-clone-af213.appspot.com/o/Default.png?alt=media";

const ChangePhotoModal = ({ setOpenEditProfileModal, setSelectedFile }) => {
  const fileInput = useRef(null);

  // Close modal when clicking outside of it or on the cancel button
  const handleCloseModal = (e) => {
    if (
      e.target.classList.contains("change-photo-modal-wrapper") ||
      e.target.classList.contains("cancel-modal-option")
    ) {
      setOpenEditProfileModal(false);
    }
  };

  // Open file input when clicking on the upload photo button
  const handleAvatarUpload = (e) => {
    e.stopPropagation();
    fileInput.current.click();
  };

  // Convert URL to File object
  const urlToFile = async (url, filename, mimeType) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], filename, { type: mimeType });
  };

  //Set current photo to default avatar
  const handleAvatarRemove = async () => {
    try {
      const response = await fetch("http://localhost:5000/default-avatar");
      const data = await response.json();
      console.log(data);
      const file = await urlToFile(
        data.defaultAvatarUrl,
        "Default.png",
        "image/png"
      );
      setSelectedFile(file);
    } catch (error) {
      console.error(
        "An error occurred while getting the default avatar:",
        error
      );
    }
  };
  return (
    <div className="change-photo-modal-wrapper" onClick={handleCloseModal}>
      <div className="change-photo-modal-container">
        <div className="change-photo-header">Change Profile Photo</div>
        <div className="change-photo-modal-options">
          <button className="upload-modal-option" onClick={handleAvatarUpload}>
            Upload Photo
          </button>
          <input
            type="file"
            ref={fileInput}
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setSelectedFile(e.target.files[0]);
              }
            }}
          />
        </div>
        <div className="change-photo-modal-options">
          <button className="remove-modal-option" onClick={handleAvatarRemove}>
            Remove Current Photo
          </button>
        </div>
        <div className="change-photo-modal-cancel-container">
          <button className="cancel-modal-option" onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePhotoModal;
