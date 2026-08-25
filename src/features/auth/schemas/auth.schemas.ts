import z from "zod";

const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
const whitespaceRegex = /^\S+$/;

const passwordRegex = {
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  number: /\d/,
  special: /[^A-Za-z0-9]/,
};

export const loginUserSchema = z.object({
  email: z.email("Invalid email address").trim().toLowerCase(),
  password: z.string().min(8, "password must be atleast 8 characters"),
});

export const registerUserSchema = z
  .object({
    name: z
      .string()
      .min(2, "First Name must be at least 2 characters")
      .max(50, "First Name is too large")
      .regex(nameRegex, { message: "Only letters are allowed" })
      .regex(whitespaceRegex, { message: "Spaces are not allowed" }),
      
    email: z.email("Invalid email address").trim().toLowerCase(),


    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password is too large")
      .regex(passwordRegex.lowercase, {
        message: "Must contain a lowercase letter",
      })
      .regex(passwordRegex.uppercase, {
        message: "Must contain an uppercase letter",
      })
      .regex(passwordRegex.number, {
        message: "Must contain a number",
      })
      .regex(passwordRegex.special, {
        message: "Must contain a special character",
      })
      .regex(whitespaceRegex, {
        message: "Spaces are not allowed",
      }),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormType = z.infer<typeof registerUserSchema>;

export type LoginFormType = z.infer<typeof loginUserSchema>;
