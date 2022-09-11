// ** Navigation imports

import pages from './pages'
import uiElements from './ui-elements'
import Contract from './Contract'
import Properites from './Properites'
import Setup from './setup'
import DashBoard from './DashBoard'
// ** Merge & Export
export default [...DashBoard, ...Contract, , ...Properites, ...Setup];
