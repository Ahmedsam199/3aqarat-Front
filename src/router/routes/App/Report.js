import { lazy } from "react";

const PayMonthly = lazy(() => import("../../../views/App/Report/PayMonthly/index"));
const OwnerProp = lazy(() =>
  import("../../../views/App/Report/OwnerProp/index")
);
const GetExtraPayemnts = lazy(() =>
  import("../../../views/App/Report/getExtraPayemnts/index")
);
const ActivityLog = lazy(() =>
  import("../../../views/App/Report/ActivityLog/index")
);
const CollectionInsurance = lazy(() =>
  import("../../../views/App/Report/collectionInsurance/index")
);
const Tenants = lazy(() => import("../../../views/App/Report/Tenants/index"));
const LawyerReport = lazy(() =>
  import("../../../views/App/Report/LawyerReport/index")
);
const PropertyReport = lazy(() =>
  import("../../../views/App/Report/PropertyReport/index"))
  const PaymentReport = lazy(() =>
  import("../../../views/App/Report/PaymentReport/index")
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
  {
    element: <ActivityLog />,
    path: "/Report/ActivityLog",
    meta: {
      action: "read",
      resource: "DT-2",
    },
  },
  {
    element: <CollectionInsurance />,
    path: "/Report/collectionInsurance",
    meta: {
      action: "read",
      resource: "DT-2",
    },
  },
  {
    element: <Tenants />,
    path: "/Report/Tenants",
    meta: {
      action: "read",
      resource: "DT-2",
    },
  },
  {
    element: <LawyerReport />,
    path: "/Report/LawyerReport",
    meta: {
      action: "read",
      resource: "DT-2",
    },
  },
  {
    element: <PropertyReport />,
    path: "/Report/PropertyReport",
    meta: {
      action: "read",
      resource: "DT-2",
    },
  },
  {
    element: <PaymentReport />,
    path: "/Report/PaymentReport",
    meta: {
      action: "read",
      resource: "DT-2",
    },
  },
];
