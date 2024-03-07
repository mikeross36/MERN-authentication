import { object, string, TypeOf } from "zod";

export const registerUserSchema = object({
  body: object({
    email: string({ required_error: "Email is required!" }).email(
      "Email is not valid!"
    ),
    userName: string({ required_error: "User name is required!" }),
    password: string({ required_error: "Password is required!" }).min(
      8,
      "Password nust be at least 8 chars long!"
    ),
    confirmPassword: string({
      required_error: "Password confirmation is required!",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  }),
});

export const verifyUserSchema = object({
  params: object({
    userId: string(),
    verificationCode: string(),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({ required_error: "Email is required!" }).email(
      "Email is not valid!"
    ),
  }),
});

export const resetPasswordSchema = object({
  params: object({
    resetToken: string(),
  }),
  body: object({
    password: string({ required_error: "Password is required!" }).min(
      8,
      "Password must be at least chars long!"
    ),
    confirmPassword: string({
      required_error: "Password confirmation is required!",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  }),
});

export type RegisterUserInput = TypeOf<typeof registerUserSchema>["body"];
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
