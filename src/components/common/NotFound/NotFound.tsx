import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/", { replace: true });
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-red-50/40 px-4">
      <section className="w-full max-w-lg rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mb-6 text-7xl font-bold text-red-600 sm:text-8xl">
          404
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
          Page not found
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
          Sorry, the page you are looking for does not exist or may have been
          moved.
        </p>

        <p className="mt-2 text-sm text-red-600">
          Redirecting you to the home page...
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500/30 sm:w-auto"
        >
          Go back home
        </Link>
      </section>
    </main>
  );
}
