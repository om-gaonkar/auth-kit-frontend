import React from "react";
import type {
  FieldValues,
  Path,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";

export type FormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;

  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
};
