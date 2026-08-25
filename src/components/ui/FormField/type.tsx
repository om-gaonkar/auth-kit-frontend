import type { FieldValues, Path } from "react-hook-form";

import type { InputProps } from "../Input/type";

export type FormFieldProps<T extends FieldValues> = Omit<InputProps, "name"> & {
  name: Path<T>;
  label?: string;
};
