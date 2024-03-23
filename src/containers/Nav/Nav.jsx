import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instaLogo from "../../assets/instagram-1.svg";
import instaLogoMini from "../../assets/instagram-logo-mini.png";
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
import MenuIcon from "@mui/icons-material/Menu";
import NavItem from "../../components/NavItem/NavItem";

import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import createModal from "../../components/CreateModal/CreateModal";

const Nav = ({ user, setUser, createModalHandler }) => {
  const [selectedItem, setSelectedItem] = useState("Home");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [anchorPosition, setAnchorPosition] = useState(null);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);

  const navigate = useNavigate();

  const optionsClickHandler = (event) => {
    setAnchorPosition({
      top: event.currentTarget.offsetTop,
      left: event.currentTarget.offsetLeft,
    });
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate(`/${user.username}`);
  };

  const handleSearchClick = () => {
    navigate("/search");
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  const handleClose = () => {
    setAnchorPosition(null); // close the menu
  };

  const logoutHandler = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    navigate("/login");
    handleClose(); // close the menu
  };

  return (
    <div className={`nav-container ${isNavbarCollapsed ? "collapsed" : ""}`}>
      <div className={`logo-container ${isNavbarCollapsed ? "collapsed" : ""}`}>
        <img
          src={isNavbarCollapsed ? instaLogoMini : instaLogo}
          alt="Instagram"
          className={`insta-logo ${isNavbarCollapsed ? "collapsed" : ""}`}
        />
      </div>
      <div className="nav-selection">
        <div className="main-nav-selection">
          <NavItem
            name="Home"
            Icon={HomeIcon}
            SelectedIcon={HomeSelectedIcon}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            onItemClicked={handleHomeClick}
            isNavbarCollapsed={isNavbarCollapsed}
          />
          <NavItem
            name="Search"
            Icon={SearchIcon}
            SelectedIcon={SearchSelectedIcon}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            onItemClicked={handleSearchClick}
            isNavbarCollapsed={isNavbarCollapsed}
          />
          <NavItem
            name="Explore"
            Icon={ExploreIcon}
            SelectedIcon={ExploreSelectedIcon}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            isNavbarCollapsed={isNavbarCollapsed}
          />
          <NavItem
            name="Messages"
            Icon={MessageIcon}
            SelectedIcon={MessageSelectedIcon}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            isNavbarCollapsed={isNavbarCollapsed}
          />
          <NavItem
            name="Notifications"
            Icon={FavoriteIcon}
            SelectedIcon={FavoriteSelectedIcon}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            isNavbarCollapsed={isNavbarCollapsed}
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
            isNavbarCollapsed={isNavbarCollapsed}
          />
          <div
            className={`nav-item ${isNavbarCollapsed ? "collapsed" : ""}`}
            onClick={handleProfileClick}
          >
            <img
              src={user.profilePic}
              alt="PLACEHOLDER"
              className="nav-profile-img"
            ></img>
            {!isNavbarCollapsed && <p>Profile</p>}
          </div>
        </div>
        <NavItem
          name="More"
          Icon={MenuIcon}
          SelectedIcon={MenuIcon}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
          onItemClicked={optionsClickHandler}
          isNavbarCollapsed={isNavbarCollapsed}
        />
        <Popover
          open={Boolean(anchorPosition)}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={anchorPosition}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          PaperProps={{
            style: {
              width: "17rem",
              borderRadius: "10px",
            },
          }}
        >
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </Popover>
      </div>
    </div>
  );
};

export default Nav;
