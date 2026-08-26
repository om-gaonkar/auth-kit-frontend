import { Home } from "lucide-react";
import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/"
            className="text-lg font-bold tracking-tight text-red-600"
          >
            AuthKit
          </Link>

          <Link
            to="/"
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-red-50 px-3 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
          >
            <Home size={16} />
            Home
          </Link>
        </div>

        <Outlet />
      </div>
    </main>
  );
}
