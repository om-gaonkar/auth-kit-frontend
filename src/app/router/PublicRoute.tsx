import { Navigate, Outlet } from "react-router";
import { useAuth } from "../providers/Auth/AuthContext";
import Loading from "../../components/common/Loader/Loading";

export default function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/user/profile" replace /> : <Outlet />;
}
