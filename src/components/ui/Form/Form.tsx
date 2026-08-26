import type { ReactNode } from "react";

import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
  type SubmitHandler,
  type UseFormProps,
  type UseFormReturn,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

type FormProps<T extends FieldValues> = {
  schema: z.ZodType<T, T>;

  defaultValues?: DefaultValues<T>;

  onSubmit: SubmitHandler<T>;

  children: ReactNode | ((methods: UseFormReturn<T>) => ReactNode);
} & Omit<UseFormProps<T>, "defaultValues" | "resolver">;

export function Form<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  ...options
}: Readonly<FormProps<T>>) {
  const methods = useForm<T>({
    ...options,
    defaultValues,
    resolver: zodResolver(schema) as UseFormProps<T>["resolver"],
  });

  const content = typeof children === "function" ? children(methods) : children;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{content}</form>
    </FormProvider>
  );
}
