// ** Icons Import
import { FileText,Type,Settings,Flag,Users,CreditCard,Dribbble, Circle, Target,Square, Edit,Edit2, BookOpen,DollarSign,PieChart, Bookmark, UserCheck, User } from "react-feather";
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
  },
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
        navLink: "/Properity/Properity",
      },
      {
        id: "Properites-Attributes",
        title: "Attributes",
        icon: <Dribbble size={12} />,
        action: "read",
        resource: "DT-9",
        navLink: "/Properity/Attribute",
      },
      {
        id: "Owners",
        title: "Owners",
        icon: <Users size={12} />,
        navLink: "/Properity/Owner",
        action: "read",
        resource: "DT-5",
      },
      {
        id: "Territory",
        title: "Territory",
        icon: <Flag size={12} />,
        navLink: "/Properity/Terrority",
        action: "read",
        resource: "DT-13",
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
        navLink: "/Setup/Branchies",
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
