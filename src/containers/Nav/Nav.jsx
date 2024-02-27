import React, { useState } from "react";
import instaLogo from "../../assets/instagram-1.svg";
import "../../styles/Nav.css";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import HomeSelectedIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import SearchSelectedIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/ExploreOutlined";
import ExploreSelectedIcon from "@mui/icons-material/Explore";
import MessageIcon from "@mui/icons-material/MessageOutlined";
import MessageSelectedIcon from "@mui/icons-material/Message";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteSelectedIcon from "@mui/icons-material/Favorite";
import AddBoxIcon from "@mui/icons-material/AddBoxOutlined";
import AddBoxSelectedIcon from "@mui/icons-material/AddBox";
import NavItem from "../../components/NavItem/NavItem";
import createModal from "../../components/CreateModal/CreateModal";

const Nav = ({ user, setUser, createModalHandler }) => {
  const [selectedItem, setSelectedItem] = useState("Home");
  const [hoveredItem, setHoveredItem] = useState(null);

  const fontStyle = {
    fontSize: hoveredItem === selectedItem ? 35 : 30,
  };

  const logoutHandler = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="nav-container">
      <img src={instaLogo} alt="Instagram" className="insta-logo" />
      <div className="nav-selection">
        <NavItem
          name="Home"
          Icon={HomeIcon}
          SelectedIcon={HomeSelectedIcon}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        />
        <NavItem
          name="Search"
          Icon={SearchIcon}
          SelectedIcon={SearchSelectedIcon}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        />
        <NavItem
          name="Explore"
          Icon={ExploreIcon}
          SelectedIcon={ExploreSelectedIcon}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        />
        <NavItem
          name="Messages"
          Icon={MessageIcon}
          SelectedIcon={MessageSelectedIcon}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        />
        <NavItem
          name="Notifications"
          Icon={FavoriteIcon}
          SelectedIcon={FavoriteSelectedIcon}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        />
        <NavItem
          name="Create"
          Icon={AddBoxIcon}
          SelectedIcon={AddBoxSelectedIcon}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
          onItemClicked={createModalHandler}
        />
        <p className="nav-item">{user.fullName}</p>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
};

export default Nav;
