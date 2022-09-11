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
        navLink: "/App/Contract/Contract",
      },
      {
        id: "Payment",
        title: "Payment",
        icon: <CreditCard size={12} />,
        action: "read",
        resource: "DT-6",
        navLink: "/App/Contract/Payment",
      },
    ],
}
];
