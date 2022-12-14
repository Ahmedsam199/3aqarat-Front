// ** Navigation imports
import {
    PieChart
} from "react-feather";

import Contract from './Contract';
import Properties from './Properties';
import Setup from './setup';
import Report from "./Report";

export default [
  {
    id: "DashBoard",
    title: "DashBoard",
    action: "read",
    resource: "DASH",
    icon: <PieChart size={12} />,

    permissions: ["admin", "editor"],
    navLink: "/DashBoard",
  },
  ...Contract,
  ...Properties,
  ...Setup,
  ...Report,

];
