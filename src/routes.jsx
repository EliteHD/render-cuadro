import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Materiales",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Roles",
        path: "/tables2",
        element: <Tables />,
      },
      /*
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },*/
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Usuarios",
        path: "/usuarios",
        element: <Tables />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Perfil",
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  /*
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-in",
        element: <SignUp />,
      },
    ],
  },*/
];

export default routes;
