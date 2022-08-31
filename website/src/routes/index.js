import { CircularProgress } from "@mui/material";
import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
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
        { path: "dine", element: <Dine /> },
        { path: "blog", element: <Blog /> },
        { path: "faq", element: <FAQ /> },
        { path: "about-us", element: <AboutUs /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
  ]);
}

const Home = Loadable(lazy(() => import("../pages/home")));
const AboutUs = Loadable(lazy(() => import("../pages/aboutUs")));
const FAQ = Loadable(lazy(() => import("../pages/faq")));
const Dine = Loadable(lazy(() => import("../pages/dine")));
const Combo = Loadable(lazy(() => import("../pages/food")));
const Blog = Loadable(lazy(() => import("../pages/blog")));
