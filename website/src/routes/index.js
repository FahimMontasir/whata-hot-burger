import { CircularProgress } from "@mui/material";
import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
// layouts
import MainLayout from "../layout";

// ----------------------------------------------------------------------

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
        // { path: "about-us", element: <About /> },
        // { path: "contact-us", element: <Contact /> },
        // { path: "faqs", element: <Faqs /> },
      ],
    },
  ]);
}

const Home = Loadable(lazy(() => import("../pages/home")));
