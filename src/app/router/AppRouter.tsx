import { Route, Routes } from "react-router";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import HomePage from "../../pages/Home/HomePage";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import LoginPage from "../../pages/Auth/LoginPage";
import RegisterPage from "../../pages/Auth/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../../pages/Users/Profile";
import PublicRoute from "./PublicRoute";
import { useAuth } from "../providers/Auth/AuthContext";
import NotFound from "../../components/common/NotFound/NotFound";
import Loading from "../../components/common/Loader/Loading";

export default function AppRouter() {
  const { isLoading } = useAuth();
  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/user">
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
