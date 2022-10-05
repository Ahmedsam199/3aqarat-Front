// ** Dropdowns Imports
import IntlDropdown from "./IntlDropdown";
import UserDropdown from "./UserDropdown";
import NotificationDropdown from "./NotificationDropdown";
import { useRef, useState } from "react";
// ** Third Party Components
import { Sun, Moon } from "react-feather";
import "./style.css";
// ** Reactstrap Imports
import { NavItem, NavLink } from "reactstrap";

const NavbarUser = (props) => {
  // ** Props
  const { skin, setSkin } = props;
  const [isActive, setIsActive] = useState(false);
  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === "dark") {
      return <Sun className="ficon" onClick={() => setSkin("light")} />;
    } else {
      return <Moon className="ficon" onClick={() => setSkin("dark")} />;
    }
  };

  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      <IntlDropdown />
      <NavItem className=" d-lg-block">
        <NavLink>
          <ThemeToggler />
        </NavLink>
      </NavItem>
      <NotificationDropdown />
      <UserDropdown />
    </ul>
  );
};
export default NavbarUser;
