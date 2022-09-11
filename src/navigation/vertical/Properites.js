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
    id: "Properites",
    title: "Properties",
    icon: <Target size={20} />,

    badge: "light-warning",
    children: [
      {
        id: "Properites",
        title: "Property",
        icon: <BookOpen size={12} />,
        action: "read",
        resource: "DT-8",
        navLink: "/Properties/Properties",
      },
      {
        id: "Properties-Attributes",
        title: "Attributes",
        icon: <Dribbble size={12} />,
        action: "read",
        resource: "DT-9",
        navLink: "/Properties/Attribute",
      },
      {
        id: "Owners",
        title: "Owners",
        icon: <Users size={12} />,
        navLink: "/Properties/Owner",
        action: "read",
        resource: "DT-5",
      },
      {
        id: "Territory",
        title: "Territory",
        icon: <Flag size={12} />,
        navLink: "/Properties/Territory",
        action: "read",
        resource: "DT-13",
      },
    ],
  },
];
