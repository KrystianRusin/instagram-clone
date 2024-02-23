import React from "react";
import instaLogo from "../../assets/instagram-1.svg";
import "../../styles/Nav.css";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import MessageIcon from "@mui/icons-material/Message";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const Nav = () => {
  const fontStyle = {
    fontSize: 30,
  };

  return (
    <div className="nav-container">
      <img src={instaLogo} alt="Instagram" className="insta-logo" />
      <div className="nav-selection">
        <p className="nav-item">
          <HomeIcon style={fontStyle} />
          Home
        </p>
        <p className="nav-item">
          <SearchIcon style={fontStyle} />
          Search
        </p>
        <p className="nav-item">
          <ExploreIcon style={fontStyle} />
          Explore
        </p>
        <p className="nav-item">
          <MessageIcon style={fontStyle} />
          Messages
        </p>
        <p className="nav-item">
          <FavoriteIcon style={fontStyle} />
          Notifications
        </p>
        <p className="nav-item">
          <AddBoxIcon style={fontStyle} />
          Create
        </p>
        <p className="nav-item">Profile</p>
      </div>
    </div>
  );
};

export default Nav;
