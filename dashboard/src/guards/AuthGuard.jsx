import { useState } from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
// pages
import Login from "../pages/authentication/Login";
// redux
import { useSelector } from "react-redux";
import { getToken } from "../store/redux/slices/localStorageAuth";

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const isAuthenticated = useSelector(getToken);
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
