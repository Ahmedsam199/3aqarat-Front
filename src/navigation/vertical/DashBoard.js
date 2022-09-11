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
    id: "DashBoard",
    title: "DashBoard",
    action: "read",
    resource: "DASH",
    icon: <PieChart size={12} />,

    permissions: ["admin", "editor"],
    navLink: "/DashBoard",
  },
  
];
