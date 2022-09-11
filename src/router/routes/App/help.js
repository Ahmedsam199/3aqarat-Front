const Permissions = lazy(() => import('../../views/App/Permissions'))
const Permissions_POST = lazy(() => import('../../views/App/Permissions/post'))

const Contract_contract = lazy(() => import('../../views/App/contract/contracts'))
const Contract_Payment = lazy(() => import('../../views/App/contract/payment'))
const Contract_New = lazy(() => import('../../views/App/contract/contracts/post'))
const Contract_Payment_New = lazy(() => import('../../views/App/contract/payment/post'))

const Properity_Owner = lazy(() => import('../../views/App/Property/party'))
const Properity_Attribute = lazy(() => import('../../views/App/Property/Property_Attribute'))
const Properity_Property = lazy(() => import('../../views/App/Property/Property'))
const Properity_Property_New = lazy(() => import('../../views/App/Property/Property/post'))
const Properity_Terrority = lazy(() => import('../../views/App/Property/Terrority'))
const Setup_Branches = lazy(() => import('../../views/App/Setup/Branches'))

const NewPer = lazy(() => import('../../views/App/Setup/Permissions/post'))
const Setup_ContractType = lazy(() => import('../../views/App/Setup/ContractType'))

const Setup_Permission = lazy(() => import('../../views/App/Setup/Permissions'))

const Setup_Purpose = lazy(() => import('../../views/App/Setup/Purpose'))

const Setup_User_Role = lazy(() => import('../../views/App/Setup/UserRole'))

const Setup_User = lazy(() => import('../../views/App/Setup/User'))

const Editor = lazy(() => import('../../views/App/Setup/contractTemplate/post'))

const _=[
    {
        element: <Editor />,
        path: "/App/Customer",
    },
    {
        element: <Setup_User />,
        path: "/Setup/User",
        meta: {
            action: "read",
            resource: "DT-14",
        },
    },
    {
        element: <Setup_User_Role />,
        path: "/Setup/UserRole",
        meta: {
            action: "read",
            resource: "DT-12",
        },
    },
    {
        element: <Setup_Purpose />,
        path: "/Setup/Purpose",
        meta: {
            action: "read",
            resource: "DT-11",
        },
    },
    {
        element: <Setup_Permission />,
        path: "/Setup/Permission",
    },
    {
        element: <Setup_ContractType />,
        path: "/Setup/ContractType",
        meta: {
            action: "read",
            resource: "DT-4",
        },
    },
    {
        element: <Setup_Template />,
        path: "/Setup/Template",
        meta: {
            action: "read",
            resource: "DT-3",
        },
    },
    {
        element: <Properity_Terrority />,
        path: "/Properity/Terrority",
        meta: {
            action: "read",
            resource: "DT-13",
        },
    },
    {
        element: <Properity_Property_New />,
        path: "/Properity/Property/New",
        meta: {
            action: "read",
            resource: "DT-8",
        },
    },
    {
        element: <Properity_Property_New />,
        path: "/Properity/Property/Update/:series",
        meta: {
            action: "read",
            resource: "DT-8",
        },
    },
    {
        element: <Properity_Property />,
        path: "/Properity/Properity",
        meta: {
            action: "read",
            resource: "DT-8",
        },
    },
    {
        element: <Properity_Owner />,
        path: "/Properity/Owner",
        meta: {
            action: "read",
            resource: "DT-5",
        },
    },
    {
        element: <Properity_Attribute />,
        path: "/Properity/Attribute",
        meta: {
            action: "read",
            resource: "DT-9",
        },
    },
    {
        element: <Setup_Branches />,
        path: "/Setup/Branchies",
        meta: {
            action: "read",
            resource: "DT-1",
        },
    },
    {
        element: <NewPer />,
        path: "/Setup/NewPer",
    },

    {
        element: <Contract_contract />,
        path: "/App/Contract/Contract",

        meta: {
            action: "read",
            resource: "DT-2",
        },
    },
    {
        element: <NewPer />,
        path: "/Setup/UpdatePer/:series",
    },
    {
        element: <Permissions />,
        path: "/App/Permissions",
        meta: {
            action: "read",
            resource: "DT-7",
        },
    },
    {
        element: <Permissions_POST />,
        path: "/App/NewPermissions",
        meta: {
            action: "read",
            resource: "DT-7",
        },
    },
    {
        element: <NewPer />,
        path: "/Setup/UpdatePer/:series",
        meta: {
            action: "read",
            resource: "DT-7",
        },
    },
    {
        element: <Permissions_POST />,
        path: "/App/UpdatePermissions/:series",
        meta: {
            action: "read",
            resource: "DT-7",
        },
    },
]