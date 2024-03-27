import "../../styles/EditProfile.css";

const EditProfile = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

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
          <button className="edit-picture-button" type="submit">
            Change Photo
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
