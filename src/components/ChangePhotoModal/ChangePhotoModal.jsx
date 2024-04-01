import { useRef } from "react";
import "../../styles/ChangePhotoModal.css";
import defaultAvatar from "../../assets/Default.png";

const ChangePhotoModal = ({ setOpenEditProfileModal, setSelectedFile }) => {
  const fileInput = useRef(null);

  const handleCloseModal = (e) => {
    if (
      e.target.classList.contains("change-photo-modal-wrapper") ||
      e.target.classList.contains("cancel-modal-option")
    ) {
      setOpenEditProfileModal(false);
    }
  };

  const handleAvatarUpload = (e) => {
    e.stopPropagation();
    fileInput.current.click();
  };

  //Set current photo to default avatar
  const handleAvatarRemove = async () => {
    setSelectedFile(defaultAvatar);
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
