// ** React Imports
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// ** Store & Actions
import { useSelector, useDispatch } from "react-redux";
import { handleMenuHidden, handleContentWidth } from "@store/actions/layout";

// ** Third Party Components
import classnames from "classnames";
import { ArrowUp } from "react-feather";

// ** Reactstrap Imports
import { Navbar, NavItem, Button } from "reactstrap";

// ** Configs
import themeConfig from "@configs/themeConfig";

// ** Custom Components

import Customizer from "@components/customizer";
import ScrollToTop from "@components/scrolltop";
import NavbarComponent from "./components/navbar";
import FooterComponent from "./components/footer";
import MenuComponent from "./components/menu/horizontal-menu";

// ** Custom Hooks
import { useRTL } from "@hooks/useRTL";
import { useSkin } from "@hooks/useSkin";
import { useLayout } from "@hooks/useLayout";
import { useNavbarType } from "@hooks/useNavbarType";
import { useFooterType } from "@hooks/useFooterType";
import { useNavbarColor } from "@hooks/useNavbarColor";

// ** Styles
import "@styles/base/core/menu/menu-types/horizontal-menu.scss";

const HorizontalLayout = (props) => {
  // ** Props
  const { navbar, menuData, footer, children, menu } = props;

  // ** Hooks
  const { skin, setSkin } = useSkin();
  const [isRtl, setIsRtl] = useRTL();
  const { navbarType, setNavbarType } = useNavbarType();
  const { footerType, setFooterType } = useFooterType();
  const { navbarColor, setNavbarColor } = useNavbarColor();
  const { layout, setLayout, setLastLayout } = useLayout();

  // ** States
  const [isMounted, setIsMounted] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);

  // ** Store Vars
  const dispatch = useDispatch();
  const layoutStore = useSelector((state) => state.layout);

  // ** Vars
  const contentWidth = layoutStore.contentWidth;
  const isHidden = layoutStore.menuHidden;

  // ** Handles Content Width
  const setContentWidth = (val) => dispatch(handleContentWidth(val));

  // ** Handles Content Width
  const setIsHidden = (val) => dispatch(handleMenuHidden(val));

  // ** UseEffect Cleanup
  const cleanup = () => {
    setIsMounted(false);
    setNavbarScrolled(false);
  };

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true);
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 65 && navbarScrolled === false) {
        setNavbarScrolled(true);
      }
      if (window.pageYOffset < 65) {
        setNavbarScrolled(false);
      }
    });
    return () => cleanup();
  }, []);

  // ** Vars
  const footerClasses = {
    static: "footer-static",
    sticky: "footer-fixed",
    hidden: "footer-hidden",
  };

  const navbarWrapperClasses = {
    floating: "navbar-floating",
    sticky: "navbar-sticky",
    static: "navbar-static",
  };

  const navbarClasses = {
    floating:
      contentWidth === "boxed" ? "floating-nav container-xxl" : "floating-nav",
    sticky: "fixed-top",
  };

  const bgColorCondition =
    navbarColor !== "" && navbarColor !== "light" && navbarColor !== "white";

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={classnames(
        `wrapper horizontal-layout horizontal-menu  ${""} ${
          footerClasses[footerType] || "footer-static"
        } `
      )}
    >
      <div className="">
        {!isHidden ? (
          <div className="header-navbar ">
            <Navbar
              tag="div"
              expand="sm"
              light={skin !== "dark"}
              dark={skin === "dark" || bgColorCondition}
              className={classnames(
                `header-navbar navbar-horizontal navbar-shadow menu-border`,
                {
                  [navbarClasses[navbarType]]: navbarType !== "sticky",
                  "sticky-nav":
                    (!navbarClasses[navbarType] && navbarType !== "sticky") ||
                    navbarType === "sticky",
                }
              )}
            >
              {menu ? (
                menu({ menuData, routerProps, currentActiveItem })
              ) : (
                <div
                  className="navbar-container d-flex content"
                  style={{ justifyContent: "space-between" }}
                >
                  <div style={{ display: "flex" }}>
                    <MenuComponent menuData={menuData} />
                  </div>
                  <div className="ml-5" style={{ marginTop: "1rem" }}>
                    {navbar ? (
                      navbar({ skin, setSkin })
                    ) : (
                      <NavbarComponent skin={skin} setSkin={setSkin} />
                    )}
                  </div>
                </div>
              )}
            </Navbar>
          </div>
        ) : null}
      </div>

      {children}
      {themeConfig.layout.customizer === true ? (
        <Customizer
          skin={skin}
          isRtl={isRtl}
          layout={layout}
          setSkin={setSkin}
          setIsRtl={setIsRtl}
          isHidden={isHidden}
          setLayout={setLayout}
          footerType={footerType}
          navbarType={navbarType}
          setIsHidden={setIsHidden}
          themeConfig={themeConfig}
          navbarColor={navbarColor}
          contentWidth={contentWidth}
          setFooterType={setFooterType}
          setNavbarType={setNavbarType}
          setLastLayout={setLastLayout}
          setNavbarColor={setNavbarColor}
          setContentWidth={setContentWidth}
        />
      ) : null}
      <footer
        className={classnames(
          `footer footer-light ${footerClasses[footerType] || "footer-static"}`,
          {
            "d-none": footerType === "hidden",
          }
        )}
      >
        {footer ? (
          footer
        ) : (
          <FooterComponent
            footerType={footerType}
            footerClasses={footerClasses}
          />
        )}
      </footer>

      {themeConfig.layout.scrollTop === true ? (
        <div className="scroll-to-top">
          <ScrollToTop showOffset={300} className="scroll-top d-block">
            <Button className="btn-icon" color="primary">
              <ArrowUp size={14} />
            </Button>
          </ScrollToTop>
        </div>
      ) : null}
    </div>
  );
};
export default HorizontalLayout;
