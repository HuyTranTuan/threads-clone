import { Outlet, Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";

import Loading from "@/components/Loading";
import { selectFetching, useCurrentUser } from "@/features/auth";

function PrivateRoute() {
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const fetching = useSelector(selectFetching);

  if (fetching) {
    return <Loading />;
  }

  if (!currentUser) {
    return (
      <Navigate to={`/auth/login?continue=${encodeURIComponent(pathname)}`} />
    );
  }

  return <Outlet />;
}

export default PrivateRoute;
