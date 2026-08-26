import { useAuth } from "../providers/Auth/AuthContext";
import { Navigate, Outlet } from "react-router";
import { ROUTES } from "./routePaths";
import Loading from "../../components/common/Loader/Loading";

type Role = "user" | "admin";

interface ProtectedRouteProps {
  allowedRoles: Role[];
}
export default function ProtectedRoute({
  allowedRoles,
}: Readonly<ProtectedRouteProps>) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }
  return <Outlet />;
}
