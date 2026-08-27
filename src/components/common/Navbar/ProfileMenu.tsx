import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { LogOut, User } from "lucide-react";

import { ROUTES } from "../../../app/router/routePaths";
import { useAuth } from "../../../app/providers/Auth/AuthContext";
import { UserAvatar } from "./UserAvatar";

export function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      logout();
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Profile Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          flex items-center gap-2.5 rounded-xl px-2 py-1.5
          transition-colors duration-200
          hover:bg-secondary
        "
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <UserAvatar email={user.email} />

        <span className="max-w-36 truncate text-sm font-medium text-foreground">
          {user.email}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full z-50 w-72">
          {/* Invisible hover bridge */}
          <div className="h-3" />

          {/* Actual visible menu */}
          <div
            className="
              rounded-2xl border border-border/60
              bg-surface p-2 shadow-lg
            "
            role="menu"
          >
            {/* User Details */}
            <div className="flex items-center gap-3 px-3 py-3">
              <UserAvatar email={user.email} />

              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">Account</p>

                <p className="truncate text-xs text-muted">{user.email}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-1 space-y-1">
              <Link
                to={ROUTES.USERS.PROFILE}
                onClick={() => setIsOpen(false)}
                className="
                  flex items-center gap-3 rounded-xl px-3 py-2.5
                  text-sm font-medium text-foreground
                  transition-colors duration-200
                  hover:bg-secondary
                  hover:text-secondary-foreground
                "
                role="menuitem"
              >
                <User size={17} />
                Profile
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="
                  flex w-full items-center gap-3 rounded-xl px-3 py-2.5
                  text-left text-sm font-medium text-error
                  transition-colors duration-200
                  hover:bg-secondary
                "
                role="menuitem"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
