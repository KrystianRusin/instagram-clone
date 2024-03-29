import "../../styles/EditProfile.css";

const EditProfile = ({ setOpenEditProfileModal }) => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleChangePhoto = () => {
    setOpenEditProfileModal(true);
  };

  return (
    <div className="edit-profile-wrapper">
      <div className="edit-profile-container">
        <h2>Edit Profile</h2>
        <div className="edit-picture-form">
          <div className="edit-profile-picture-info">
            <div className="profile-picture">
              <img
                src={user.profilePic}
                alt="Profile"
                className="profile-picture"
              />
            </div>
            <div className="name-container">
              <span className="edit-user-username-header">{user.username}</span>
              <span>{user.fullName}</span>
            </div>
          </div>
          <button className="edit-picture-button" onClick={handleChangePhoto}>
            Change Photo
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
