import { Link } from "react-router";
import LoginForm from "../../features/auth/components/LoginForm";
import { ROUTES } from "../../app/router/routePaths";

export default function LoginPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>

        <p className="mt-2 text-sm text-gray-500">
          Sign in to continue to your account.
        </p>
      </div>

      <LoginForm />

      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link
          to={ROUTES.AUTH.REGISTER}
          className="font-semibold text-red-700 hover:text-red-800"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
