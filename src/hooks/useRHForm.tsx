import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Resolver,
  type UseFormProps,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

type UseZodFormOptions<T extends FieldValues> = {
  defaultValues?: DefaultValues<T>;
  mode?: UseFormProps<T>["mode"];
};

export function useRHForm<T extends FieldValues>(
  schema: z.ZodType<T, T>,
  options?: UseZodFormOptions<T>,
) {
  return useForm<T>({
    resolver: zodResolver(schema) as Resolver<T>,
    defaultValues: options?.defaultValues,
    mode: options?.mode,
  });
}
