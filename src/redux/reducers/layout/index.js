// ** ThemeConfig Import
import themeConfig from '@configs/themeConfig'

// ** Returns Initial Menu Collapsed State
const initialMenuCollapsed = () => {
  const item = window.localStorage.getItem('menuCollapsed')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed
}
const initialSkin = () => {
  const item = window.localStorage.getItem('skin')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.skin
}
// ** Initial State
const initialState = {
  isRTL: themeConfig.layout.isRTL,
  menuCollapsed: initialMenuCollapsed(),
  menuHidden: themeConfig.layout.menu.isHidden,
  contentWidth: themeConfig.layout.contentWidth,
  skin: initialSkin(),
  layout: themeConfig.layout.type,
  lastLayout: themeConfig.layout.type,
  footerType: themeConfig.layout.footer.type,
  navbarType: themeConfig.layout.navbar.type,
  navbarColor: themeConfig.layout.navbar.backgroundColor
}

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HANDLE_CONTENT_WIDTH':
      return { ...state, contentWidth: action.value }
    case 'HANDLE_MENU_COLLAPSED':
      window.localStorage.setItem('menuCollapsed', action.value)
      return { ...state, menuCollapsed: action.value }
    case 'HANDLE_MENU_HIDDEN':
      return { ...state, menuHidden: action.value }
    case 'HANDLE_RTL':
      return { ...state, isRTL: action.value }
    case 'HANDLE_SKIN':
      return { ...state, skin: action.value }
    case 'HANDLE_LAYOUT':
      return { ...state, layout: action.value }
    case 'HANDLE_LAST_LAYOUT':
      return { ...state, lastLayout: action.value }
    case 'HANDLE_FOOTER_TYPE':
      return { ...state, footerType: action.value }
    case 'HANDLE_NAVBAR_TYPE':
      return { ...state, navbarType: action.value }
    case 'HANDLE_NAVBAR_COLOR':
      return { ...state, navbarColor: action.value }
    default:
      return state
  }
}

export default layoutReducer
