import { lazy } from "react";

const ContractTemplate = lazy(() =>
  import("../../../views/App/Setup/contractTemplate")
);
const PrintCustomization = lazy(() =>
  import("../../../views/App/Setup/PrintCustomization/index")
);
const PrintCustomizationPOST = lazy(() =>
  import("../../../views/App/Setup/PrintCustomization/post")
);

const ContractType = lazy(() =>
  import("../../../views/App/Setup/ContractType")
);
const Branches = lazy(() => import("../../../views/App/Setup/Branches"));
const PermissionPOST = lazy(() =>
  import("../../../views/App/Setup/Permissions/post")
);
const Permission = lazy(() => import("../../../views/App/Setup/Permissions"));
const Purpose = lazy(() => import("../../../views/App/Setup/Purpose"));
const Role = lazy(() => import("../../../views/App/Setup/UserRole"));
const User = lazy(() => import("../../../views/App/Setup/User"));
export default [
  {
    element: <PrintCustomization />,
    path: "/Setup/PrintCustomization/",
    meta: {
      action: "read",
      resource: "DT-3",
    },
  },
  {
    element: <PrintCustomizationPOST />,
    path: "/Setup/NewPrintCustomization/:name/:doctype/:isRtl/:isLandscape",
    meta: {
      action: "read",
      resource: "DT-3",
    },
  },
  {
    element: <PrintCustomizationPOST />,
    path: "/Setup/UpdatePrintCustomization/:series/:name/:doctype/:isRtl/:isReceipt/:isDefault/:isLandscape",
    meta: {
      action: "read",
      resource: "DT-3",
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
    meta: {
      action: "read",
      resource: "DT-7",
    },
  },
  {
    path: "/Setup/NewPermission",
    element: <PermissionPOST />,
    meta: {
      action: "read",
      resource: "DT-7",
    },
  },
  {
    path: "/Setup/UpdatePermission/:series",
    element: <PermissionPOST />,
    meta: {
      action: "read",
      resource: "DT-7",
    },
  },
  // {
  //     path: "/Setup/Template",
  //     element: <Setup_Template />,
  //     meta: {
  //         action: "read",
  //         resource: "DT-3",
  //     },
  // },
];