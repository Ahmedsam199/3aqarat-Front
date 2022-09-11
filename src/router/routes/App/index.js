// ** React Imports
import { lazy } from 'react'
import Contract from './Contract';
import Properties from './Properties';
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
    ...Properties
];

export default AppRoutes
