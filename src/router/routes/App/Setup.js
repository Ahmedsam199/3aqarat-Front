const ContractTemplate = lazy(() => import('../../views/App/Setup/ContractTemplate'))
const ContractType = lazy(() => import('../../views/App/Setup/ContractType'))
const Branches = lazy(() => import('../../views/App/Setup/Branches'))
const PermissionPOST = lazy(() => import('../../views/App/Setup/Permissions/post'))
const Permission = lazy(() => import('../../views/App/Setup/Permissions'))
const Purpose = lazy(() => import('../../views/App/Setup/Purpose'))
const Role = lazy(() => import('../../views/App/Setup/UserRole'))
const User = lazy(() => import('../../views/App/Setup/User'))
export default [
    {
        path: "/Setup/ContractTemplate",
        element: <ContractTemplate />,
        meta: {
            action: "read",
            resource: "DT-4",
        },
    },
    {
        path: "/Setup/ContractType",
        element: <ContractType />,
        meta: {
            action: "read",
            resource: "DT-4",
        },
    },
    {
        path: "/Setup/User",
        element: <User />,
        meta: {
            action: "read",
            resource: "DT-14",
        },
    },
    {
        path: "/Setup/UserRole",
        element: <Role />,
        meta: {
            action: "read",
            resource: "DT-12",
        },
    },
    {
        path: "/Setup/Purpose",
        element: <Purpose />,
        meta: {
            action: "read",
            resource: "DT-11",
        },
    },
    {
        path: "/Setup/Branches",
        element: <Branches />,
        meta: {
            action: "read",
            resource: "DT-1",
        },
    },
    {
        path: "/Setup/Permission",
        element: <Permission />,
    },
    {
        path: "/Setup/NewPermission",
        element: <PermissionPOST />,
    },
    {
        path: "/Setup/UpdatePermission/:series",
        element: <PermissionPOST />,
    },
    {
        path: "/Setup/Template",
        element: <Setup_Template />,
        meta: {
            action: "read",
            resource: "DT-3",
        },
    },
]