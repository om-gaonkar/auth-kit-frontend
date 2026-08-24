import type React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
};

export const commonCss =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm " +
  "outline-none transition-colors placeholder:text-gray-400 " +
  "focus:border-red-500 focus:ring-2 focus:ring-red-500/10 " +
  "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60";