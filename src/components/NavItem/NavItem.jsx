import "./NavItem.css";
import PropTypes from "prop-types";

const NavItem = ({
  name,
  Icon,
  SelectedIcon,
  selectedItem,
  setSelectedItem,
  hoveredItem,
  setHoveredItem,
  onItemClicked,
  navCollapsed,
}) => {
  return (
    <a
      className={`nav-item ${navCollapsed ? "collapsed" : ""}`}
      onClick={(event) => {
        setSelectedItem(name);
        if (onItemClicked) {
          onItemClicked(event);
        }
      }}
      onMouseEnter={() => {
        setHoveredItem(name);
      }}
      onMouseLeave={() => setHoveredItem("")}
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
      {!navCollapsed && <span>{name}</span>}
    </a>
  );
};

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  SelectedIcon: PropTypes.elementType.isRequired,
  selectedItem: PropTypes.string.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
  hoveredItem: PropTypes.string.isRequired,
  setHoveredItem: PropTypes.func.isRequired,
  onItemClicked: PropTypes.func,
  navCollapsed: PropTypes.bool.isRequired,
};

export default NavItem;
