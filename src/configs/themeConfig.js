// You can customize the template with the help of this file
// Here Ican Search For Logo And App Name
//Template config options
const themeConfig = {
  app: {
    appName: "Real Estate",
    appLogoImage: require("@src/assets/images/logo/logo.svg").default,
  },
  layout: {
    isRTL: false,
    skin: "light", // light, dark, bordered, semi-dark
    type: "horizontal", // vertical, horizontal
    contentWidth: "boxed", // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false,
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: "static", // static , sticky , floating, hidden
      backgroundColor: "white", // BS color options [primary, success, etc]
    },
    footer: {
      type: "static", // static, sticky, hidden
    },
    customizer: false,
    scrollTop: false, // Enable scroll to top button
    toastPosition: "top-right", // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
  },
};

export default themeConfig;
