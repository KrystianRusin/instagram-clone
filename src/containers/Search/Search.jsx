import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Search.css";
import SearchResultCard from "../../components/SearchResultCard/SearchResultCard";

const Search = ({ isSearchOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //Search for users based on the search term
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
    <div className={`search-container ${isSearchOpen ? "expanded" : ""}`}>
      <div className="search-header-container">
        <span className="search-title">Search</span>
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {searchTerm ? (
        <div className="search-results">
          {searchResults.map((result, index) => (
            <SearchResultCard key={index} user={result} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

Search.propTypes = {
  isSearchOpen: PropTypes.bool.isRequired,
};

export default Search;
