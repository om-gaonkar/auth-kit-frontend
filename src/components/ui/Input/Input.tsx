import React from "react";
import { Eye, EyeOff } from "lucide-react";

import { commonCss, type InputProps } from "./type";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      leftIcon,
      rightIcon,
      onRightIconClick,
      passwordToggle = false,
      type,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = passwordToggle && type === "password";

    let inputType = type;

    if (isPassword && showPassword) {
      inputType = "text";
    }

    const hasRightElement = rightIcon || passwordToggle;

    const renderRightElement = () => {
      if (passwordToggle) {
        return (
          <button
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-red-500"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        );
      }

      if (!rightIcon) {
        return null;
      }

      if (onRightIconClick) {
        return (
          <button
            type="button"
            onClick={onRightIconClick}
            aria-label="Input action"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-red-500"
          >
            {rightIcon}
          </button>
        );
      }

      return (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {rightIcon}
        </span>
      );
    };

    return (
      <div className="relative w-full">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          type={inputType}
          className={`
            ${commonCss}
            ${leftIcon ? "pl-10" : ""}
            ${hasRightElement ? "pr-10" : ""}
            ${className}
          `}
          {...props}
        />

        {renderRightElement()}
      </div>
    );
  },
);

Input.displayName = "Input";
