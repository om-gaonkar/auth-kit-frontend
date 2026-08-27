import { useState } from "react";
import { navbarRoutes, ROUTES } from "../../../app/router/routePaths";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  logo?: string;
}

export const Navbar = ({ logo = "AuthKit" }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 border-b border-red-100 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to={ROUTES.HOME} className="text-lg font-semibold text-red-700">
          {logo}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navbarRoutes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className="text-sm font-medium text-gray-600 hover:text-red-700"
            >
              {route.label}
            </Link>
          ))}
          <Link
            to={ROUTES.AUTH.LOGIN}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 active:bg-red-800"
          >
            Get Started
          </Link>
        </div>
        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-red-700 hover:bg-red-50 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-red-100 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navbarRoutes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-gray-600 hover:text-red-700"
              >
                {route.label}
              </Link>
            ))}
            <Link
              to={ROUTES.AUTH.LOGIN}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
