import { CircularProgress } from "@mui/material";
import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
// layouts
import MainLayout from "../layout";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "food", element: <Combo /> },
        { path: "food/:id", element: <ComboDetails /> },
        { path: "dine", element: <Dine /> },
        { path: "blog", element: <Blog /> },
        { path: "faq", element: <FAQ /> },
        { path: "about-us", element: <AboutUs /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "user", element: <UserPage /> },
      ],
    },
    {
      path: "*",
      element: <MainLayout />,
      children: [
        { path: "coming-soon", element: <ComingSoon /> },
        { path: "maintenance", element: <Maintenance /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}

const Home = Loadable(lazy(() => import("../pages/home")));
const AboutUs = Loadable(lazy(() => import("../pages/aboutUs")));
const FAQ = Loadable(lazy(() => import("../pages/faq")));
const Dine = Loadable(lazy(() => import("../pages/dine")));
const Combo = Loadable(lazy(() => import("../pages/food")));
const ComboDetails = Loadable(lazy(() => import("../pages/food/details")));
const Blog = Loadable(lazy(() => import("../pages/blog")));
const UserPage = Loadable(lazy(() => import("../pages/user")));

// temp
const ComingSoon = Loadable(lazy(() => import("../pages/temp/ComingSoon")));
const Maintenance = Loadable(lazy(() => import("../pages/temp/Maintenance")));
const NotFound = Loadable(lazy(() => import("../pages/temp/Page404")));
