// ** React Imports
import { element } from 'prop-types'
import { lazy } from 'react'


const Permissions = lazy(() => import('../../views/App/Permissions'))
const Permissions_POST = lazy(() => import('../../views/App/Permissions/post'))
const Contract_contract = lazy(() => import('../../views/App/contract/contracts'))
const Contract_Payment = lazy(() => import('../../views/App/contract/payment'))
const Contract_New = lazy(() => import('../../views/App/contract/contracts/post'))
const Contract_Payment_New = lazy(() => import('../../views/App/contract/payment/post'))
const Properity_Owner = lazy(() => import('../../views/App/Property/Owner/index'))
const Properity_Attribute = lazy(() => import('../../views/App/Property/Property_Attribute'))
const Properity_Property = lazy(() => import('../../views/App/Property/Property'))
const Properity_Property_New = lazy(() => import('../../views/App/Property/Property/post'))
const Properity_Terrority = lazy(() => import('../../views/App/Property/Terrority'))
const Setup_Branches = lazy(() => import('../../views/App/Setup/Branches'))
const NewPer = lazy(() => import('../../views/App/Setup/Permissions/post'))
const Setup_Template = lazy(() => import('../../views/App/Setup/contractTemplate'))
const Setup_ContractType = lazy(() => import('../../views/App/Setup/ContractType'))
const Setup_Permission = lazy(() => import('../../views/App/Setup/Permissions/index'))
const Setup_Purpose = lazy(() => import('../../views/App/Setup/Purpose'))
const Setup_User_Role = lazy(() => import('../../views/App/Setup/UserRole'))
const Setup_User = lazy(() => import('../../views/App/Setup/User'))
const Editor = lazy(() => import('../../views/App/Setup/contractTemplate/post'))
const Dashboad = lazy(() => import('../../views/App/Dashboard/index'))
const PrintCustomization = lazy(() => import('../../views/App/Setup/PrintCustomization/index'))
const PrintCustomizationPOST = lazy(() => import('../../views/App/Setup/PrintCustomization/post'))
const AppRoutes = [
  // {
  //   element: <Dashboad />,
  //   path: "/DashBoard",
  //   meta: {
  //     action: "read",
  //     resource: "DASH",
  //   },
  // },
  // {
  //   element: <Editor />,
  //   path: "/App/Customer",
  // },
  // {
  //   element: <Contract_New />,
  //   path: "/contract/New",
  //   meta: {
  //     action: "read",
  //     resource: "DT-2",
  //   },
  // },
  // {
  //   element: <Contract_New />,
  //   path: "/UpdateContract/:series",
  //   meta: {
  //     action: "read",
  //     resource: "DT-2",
  //   },
  // },
  // {
  //   element: <Setup_User />,
  //   path: "/Setup/User",
  //   meta: {
  //     action: "read",
  //     resource: "DT-14",
  //   },
  // },
  // {
  //   element: <Setup_User_Role />,
  //   path: "/Setup/UserRole",
  //   meta: {
  //     action: "read",
  //     resource: "DT-12",
  //   },
  // },
  // {
  //   element: <Setup_Purpose />,
  //   path: "/Setup/Purpose",
  //   meta: {
  //     action: "read",
  //     resource: "DT-11",
  //   },
  // },
  // {
  //   element: <Setup_Permission />,
  //   path: "/Setup/Permission",meta: {
  //     action: "read",
  //     resource: "DT-4",
  //   },
  // },
  // {
  //   element: <Setup_ContractType />,
  //   path: "/Setup/ContractType",
  //   meta: {
  //     action: "read",
  //     resource: "DT-4",
  //   },
  // },
  // {
  //   element: <Setup_Template />,
  //   path: "/Setup/Template",
  //   meta: {
  //     action: "read",
  //     resource: "DT-3",
  //   },
  // },
  // {
  //   element: <Properity_Terrority />,
  //   path: "/Properity/Terrority",
  //   meta: {
  //     action: "read",
  //     resource: "DT-13",
  //   },
  // },
  // {
  //   element: <Properity_Property_New />,
  //   path: "/Properity/Property/New",
  //   meta: {
  //     action: "read",
  //     resource: "DT-8",
  //   },
  // },
  // {
  //   element: <Properity_Property_New />,
  //   path: "/Properity/Property/Update/:series",
  //   meta: {
  //     action: "read",
  //     resource: "DT-8",
  //   },
  // },
  // {
  //   element: <Properity_Property />,
  //   path: "/Properity/Properity",
  //   meta: {
  //     action: "read",
  //     resource: "DT-8",
  //   },
  // },
  // {
  //   element: <Properity_Owner />,
  //   path: "/Properity/Owner",
  //   meta: {
  //     action: "read",
  //     resource: "DT-5",
  //   },
  // },
  // {
  //   element: <Properity_Attribute />,
  //   path: "/Properity/Attribute",
  //   meta: {
  //     action: "read",
  //     resource: "DT-9",
  //   },
  // },
  // {
  //   element: <Setup_Branches />,
  //   path: "/Setup/Branchies",
  //   meta: {
  //     action: "read",
  //     resource: "DT-1",
  //   },
  // },
  // {
  //   element: <NewPer />,
  //   path: "/Setup/NewPer",
  //   meta: {
  //     action: "read",
  //     resource: "DT-7",
  //   },
  // },

  // {
  //   element: <Contract_contract />,
  //   path: "/App/Contract/Contract",

  //   meta: {
  //     action: "read",
  //     resource: "DT-2",
  //   },
  // },

  // {
  //   element: <Contract_Payment_New />,
  //   path: "/App/Contract/Payment/new",
  //   meta: {
  //     action: "read",
  //     resource: "DT-6",
  //   },
  // },
  // {
  //   element: <Contract_Payment_New />,
  //   path: "/Payment/Update/:series",
  //   meta: {
  //     action: "read",
  //     resource: "DT-6",
  //   },
  // },
  // {
  //   element: <NewPer />,
  //   path: "/Setup/UpdatePer/:series",
    // meta: {
    //   action: "read",
    //   resource: "DT-7",
    // },
  // },

  // {
  //   element: <Contract_Payment />,
  //   path: "/App/Contract/Payment",
  //   meta: {
  //     action: "read",
  //     resource: "DT-6",
  //   },
  // },
  // // {
  // //   element: lazy(() => import('../../views/App/GeneralLedger')),
  // //   path: '/App/GeneralLedger',
  // //   meta: {
  // //     appLayout: true,
  // //   }
  // // },
  // {
  //   element: <Permissions />,
  //   path: "/App/Permissions",
  //   meta: {
  //     action: "read",
  //     resource: "DT-7",
  //   },
  // },
  // {
  //   element: <Permissions_POST />,
  //   path: "/App/NewPermissions",
  //   meta: {
  //     action: "read",
  //     resource: "DT-7",
  //   },
  // },
  // {
  //   element: <NewPer />,
  //   path: "/Setup/UpdatePer/:series",
  //   meta: {
  //     action: "read",
  //     resource: "DT-7",
  //   },
  // },
  // {
  //   element: <Permissions_POST />,
  //   path: "/App/UpdatePermissions/:series",
  //   meta: {
  //     action: "read",
  //     resource: "DT-7",
  //   },
  // },
  // {
  //   element: <PrintCustomization />,
  //   path: "/Setup/PrintCustomization/",
  //   meta: {
  //     action: "read",
  //     resource: "DT-3",
  //   },
  // },
  // {
  //   element: <PrintCustomizationPOST />,
  //   path: "/Setup/NewPrintCustomization/:name/:doctype/:isRtl/:isLandscape",
  //   meta: {
  //     action: "read",
  //     resource: "DT-3",
  //   },
  // },
  // {
  //   element: <PrintCustomizationPOST />,
  //   path: "/Setup/UpdatePrintCustomization/:series/:name/:doctype/:isRtl/:isReceipt/:isDefault/:isLandscape",
  //   meta: {
  //     action: "read",
  //     resource: "DT-3",
  //   },
  // },
];

export default AppRoutes
