export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: "user" | "admin";
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface LoginUser{
  email:string,
  password:string
}

export interface RegisterUser extends LoginUser{
  name: string,
}

import type { ReactNode } from "react";
import type { LoginFormType, RegisterFormType } from "../schemas/auth.schemas";
import type { Path } from "react-hook-form";

export type RegisterField = {
  name: Path<RegisterFormType>;
  type?: React.HTMLInputTypeAttribute;
  placeholder: string;
  autoComplete: string;
  leftIcon: ReactNode;
  passwordToggle?: boolean;
};


export type LoginField = {
  name: Path<LoginFormType>;
  type?: React.HTMLInputTypeAttribute;
  placeholder: string;
  autoComplete: string;
  leftIcon: ReactNode;
  passwordToggle?: boolean;
};
