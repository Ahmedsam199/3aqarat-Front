import { lazy } from "react";

const PayMonthly = lazy(() => import("../../../views/App/Report/PayMonthly/index"));
const OwnerProp = lazy(() =>
  import("../../../views/App/Report/OwnerProp/index")
);
const GetExtraPayemnts = lazy(() =>
  import("../../../views/App/Report/getExtraPayemnts/index")
);
export default [
  {
    element: <PayMonthly />,
    path: "/Report/PayMonthly",

    meta: {
      action: "read",
      resource: "DT-2",
    },
  },
  {
    element: <OwnerProp />,
    path: "/Report/OwnerProp",
    meta: {
      action: "read",
      resource: "DT-2",
    },
  },
  {
    element: <GetExtraPayemnts />,
    path: "/Report/getExtraPayemnts",
    meta: {
      action: "read",
      resource: "DT-2",
    },
  },
];
