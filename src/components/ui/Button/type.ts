import type React from "react";

export type ButtonVariant = "primary" | "light" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingTest?: string;
}

export const variants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",

  light:
    "bg-primary-50 text-primary-700 hover:bg-primary-100",

  outline:
    "border border-primary-300 text-primary-700 hover:bg-primary-50",
};


export const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export const commonCss =
  "inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-colors duration-200 " +
  "focus:outline-none focus:ring-2 focus:ring-primary-500/30 " +
  "disabled:cursor-not-allowed disabled:opacity-50";