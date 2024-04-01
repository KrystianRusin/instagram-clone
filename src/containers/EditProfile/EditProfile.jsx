import "../../styles/EditProfile.css";
import { useState, useEffect } from "react";
import ChangePhotoModal from "../../components/ChangePhotoModal/ChangePhotoModal";

const EditProfile = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(user.profilePic);
  const [bio, setBio] = useState(user.bio);

  useEffect(() => {
    // Only revoke object URLs for File objects
    if (selectedFile instanceof File) {
      const url = URL.createObjectURL(selectedFile);
      return () => URL.revokeObjectURL(url);
    }
  }, [selectedFile]);

  const handleChangePhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenEditProfileModal(true);
  };

  const submitFormhandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }
    formData.append("bio", bio);

    // Now you can send formData to the server
    try {
      const response = await fetch(
        `http://localhost:5000/users/${user._id}/update`,
        {
          method: "PUT",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("An error occurred while updating user data:", error);
    }
  };

  return (
    <div className="edit-profile-wrapper">
      {openEditProfileModal && (
        <ChangePhotoModal
          setOpenEditProfileModal={setOpenEditProfileModal}
          setSelectedFile={setSelectedFile}
        />
      )}
      <div className="edit-profile-container">
        <h2>Edit Profile</h2>
        <form action="" className="edit-form">
          <div className="edit-picture-form">
            <div className="edit-profile-picture-info">
              <div className="profile-picture">
                <img
                  src={
                    typeof selectedFile === "string"
                      ? selectedFile
                      : URL.createObjectURL(selectedFile)
                  }
                  alt="Profile"
                  className="profile-picture"
                />
              </div>
              <div className="name-container">
                <span className="edit-user-username-header">
                  {user.username}
                </span>
                <span>{user.fullName}</span>
              </div>
            </div>
            <button className="edit-picture-button" onClick={handleChangePhoto}>
              Change Photo
            </button>
          </div>
          <h3>Bio</h3>
          <textarea
            name="bio"
            id="bio"
            cols="30"
            rows="10"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button type="submit" onClick={submitFormhandler}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
