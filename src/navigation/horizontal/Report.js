// ** Icons Import
import { CreditCard, Edit, Edit2 } from "react-feather";

export default [
  {
    id: "Reports",
    title: "Reports",
    icon: <Edit size={12} />,

    children: [
      {
        id: "Pay Monthly Report",
        title: "Pay Monthly Report",
        icon: <Edit2 size={12} />,
        action: "read",
        resource: "DT-2",
        navLink: "/Report/PayMonthly",
      },
      {
        id: "OwnerProp",
        title: "OwnerProp",
        icon: <Edit2 size={12} />,
        action: "read",
        resource: "DT-2",
        navLink: "/Report/OwnerProp",
      },
      {
        id: "get Extra Payments",
        title: "get Extra Payments",
        icon: <Edit2 size={12} />,
        action: "read",
        resource: "DT-2",
        navLink: "/Report/getExtraPayemnts",
      },
      {
        id: "ActivityLog",
        title: "ActivityLog",
        icon: <Edit2 size={12} />,
        action: "read",
        resource: "DT-2",
        navLink: "/Report/ActivityLog",
      },
      {
        id: "collectionInsurance",
        title: "Collection Insurance",
        icon: <Edit2 size={12} />,
        action: "read",
        resource: "DT-2",
        navLink: "/Report/collectionInsurance",
      },
      {
        id: "Tenants",
        title: "Tenants",
        icon: <Edit2 size={12} />,
        action: "read",
        resource: "DT-2",
        navLink: "/Report/Tenants",
      },
      {
        id: "LawyerReport",
        title: "Lawyer Report",
        icon: <Edit2 size={12} />,
        action: "read",
        resource: "DT-2",
        navLink: "/Report/LawyerReport",
      },
      {
        id: "PaymentReport",
        title: "Payment Report",
        icon: <Edit2 size={12} />,
        action: "read",
        resource: "DT-2",
        navLink: "/Report/PaymentReport",
      },
    ],
  },
];
