// ** Icons Import
import {
  FileText,
  Type,
  Settings,
  Flag,
  Users,
  CreditCard,
  Dribbble,
  Circle,
  Target,
  Square,
  Edit,
  Edit2,
  BookOpen,
  DollarSign,
  PieChart,
  Bookmark,
  UserCheck,
  User,
} from "react-feather";
import { useSelector } from "react-redux";

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
        id: "",
        title: "Contract Template",
        icon: <Users size={12} />,
        navLink: "/Setup/PrintCustomization",
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
        id: "",
        title: "User Roles",
        icon: <User size={12} />,
        navLink: "/Setup/UserRole",
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
