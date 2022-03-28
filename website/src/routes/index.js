import { CircularProgress } from "@mui/material";
import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
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
        // { path: "/", element: <LandingPage /> },
        // { path: "about-us", element: <About /> },
        // { path: "contact-us", element: <Contact /> },
        // { path: "faqs", element: <Faqs /> },
      ],
    },
  ]);
}
