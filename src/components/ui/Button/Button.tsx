import React from "react";
import type { ButtonProps } from "./type";
import { variants, sizes, commonCss } from "./type";
import Spinner from "../Spinner/Spinner";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      type,
      size = "md",
      isLoading = false,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      loadingTest = "Loading...",
      disabled,
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        type={type}
        ref={ref}
        disabled={disabled || isLoading}
        className={`${commonCss}  ${variants[variant]}
          ${sizes[size]}
          ${className}`}
        {...props}
      >
        {isLoading && <Spinner />}

        {children}
      </button>
    );
  },
);
