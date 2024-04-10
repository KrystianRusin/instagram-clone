import { useState, useEffect } from "react";
import SearchResultCard from "../SearchResultCard/SearchResultCard";
import "./newChatModal.css";

const newChatModal = (setShowModal) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recipient, setRecipient] = useState(null);

  const closeModal = (e) => {
    if (e.target.classList.contains("new-chat-modal-wrapper")) {
      setShowModal(false);
    }
  };

  const handleSetRecipient = (e, result) => {
    e.preventDefault();
    console.log(result._id);
    setRecipient(result._id);
    console.log(recipient === result._id);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const searchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/users/search/${searchTerm}`
        );
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (searchTerm !== "") {
      searchUser();
    }
  }, [searchTerm]);

  return (
    <div className="new-chat-modal-wrapper" onClick={closeModal}>
      <div className="new-chat-modal-container">
        <h1 className="new-chat-modal-header">New Message</h1>
        <form className="new-chat-modal-form">
          <div className="new-chat-recipient-container">
            <div className="new-chat-recipient-input-container">
              <span className="new-chat-recipient-label">To: </span>
              <input
                type="text"
                placeholder="Search.."
                className="new-chat-recipient-input"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div className="new-chat-search-results">
              {searchResults.map((result, index) => (
                <div key={index} className="new-chat-search-result">
                  <SearchResultCard user={result} />
                  <button
                    type="button "
                    onClick={(e) => handleSetRecipient(e, result)}
                    className={`select-recipient-btn ${
                      recipient === result._id
                        ? "selected"
                        : ""
                        ? "selected"
                        : ""
                    }`}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="new-chat-submit"
            disabled={!recipient}
            onClick={handleChatSubmit}
          >
            Chat
          </button>
        </form>
      </div>
    </div>
  );
};
export default newChatModal;
