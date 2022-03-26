import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// material-ui
import { CircularProgress } from "@mui/material";
// layouts
import DashboardLayout from "../layouts/dashboard";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
// guards
import GuestGuard from "../guards/GuestGuard";
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
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: "login-unprotected", element: <Login /> },
        { path: "register-unprotected", element: <Register /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "verify", element: <VerifyCode /> },
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
        // {
        //   path: 'e-commerce',
        //   children: [
        //     { path: '/', element: <Navigate to="/dashboard/e-commerce/shop" replace /> },
        //     { path: 'shop', element: <EcommerceShop /> },
        //     { path: 'product/:name', element: <EcommerceProductDetails /> },
        //     { path: 'list', element: <EcommerceProductList /> },
        //     { path: 'product/new', element: <EcommerceProductCreate /> },
        //     { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
        //     { path: 'checkout', element: <EcommerceCheckout /> },
        //     { path: 'invoice', element: <EcommerceInvoice /> }
        //   ]
        // },
        // {
        //   path: 'user',
        //   children: [
        //     { path: '/', element: <Navigate to="/dashboard/user/profile" replace /> },
        //     { path: 'profile', element: <UserProfile /> },
        //     { path: 'cards', element: <UserCards /> },
        //     { path: 'list', element: <UserList /> },
        //     { path: 'new', element: <UserCreate /> },
        //     { path: '/:name/edit', element: <UserCreate /> },
        //     { path: 'account', element: <UserAccount /> }
        //   ]
        // },
        // {
        //   path: 'blog',
        //   children: [
        //     { path: '/', element: <Navigate to="/dashboard/blog/posts" replace /> },
        //     { path: 'posts', element: <BlogPosts /> },
        //     { path: 'post/:title', element: <BlogPost /> },
        //     { path: 'new-post', element: <BlogNewPost /> }
        //   ]
        // },
        // {
        //   path: 'mail',
        //   children: [
        //     { path: '/', element: <Navigate to="/dashboard/mail/all" replace /> },
        //     { path: 'label/:customLabel', element: <Mail /> },
        //     { path: 'label/:customLabel/:mailId', element: <Mail /> },
        //     { path: ':systemLabel', element: <Mail /> },
        //     { path: ':systemLabel/:mailId', element: <Mail /> }
        //   ]
        // },
        // {
        //   path: 'chat',
        //   children: [
        //     { path: '/', element: <Chat /> },
        //     { path: 'new', element: <Chat /> },
        //     { path: ':conversationKey', element: <Chat /> }
        //   ]
        // },
        // { path: 'calendar', element: <Calendar /> },
        // { path: 'kanban', element: <Kanban /> }
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
const Register = Loadable(
  lazy(() => import("../pages/authentication/Register"))
);
const ResetPassword = Loadable(
  lazy(() => import("../pages/authentication/ResetPassword"))
);
const VerifyCode = Loadable(
  lazy(() => import("../pages/authentication/VerifyCode"))
);

//dashboard
const GeneralEcommerce = Loadable(lazy(() => import("../pages/home")));

//main routes(temporary pages)
const ComingSoon = Loadable(lazy(() => import("../pages/temp/ComingSoon")));
const Maintenance = Loadable(lazy(() => import("../pages/temp/Maintenance")));
const Page500 = Loadable(lazy(() => import("../pages/temp/Page500")));
const NotFound = Loadable(lazy(() => import("../pages/temp/Page404")));
