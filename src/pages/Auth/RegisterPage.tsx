import { Link } from "react-router";
import RegisterForm from "../../features/auth/components/RegisterForm";
import { ROUTES } from "../../app/router/routePaths";

export default function RegisterPage() {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Sign up to get started with your account.
        </p>
      </div>
      <RegisterForm />
      <p className="mt-6 text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          to={ROUTES.AUTH.LOGIN}
          className="font-medium text-red-700 hover:text-red-800"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
