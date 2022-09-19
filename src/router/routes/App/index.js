// ** React Imports
import { lazy } from 'react'
import Contract from './Contract';
import Properties from './Properties';
import Setup from './Setup';
import Report from './Report';
const Dashboard = lazy(() => import('../../../views/App/Dashboard/index'))

const AppRoutes = [
  {
    element: <Dashboard />,
    path: "/DashBoard",
    meta: {
      action: "read",
      resource: "DASH",
    },
  },
  ...Contract,
  ...Properties,
  ...Setup,
  ...Report,
];

export default AppRoutes
