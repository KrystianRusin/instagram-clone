import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
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

SearchResultCard.propTypes = {
  user: PropTypes.shape({
    profilePic: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
  }).isRequired,
};

export default SearchResultCard;
