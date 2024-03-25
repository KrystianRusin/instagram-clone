import PropTypes from "prop-types";
import "../../styles/Comment.css";

const Comment = ({ comment }) => {
  return (
    <span className="modal-comment-content">
      <img
        src={comment.user.profilePic}
        alt="Placeholder"
        className="nav-profile-img"
      />
      <span className="modal-comment-information">
        <span className="modal-comment-text">
          <h4>{comment.user.username}: </h4>
          <p>{comment.text}</p>
        </span>
        <p className="time-posted">4m</p>
      </span>
    </span>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    user: PropTypes.shape({
      profilePic: PropTypes.string,
      username: PropTypes.string,
    }),
    text: PropTypes.string,
  }).isRequired,
};

export default Comment;
