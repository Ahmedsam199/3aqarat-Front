// ** Icons Import
import {
  BookOpen, Dribbble, Flag, Target, Users
} from "react-feather";

export default [
  {
    id: "Properties",
    title: "Properties",
    icon: <Target size={20} />,

    badge: "light-warning",
    children: [
      {
        id: "Properties",
        title: "Property",
        icon: <BookOpen size={12} />,
        action: "read",
        resource: "DT-8",
        navLink: "/Properties/Property",
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
      {
        id: "Lawyer",
        title: "Lawyers",
        icon: <Users />,
        navLink: "/Properties/Lawyer",
        action: "read",
        resource: "DT-13",
      },
    ],
  },
];
