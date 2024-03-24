import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SearchResultCard.css";

const SearchResultCard = ({ user }) => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate(`/${user.username}`);
  };

  return (
    <a className="search-card-container" onClick={handleSearchClick}>
      <img src={user.profilePic} alt="profile" />
      <div className="search-card-info">
        <span className="search-card-username">{user.username}</span>
        <span className="search-card-name">{user.fullName}</span>
      </div>
    </a>
  );
};

export default SearchResultCard;
