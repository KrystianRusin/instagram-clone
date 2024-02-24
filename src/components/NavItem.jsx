import React from "react";
import "../styles/NavItem.css";

const NavItem = ({
  name,
  Icon,
  SelectedIcon,
  selectedItem,
  setSelectedItem,
  hoveredItem,
  setHoveredItem,
}) => {
  const isHoveredOrSelected = hoveredItem === name || selectedItem === name;

  return (
    <p
      className="nav-item"
      onClick={() => setSelectedItem(name)}
      onMouseEnter={() => setHoveredItem(name)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <span>
        {selectedItem === name ? (
          <SelectedIcon style={{ fontSize: isHoveredOrSelected ? 35 : 30 }} />
        ) : (
          <Icon style={{ fontSize: isHoveredOrSelected ? 35 : 30 }} />
        )}
      </span>
      <span>{name}</span>
    </p>
  );
};

export default NavItem;