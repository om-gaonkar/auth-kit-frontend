import type { FieldValues } from "react-hook-form";
import { Input } from "../Input/Input";
import type { FormFieldProps } from "./type";

export function FormField<T extends FieldValues>({
  name,
  register,
  errors,
  label,
  type = "text",
  placeholder,
  leftIcon,
  rightIcon,
  onRightIconClick,
}: Readonly<FormFieldProps<T>>) {
  const error = errors?.[name]?.message as string | undefined;

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        onRightIconClick={onRightIconClick}
        aria-invalid={Boolean(error)}
        {...register(name)}
      />

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
