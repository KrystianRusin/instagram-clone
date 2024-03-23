import React, { useEffect, useState } from "react";
import "../../styles/Search.css";
import SearchResultCard from "../../components/SearchResultCard/SearchResultCard";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const searchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/users/search/${searchTerm}`
        );
        const data = await response.json();
        setSearchResults(data);
        console.log(searchResults);
      } catch (error) {
        console.log(error);
      }
    };
    if (searchTerm !== "") {
      searchUser();
    }
  }, [searchTerm]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
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

export default Search;
