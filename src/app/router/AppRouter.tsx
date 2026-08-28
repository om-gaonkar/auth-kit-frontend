import { Route, Routes } from "react-router";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Loading from "../../components/common/Loader/Loading";
import { lazy, Suspense } from "react";
import AboutPage from "../../pages/Home/AboutPage";
// Lazy Loaded pages
const HomePage = lazy(() => import("../../pages/Home/HomePage"));
const LoginPage = lazy(() => import("../../pages/Auth/LoginPage"));
const RegisterPage = lazy(() => import("../../pages/Auth/RegisterPage"));
const Profile = lazy(() => import("../../pages/Users/Profile"));
const NotFound = lazy(
  () => import("../../components/common/NotFound/NotFound"),
);
export default function AppRouter() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
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
      </Suspense>
    </div>
  );
}
