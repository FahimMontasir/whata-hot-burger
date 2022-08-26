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
            { path: "open", element: <OpenAm /> },
          ],
        },
        {
          path: "consumer",
          children: [
            {
              path: "/consumer",
              element: <Navigate to="/consumer/explore" replace />,
            },
            { path: "explore", element: <Explore /> },
            { path: "register", element: <Create /> },
            { path: "open", element: <OpenConsumer /> },
          ],
        },
        {
          path: "food",
          children: [
            {
              path: "/food",
              element: <Navigate to="/food/explore" replace />,
            },
            { path: "explore", element: <ExploreFood /> },
            { path: "combo", element: <ComboPage /> },
            { path: "cart", element: <CartDetails /> },
            { path: "invoice", element: <InvoicePage /> },
          ],
        },
        { path: "dine", element: <ExploreDine /> },
        {
          path: "blog",
          children: [
            {
              path: "/blog",
              element: <Navigate to="/blog/posts" replace />,
            },
            { path: "posts", element: <Blog /> },
            { path: "createPost", element: <CreateBlog /> },
          ],
        },
        { path: "faq", element: <FAQ /> },
        { path: "termsAndCondition", element: <TermsAndCondition /> },
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
const OpenAm = Loadable(
  lazy(() => import("../pages/users/adminAndManager/openAm"))
);

//page --consumer
const Create = Loadable(lazy(() => import("../pages/users/consumer/create")));
const Explore = Loadable(lazy(() => import("../pages/users/consumer/explore")));
const OpenConsumer = Loadable(
  lazy(() => import("../pages/users/consumer/openConsumer"))
);

// page --food
const ExploreFood = Loadable(lazy(() => import("../pages/food/explore")));
const ComboPage = Loadable(lazy(() => import("../pages/food/combo")));
const CartDetails = Loadable(lazy(() => import("../pages/food/cart")));
const InvoicePage = Loadable(lazy(() => import("../pages/food/invoice")));

// page --dine
const ExploreDine = Loadable(lazy(() => import("../pages/dine")));

// additional pages
const Blog = Loadable(lazy(() => import("../pages/additional/blog")));
const CreateBlog = Loadable(
  lazy(() => import("../pages/additional/blog/create"))
);
const FAQ = Loadable(lazy(() => import("../pages/dine")));
const TermsAndCondition = Loadable(lazy(() => import("../pages/dine")));
