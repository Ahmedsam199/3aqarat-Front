// ** Icons Import
import {
  Bookmark, Circle, TrendingUp,Settings,DollarSign, Type, User, UserCheck, Users, Edit
} from "react-feather";

export default [
  {
    id: "Hola",
    title: "Setups",
    icon: <Settings size={20} />,
    badge: "light-warning",
    children: [
      {
        id: "",
        title: "Contract Type",
        icon: <Type size={12} />,
        navLink: "/Setup/ContractType",
        action: "read",
        resource: "DT-4",
      },
      {
        id: "/Setup/PropertyType",
        icon: <Type size={12} />,
        title: "PropertyType",
        navLink: "/Setup/PropertyType",
        action: "read",
        resource: "DT-4",
      },
      {
        id: "",
        title: "Contract Template",
        icon: <Edit size={12} />,
        navLink: "/Setup/ContractTemplate",
        action: "read",
        resource: "DT-3",
      },
      {
        id: "",
        title: "Purpose",
        icon: <Bookmark size={12} />,
        navLink: "/Setup/Purpose",
        action: "read",
        resource: "DT-11",
      },
      {
        id: "",
        title: "Branches",
        icon: <Circle size={12} />,
        navLink: "/Setup/Branches",
        action: "read",
        resource: "DT-1",
      },
      {
        id: "Currency",
        title: "Currency",
        icon: <DollarSign />,
        navLink: "/Setup/Currency",
        action: "read",
        resource: "DT-14",
      },
      {
        id: "Currency Exchange",
        title: "Currency Exchange",
        icon: <TrendingUp />,
        navLink: "/Setup/CurrencyExchange",
        action: "read",
        resource: "DT-14",
      },
      {
        id: "",
        title: "Roles",
        icon: <User size={12} />,
        navLink: "/Setup/Role",
        action: "read",
        resource: "DT-12",
      },
      {
        id: "",
        title: "Permissions",
        icon: <UserCheck size={12} />,
        navLink: "/Setup/Permission",
        action: "read",
        resource: "DT-7",
      },

      {
        id: "",
        title: "Users",
        icon: <Users size={12} />,
        navLink: "/Setup/User",
        action: "read",
        resource: "DT-14",
      },
    ],
  },
];
