// ** Icons Import
import { Activity, CreditCard, DollarSign, Edit, Edit2, FilePlus, Home, TrendingUp, User, Users } from "react-feather";

export default [
  {
    id: "Reports",
    title: "Reports",
    icon: <Edit size={12} />,

    children: [
      // {
      //   id: "Pay Monthly Report",
      //   title: "Pay Monthly Report",
      //   icon: <DollarSign size={12} />,
      //   action: "read",
      //   resource: "DT-2",
      //   navLink: "/Report/PayMonthly",
      // },
      {
        id: "OwnerProp",
        title: "Owner Property",
        icon: <Users size={12} />,
        action: "read",
        resource: "DT-2",
        navLink: "/Report/OwnerProp",
      },
      // {
      //   id: "get Extra Payments",
      //   title: "get Extra Payments",
      //   icon: <TrendingUp size={12} />,
      //   action: "read",
      //   resource: "DT-2",
      //   navLink: "/Report/getExtraPayemnts",
      // },
      {
        id: "ActivityLog",
        title: "ActivityLog",
        icon: <Activity size={12} />,
        action: "read",
        resource: "DT-2",
        navLink: "/Report/ActivityLog",
      },
      // {
      //   id: "collectionInsurance",
      //   title: "Collection Insurance",
      //   icon: <Edit2 size={12} />,
      //   action: "read",
      //   resource: "DT-2",
      //   navLink: "/Report/collectionInsurance",
      // },
      // {
      //   id: "Tenants",
      //   title: "Tenants",
      //   icon: <Home size={12} />,
      //   action: "read",
      //   resource: "DT-2",
      //   navLink: "/Report/Tenants",
      // },
      {
        id: "LawyerReport",
        title: "Lawyer Report",
        icon: <User size={12} />,
        action: "read",
        resource: "DT-2",
        navLink: "/Report/LawyerReport",
      },
      {
        id: "PropertyReport",
        title: "Property Report",
        icon: <Home size={12} />,
        action: "read",
        resource: "DT-2",
        navLink: "/Report/PropertyReport",
      },
      {
        id: "PaymentReport",
        title: "Payment Report",
        icon: <FilePlus size={12} />,
        action: "read",
        resource: "DT-2",
        navLink: "/Report/PaymentReport",
      },
    ],
  },
];
