import { read } from "fs";
import { lazy } from "react";

const ContractTemplate = lazy(() =>
  import("../../../views/App/Setup/ContractTemplate")
);
const ContractTemplatePOST = lazy(() =>
  import("../../../views/App/Setup/ContractTemplate/post")
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
const Role = lazy(() => import("../../../views/App/Setup/Role"));
const User = lazy(() => import("../../../views/App/Setup/User"));
const PaymentTypes = lazy(() => import("../../../views/App/Setup/PaymentTypes"));
const Currency =lazy(()=>import('../../../views/App/Setup/Currency'))
const PaymentTermTemplate = lazy(() =>
  import("../../../views/App/Setup/PaymentTermTemplate")
);
const NewPaymentTerm = lazy(() =>
  import("../../../views/App/Setup/PaymentTermTemplate/post")
);
const CurrencyExchange = lazy(() => import("../../../views/App/Setup/CurrencyExchange"));
const PropertyType = lazy(() =>
  import("../../../views/App/Setup/PropertyType")
);
export default [
  {
    element: <ContractTemplate />,
    path: "/Setup/ContractTemplate/",
    meta: {
      action: "read",
      resource: "DT-3",
    },
  },
  {
    element: <ContractTemplatePOST />,
    path: "/Setup/NewContractTemplate/:name/:doctype/:isRtl/:isLandscape",
    meta: {
      action: "read",
      resource: "DT-3",
    },
  },
  {
    element: <ContractTemplatePOST />,
    path: "/Setup/UpdateContractTemplate/:series/:name/:doctype/:isRtl/:isReceipt/:isDefault/:isLandscape",
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
    path: "/Setup/Role",
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
  {
    path: "/Setup/PaymentTypes",
    element: <PaymentTypes />,
    meta: {
      action: "read",
      resource: "DT-7",
    },
  },
  {
    path: "/Setup/PaymentTermTemplate",
    element: <PaymentTermTemplate />,
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
  {
    path: "/Setup/Currency",
    element: <Currency />,
    meta: {
      action: "read",
      resource: "DT-3",
    },
  },
  {
    path: "/Setup/CurrencyExchange",
    element: <CurrencyExchange />,
    meta: {
      action: "read",
      resource: "DT-3",
    },
  },
  {
    path: "/Setup/PropertyType",
    element: <PropertyType />,
    meta: {
      action: "read",
      resource: "DT-3",
    },
  },
  {
    path: "/Setup/NewPaymentTermTemplate",
    element: <NewPaymentTerm />,
    meta: {
      action: "read",
      resource: "DT-3",
    },
  },
  {
    path: "/Setup/UpdatePaymentTermTemplate/:series",
    element: <NewPaymentTerm />,
    meta: {
      action: "read",
      resource: "DT-3",
    },
  },
];
