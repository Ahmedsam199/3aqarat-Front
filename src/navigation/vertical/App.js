// ** Icons Import
import { FileText,Type,Settings,Flag,Users,CreditCard,Dribbble, Circle, Target,Square, Edit,Edit2, BookOpen,DollarSign,PieChart, Bookmark, UserCheck, User } from "react-feather";
import { useSelector } from "react-redux";

export default [
  {
    id: "DashBoard",
    title: "DashBoard",
    icon: <PieChart size={12} />,
    permissions: ["admin", "editor"],
    navLink: "/DashBoard",
  },
  {
    id: "Contract",
    title: "Contract",
    icon: <Edit size={12} />,
    permissions: ["admin", "editor"],
    children: [
      {
        id: "Contract",
        title: "Contract",
        icon: <Edit2 size={12} />,
        navLink: "/App/Contract/Contract",
      },
      {
        id: "Payment",
        title: "Payment",
        icon: <CreditCard size={12} />,
        navLink: "/App/Contract/Payment",
      },
    ],
  },
  {
    id: "Properites",
    title: "Properties",
    icon: <Target size={20} />,
    
    badge: "light-warning",
    children: [
      {
        id: "Properites",
        title: "Properity",
        icon: <BookOpen size={12} />,
        navLink: "/Properity/Properity",
      },
      {
        id: "Properites-Attributes",
        title: "Attributes",
        icon: <Dribbble size={12} />,
        navLink: "/Properity/Attribute",
      },
      {
        id: "Owners",
        title: "Owners",
        icon: <Users size={12} />,
        navLink: "/Properity/Owner",
      },
      {
        id: "Territory",
        title: "Territory",
        icon: <Flag size={12} />,
        navLink: "/Properity/Terrority",
      },
    ],
  },
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
      },

      {
        id: "",
        title: "Contract Template",
        icon: <BookOpen size={12} />,
        navLink: "/Setup/Template",
      },
      {
        id: "",
        title: "Purpose",
        icon: <Bookmark size={12} />,
        navLink: "/Setup/Purpose",
      },
      {
        id: "",
        title: "Branches",
        icon: <Circle size={12} />,
        navLink: "/Setup/Branchies",
      },

      {
        id: "",
        title: "User Roles",
        icon: <User size={12} />,
        navLink: "/Setup/UserRole",
      },
      {
        id: "",
        title: "Permissions",
        icon: <UserCheck size={12} />,
        navLink: "/Setup/Permission",
      },

      {
        id: "",
        title: "Users",
        icon: <Users size={12} />,
        navLink: "/Setup/User",
      },
      {
        id: "",
        title: "PrintCustomization",
        icon: <Users size={12} />,
        navLink: "/Setup/PrintCustomization",
      },
    ],
  },
];
