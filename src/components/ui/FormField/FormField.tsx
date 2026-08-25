import { useFormContext, type FieldValues } from "react-hook-form";

import { Input } from "../Input/Input";
import type { FormFieldProps } from "./type";

export function FormField<T extends FieldValues>({
  name,
  label,
  ...inputProps
}: Readonly<FormFieldProps<T>>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <Input
        id={name}
        aria-invalid={Boolean(error)}
        {...inputProps}
        {...register(name)}
      />

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
