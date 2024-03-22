import React, { useEffect, useState } from "react";
import "../../styles/Search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const searchUser = async () => {
      try {
        const response = await fetch(`/api/users/search/${searchTerm}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.log(error);
      }
    };
    searchUser();
  }, [searchTerm]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="search-results">{searchTerm}</div>
    </div>
  );
};

export default Search;
