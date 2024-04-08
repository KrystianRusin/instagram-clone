import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import instaLogo from "../../assets/instagram-1.svg";
import instaLogoMini from "../../assets/instagram-logo-mini.png";
import "./Nav.css";
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
  createModalHandler,
  isSearchOpen,
  setIsSearchOpen,
  onLogout,
  user,
  navCollapsed,
  setNavCollapsed,
}) => {
  const [selectedItem, setSelectedItem] = useState("Home");
  const [hoveredItem, setHoveredItem] = useState("");
  const [anchorPosition, setAnchorPosition] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const optionsClickHandler = (event) => {
    setAnchorPosition({
      top: event.currentTarget.offsetTop,
      left: event.currentTarget.offsetLeft,
    });
  };

  const handleHomeClick = () => {
    setIsSearchOpen(false);
    setNavCollapsed(false);
    navigate("/home");
  };

  const handleProfileClick = () => {
    setIsSearchOpen(false);
    setNavCollapsed(false);
    navigate(`/${user.username}`);
  };

  const handleSearchClick = () => {
    setNavCollapsed(true);
    setIsSearchOpen(!isSearchOpen);
  };

  const handleMessagesClick = () => {
    setNavCollapsed(true);
    setIsSearchOpen(false);
    navigate("/direct/inbox");
  };

  const handleClose = () => {
    setAnchorPosition(null); // close the menu
  };

  const logoutHandler = () => {
    navigate("/");
    sessionStorage.removeItem("user");
    onLogout(null);
    handleClose(); // close the menu
  };

  return (
    <div className={`nav-container ${navCollapsed ? "collapsed" : ""}`}>
      <div className={`logo-container ${navCollapsed ? "collapsed" : ""}`}>
        <img
          src={navCollapsed ? instaLogoMini : instaLogo}
          alt="Instagram"
          className={`insta-logo ${navCollapsed ? "collapsed" : ""}`}
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
            navCollapsed={navCollapsed}
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
            navCollapsed={navCollapsed}
          />
          <NavItem
            name="Explore"
            Icon={ExploreIcon}
            SelectedIcon={ExploreSelectedIcon}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            navCollapsed={navCollapsed}
          />
          <NavItem
            name="Messages"
            Icon={MessageIcon}
            SelectedIcon={MessageSelectedIcon}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            navCollapsed={navCollapsed}
            onItemClicked={handleMessagesClick}
          />
          <NavItem
            name="Notifications"
            Icon={FavoriteIcon}
            SelectedIcon={FavoriteSelectedIcon}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            navCollapsed={navCollapsed}
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
            navCollapsed={navCollapsed}
          />
          <div
            className={`nav-item ${navCollapsed ? "collapsed" : ""}`}
            onClick={handleProfileClick}
          >
            <img
              src={user.profilePic}
              alt="PLACEHOLDER"
              className="nav-profile-img"
            ></img>
            {!navCollapsed && <p>Profile</p>}
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
          navCollapsed={navCollapsed}
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
  createModalHandler: PropTypes.func.isRequired,
  isSearchOpen: PropTypes.bool.isRequired,
  setIsSearchOpen: PropTypes.func.isRequired,
};

export default Nav;
