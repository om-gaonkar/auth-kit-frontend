import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";

import { navbarRoutes, ROUTES } from "../../../app/router/routePaths";
import { useAuth } from "../../../app/providers/Auth/AuthContext";
import { ProfileMenu } from "./ProfileMenu";

interface NavbarProps {
  logo?: string;
}

export const Navbar = ({ logo = "AuthKit" }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
      isActive
        ? "bg-secondary md:bg-transparent  text-secondary-foreground"
        : "text-muted  hover:text-secondary-foreground ",
    ].join(" ");

  const userInitial = user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to={ROUTES.HOME}
          onClick={closeMenu}
          className="text-xl font-bold tracking-tight text-primary transition-colors duration-200 hover:text-primary-hover"
        >
          {logo}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {navbarRoutes.map((route) => (
            <NavLink key={route.path} to={route.path} className={navLinkClass}>
              {route.label}
            </NavLink>
          ))}

          {/* Authenticated User / CTA */}
          {isAuthenticated && user ? (
            <ProfileMenu />
          ) : (
            <Link
              to={ROUTES.AUTH.LOGIN}
              className="ml-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-hover active:bg-primary-active"
            >
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={toggleMenu}
          className="p-2 text-primary transition-colors duration-200 hover:text-primary-hover md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-0 top-full z-50 w-full border-t border-border/50 bg-surface px-4 pb-4 shadow-sm md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-2 pt-2">
            {navbarRoutes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                onClick={closeMenu}
                className={navLinkClass}
              >
                {route.label}
              </NavLink>
            ))}

            {isAuthenticated && user ? (
              <Link
                to={ROUTES.USERS.PROFILE}
                onClick={closeMenu}
                className="mt-3 flex items-center gap-3 rounded-xl bg-secondary p-3 transition-colors duration-200 hover:bg-secondary-hover"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                  {userInitial}
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted">Signed in as</p>

                  <p className="truncate text-sm font-semibold text-secondary-foreground">
                    {user.email}
                  </p>
                </div>
              </Link>
            ) : (
              <Link
                to={ROUTES.AUTH.LOGIN}
                onClick={closeMenu}
                className="mt-3 rounded-lg bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-hover active:bg-primary-active"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
