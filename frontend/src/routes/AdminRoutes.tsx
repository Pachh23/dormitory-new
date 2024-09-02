import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Loadable from "../components/third-patry/Loadable";
import FullLayout from "../layout/FullLayout";
const MainPages = Loadable(lazy(() => import("../pages/authentication/LoginStudent")));
const Homepages = Loadable(lazy(() => import("../pages/homepage")));
const Student = Loadable(lazy(() => import("../pages/student")));
const Personal = Loadable(lazy(() => import("../pages/personal")));
const StudentCreate = Loadable(lazy(() => import("../pages/student/create")));
const StudentEdit = Loadable(lazy(() => import("../pages/student/edit")));
const AdminRoutes = (isLoggedIn : boolean): RouteObject => {
  return {
    path: "/",
    element: isLoggedIn ? <FullLayout /> : <MainPages />,
    children: [
      {
        path: "/",
        element: <Homepages />,
      },
      {
        path: "/student",
        children: [
          {
            path: "/student",
            element: <Student />,
          },
          {
            path: "/student/create",
            element: <StudentCreate />,
          },
          {
            path: "/student/edit/:id",
            element: <StudentEdit />,
          },
        ],
      },
      {
        path: "/personal",
        children: [
          {
            path: "/personal",
            element: <Personal />,
          },
        ],
      },
    ],
  };
};
export default AdminRoutes;