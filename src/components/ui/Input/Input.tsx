import * as React from "react";

import { commonCss, type InputProps } from "./type";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className = "", leftIcon, rightIcon, onRightIconClick, ...props },
    ref,
  ) => {
    return (
      <div className="relative w-full">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          className={`
            ${commonCss}
            ${leftIcon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
            ${className}
          `}
          {...props}
        />

        {rightIcon &&
          (onRightIconClick ? (
            <button
              type="button"
              onClick={onRightIconClick}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
            >
              {rightIcon}
            </button>
          ) : (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </span>
          ))}
      </div>
    );
  },
);

Input.displayName = "Input";
