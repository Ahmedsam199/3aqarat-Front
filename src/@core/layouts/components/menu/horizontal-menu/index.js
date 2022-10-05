// ** Horizontal Menu Components
import HorizontalNavMenuItems from './HorizontalNavMenuItems'

const HorizontalMenu = ({ menuData }) => {
  return (
    <div
      style={{ alignItems: "center" }}
      className="navbar-container main-menu-content"
    >
      <ul
        style={{ alignItems: "center" }}
        className="nav navbar-nav  d-flex"
        id="main-menu-navigation"
      >
        <HorizontalNavMenuItems submenu={true} items={menuData} />
      </ul>
    </div>
  );
}

export default HorizontalMenu
