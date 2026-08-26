import { Lock, Mail, User } from "lucide-react";
import type { LoginField, RegisterField } from "./auth.types";

export const loginFields = [
  {
    name: "email",
    type: "email",
    placeholder: "Email address",
    autoComplete: "email",
    leftIcon: <Mail className="size-4" />,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    autoComplete: "new-password",
    leftIcon: <Lock className="size-4" />,
    passwordToggle: true,
  },
] satisfies LoginField[];

export const registerFields = [
  {
    name: "name",
    placeholder: "Full name",
    autoComplete: "name",
    leftIcon: <User className="size-4" />,
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email address",
    autoComplete: "email",
    leftIcon: <Mail className="size-4" />,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    autoComplete: "new-password",
    leftIcon: <Lock className="size-4" />,
    passwordToggle: true,
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm password",
    autoComplete: "new-password",
    leftIcon: <Lock className="size-4" />,
    passwordToggle: true,
  },
] satisfies RegisterField[];
