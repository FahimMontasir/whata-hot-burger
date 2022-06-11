import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// material-ui
import { CircularProgress } from "@mui/material";
// layouts
import DashboardLayout from "../layouts/dashboard";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
// guards
import UserGuard from "../guards/UserGuard";
import AuthGuard from "../guards/AuthGuard";
// import RoleBasedGuard from '../guards/RoleBasedGuard';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes("/dashboard");

  return (
    <Suspense
      fallback={
        isDashboard ? (
          <CircularProgress sx={{ mt: 10 }} />
        ) : (
          <CircularProgress />
        )
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <UserGuard>
              <Login />
            </UserGuard>
          ),
        },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },

    //attention! Dashboard Routes
    {
      path: "/",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: "/", element: <Navigate to="/dashboard" replace /> },
        { path: "dashboard", element: <GeneralEcommerce /> },
        {
          path: "am",
          children: [
            { path: "/am", element: <Navigate to="/am/explore" replace /> },
            { path: "explore", element: <ExploreAmPage /> },
            { path: "register", element: <CreateAm /> },
          ],
        },
        {
          path: "consumer",
          children: [
            {
              path: "/consumer",
              element: <Navigate to="/consumer/register" replace />,
            },
            { path: "register", element: <Login /> },
          ],
        },
      ],
    },

    //attention! Main Routes(temporary pages)
    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        { path: "coming-soon", element: <ComingSoon /> },
        { path: "maintenance", element: <Maintenance /> },
        { path: "500", element: <Page500 /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}

//attention! IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import("../pages/authentication/Login")));

const ResetPassword = Loadable(
  lazy(() => import("../pages/authentication/ResetPassword"))
);

//dashboard
const GeneralEcommerce = Loadable(lazy(() => import("../pages/home")));

//main routes(temporary pages)
const ComingSoon = Loadable(lazy(() => import("../pages/temp/ComingSoon")));
const Maintenance = Loadable(lazy(() => import("../pages/temp/Maintenance")));
const Page500 = Loadable(lazy(() => import("../pages/temp/Page500")));
const NotFound = Loadable(lazy(() => import("../pages/temp/Page404")));

//page --am
const CreateAm = Loadable(
  lazy(() => import("../pages/users/adminAndManager/createAM"))
);
const ExploreAmPage = Loadable(
  lazy(() => import("../pages/users/adminAndManager/exploreAM"))
);
