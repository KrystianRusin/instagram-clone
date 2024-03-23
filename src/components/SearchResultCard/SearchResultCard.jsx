import React from "react";
import "../../styles/SearchResultCard.css";

const SearchResultCard = ({ user }) => {
  console.log(user);

  return (
    <div className="search-card-container">
      <img src={user.profilePic} alt="profile" />
      <div className="search-card-info">
        <span className="search-card-username">{user.username}</span>
        <span className="search-card-name">{user.fullName}</span>
      </div>
    </div>
  );
};

export default SearchResultCard;
