// ** Icons Import
import {
  CreditCard, Edit,
  Edit2
} from "react-feather";

export default [

  {
    id: "Contract",
    title: "Contract",
    icon: <Edit size={12} />,

    children: [
      {
        id: "Contract",
        title: "Contract",
        icon: <Edit2 size={12} />,
        action: "read",
        resource: "DT-2",
        navLink: "/Contract/Contract",
      },
      {
        id: "Payment",
        title: "Payment",
        icon: <CreditCard size={12} />,
        action: "read",
        resource: "DT-6",
        navLink: "/Contract/Payment",
      },
    ],
  }
];
