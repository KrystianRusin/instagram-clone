import React from "react";
import "../../styles/NavItem.css";
import { ClassNames } from "@emotion/react";

const NavItem = ({
  name,
  Icon,
  SelectedIcon,
  selectedItem,
  setSelectedItem,
  hoveredItem,
  setHoveredItem,
  onItemClicked,
  isSearchOpen,
}) => {
  return (
    <a
      className={`nav-item ${isSearchOpen ? "collapsed" : ""}`}
      onClick={(event) => {
        setSelectedItem(name);
        if (onItemClicked) {
          onItemClicked(event);
        }
      }}
      onMouseEnter={() => {
        setHoveredItem(name);
      }}
      onMouseLeave={() => setHoveredItem(false)}
    >
      <span
        className={`${
          hoveredItem === name || selectedItem === name
            ? "nav-item-icon-hovered"
            : "nav-item-icon"
        }`}
      >
        {selectedItem === name ? <SelectedIcon /> : <Icon />}
      </span>
      {!isSearchOpen && <span>{name}</span>}
    </a>
  );
};

export default NavItem;
