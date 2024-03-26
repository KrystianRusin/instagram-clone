import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
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

const Nav = ({
  user,
  setUser,
  createModalHandler,
  isSearchOpen,
  setIsSearchOpen,
}) => {
  const [selectedItem, setSelectedItem] = useState("Home");
  const [hoveredItem, setHoveredItem] = useState("");
  const [anchorPosition, setAnchorPosition] = useState(null);

  const navigate = useNavigate();

  const optionsClickHandler = (event) => {
    setAnchorPosition({
      top: event.currentTarget.offsetTop,
      left: event.currentTarget.offsetLeft,
    });
  };

  const handleHomeClick = () => {
    setIsSearchOpen(false);
    navigate("/");
  };

  const handleProfileClick = () => {
    setIsSearchOpen(false);
    navigate(`/${user.username}`);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
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
    <div className={`nav-container ${isSearchOpen ? "collapsed" : ""}`}>
      <div className={`logo-container ${isSearchOpen ? "collapsed" : ""}`}>
        <img
          src={isSearchOpen ? instaLogoMini : instaLogo}
          alt="Instagram"
          className={`insta-logo ${isSearchOpen ? "collapsed" : ""}`}
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
            isSearchOpen={isSearchOpen}
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
            isSearchOpen={isSearchOpen}
          />
          <NavItem
            name="Explore"
            Icon={ExploreIcon}
            SelectedIcon={ExploreSelectedIcon}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            isSearchOpen={isSearchOpen}
          />
          <NavItem
            name="Messages"
            Icon={MessageIcon}
            SelectedIcon={MessageSelectedIcon}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            isSearchOpen={isSearchOpen}
          />
          <NavItem
            name="Notifications"
            Icon={FavoriteIcon}
            SelectedIcon={FavoriteSelectedIcon}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            isSearchOpen={isSearchOpen}
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
            isSearchOpen={isSearchOpen}
          />
          <div
            className={`nav-item ${isSearchOpen ? "collapsed" : ""}`}
            onClick={handleProfileClick}
          >
            <img
              src={user.profilePic}
              alt="PLACEHOLDER"
              className="nav-profile-img"
            ></img>
            {!isSearchOpen && <p>Profile</p>}
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
          isSearchOpen={isSearchOpen}
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

Nav.propTypes = {
  user: PropTypes.shape({
    profilePic: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  createModalHandler: PropTypes.func.isRequired,
  isSearchOpen: PropTypes.bool.isRequired,
  setIsSearchOpen: PropTypes.func.isRequired,
};

export default Nav;
