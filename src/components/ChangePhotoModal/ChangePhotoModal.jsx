import React from "react";
import "../../styles/ChangePhotoModal.css";

const ChangePhotoModal = ({ setOpenEditProfileModal }) => {
  const handleCloseModal = (e) => {
    if (e.target.classList.contains("change-photo-modal-wrapper")) {
      setOpenEditProfileModal(false);
    }
  };
  return (
    <div className="change-photo-modal-wrapper" onClick={handleCloseModal}>
      <div className="change-photo-modal-container">
        <div className="change-photo-header">Change Profile Photo</div>
        <div className="change-photo-modal-options">
          <button className="upload-modal-option">Upload Photo</button>
        </div>
        <div className="change-photo-modal-options">
          <button className="remove-modal-option">Remove Current Photo</button>
        </div>
        <div className="change-photo-modal-cancel-container">
          <button className="cancel-modal-option">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ChangePhotoModal;
