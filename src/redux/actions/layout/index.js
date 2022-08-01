// ** Handles Layout Content Width (full / boxed)
export const handleContentWidth = value => dispatch => dispatch({ type: 'HANDLE_CONTENT_WIDTH', value })

// ** Handles Menu Collapsed State (Bool)
export const handleMenuCollapsed = value => dispatch => dispatch({ type: 'HANDLE_MENU_COLLAPSED', value })

// ** Handles Menu Hidden State (Bool)
export const handleMenuHidden = value => dispatch => dispatch({ type: 'HANDLE_MENU_HIDDEN', value })

// ** Handles RTL (Bool)
export const handleRTL = value => dispatch => dispatch({ type: 'HANDLE_RTL', value })


// ** Handles Skin 
export const handleSkin = value => dispatch => dispatch({ type: 'HANDLE_SKIN', value })

// ** Handles Layout 
export const handleLayout = value => dispatch => dispatch({ type: 'HANDLE_LAYOUT', value })

// ** Handles LastLayout 
export const handleLastLayout = value => dispatch => dispatch({ type: 'HANDLE_LAST_LAYOUT', value })

// ** Handles NavbarType 
export const handleNavbarType = value => dispatch => dispatch({ type: 'HANDLE_NAVBAR_TYPE', value })

// ** Handles FooterType 
export const handleFooterType = value => dispatch => dispatch({ type: 'HANDLE_FOOTER_TYPE', value })

// ** Handles NavbarColor 
export const handleNavbarColor = value => dispatch => dispatch({ type: 'HANDLE_NAVBAR_COLOR', value })

