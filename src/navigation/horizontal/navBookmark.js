// ** React Imports
import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components
import * as Icon from "react-feather";
import classnames from "classnames";

// ** Custom Component
import Autocomplete from "@components/autocomplete";

// ** Reactstrap Imports
import {
  NavItem,
  NavLink,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown,
} from "reactstrap";
// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import {
  getBookmarks,
  updateBookmarked,
  handleSearchQuery,
} from "@store/actions/navbar";

const NavbarBookmarks = (props) => {
  // ** Props
  const { setMenuVisibility } = props;

  // ** State
  const [value, setValue] = useState("");
  const [openSearch, setOpenSearch] = useState(false);

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.navbar);

  // ** ComponentDidMount
  useEffect(() => {
    dispatch(getBookmarks());
  }, []);

  // ** Loops through Bookmarks Array to return Bookmarks
  const renderBookmarks = () => {
    if (store.bookmarks.length) {
      return store.bookmarks
        .map((item) => {
          const IconTag = Icon[item.icon];
          return (
            <NavItem key={item.target} className="d-none d-lg-block">
              <NavLink tag={Link} to={item.link} id={item.target}>
                <>Test</>
                <IconTag className="ficon" />
                <UncontrolledTooltip target={item.target}>
                  {item.title}
                </UncontrolledTooltip>
              </NavLink>
            </NavItem>
          );
        })
        .slice(0, 10);
    } else {
      return null;
    }
  };

  // ** If user has more than 10 bookmarks then add the extra Bookmarks to a dropdown
  const renderExtraBookmarksDropdown = () => {
    if (store.bookmarks.length && store.bookmarks.length >= 11) {
      return (
        <NavItem className="d-none d-lg-block">
          <NavLink tag="span">
            <UncontrolledDropdown>
              <DropdownToggle tag="span">
                <Icon.ChevronDown className="ficon" />
              </DropdownToggle>
              <DropdownMenu end>
                {store.bookmarks
                  .map((item) => {
                    const IconTag = Icon[item.icon];
                    return (
                      <DropdownItem tag={Link} to={item.link} key={item.id}>
                        <IconTag className="me-50" size={14} />
                        <span className="align-middle">{item.title}</span>
                      </DropdownItem>
                    );
                  })
                  .slice(10)}
              </DropdownMenu>
            </UncontrolledDropdown>
          </NavLink>
        </NavItem>
      );
    } else {
      return null;
    }
  };

  // ** Removes query in store
  const handleClearQueryInStore = () => dispatch(handleSearchQuery(""));

  // ** Loops through Bookmarks Array to return Bookmarks
  const onKeyDown = (e) => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      setTimeout(() => {
        setOpenSearch(false);
        handleClearQueryInStore();
      }, 1);
    }
  };

  // ** Function to toggle Bookmarks
  const handleBookmarkUpdate = (id) => dispatch(updateBookmarked(id));

  // ** Function to handle Bookmarks visibility
  const handleBookmarkVisibility = () => {
    setOpenSearch(!openSearch);
    setValue("");
    handleClearQueryInStore();
  };

  // ** Function to handle Input change
  const handleInputChange = (e) => {
    setValue(e.target.value);
    dispatch(handleSearchQuery(e.target.value));
  };

  // ** Function to handle external Input click
  const handleExternalClick = () => {
    if (openSearch === true) {
      setOpenSearch(false);
      handleClearQueryInStore();
    }
  };

  // ** Function to clear input value
  const handleClearInput = (setUserInput) => {
    if (!openSearch) {
      setUserInput("");
      handleClearQueryInStore();
    }
  };

  return <Fragment>{/* Navbar */}</Fragment>;
};

export default NavbarBookmarks;
