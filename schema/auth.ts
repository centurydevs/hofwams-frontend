import { isValidPhoneNumber } from "react-phone-number-input";
import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .optional(),
});

export type LoginDto = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  organizationName: z
    .string()
    .min(2, { message: "Organization name must be at least 2 characters long" })
    .optional(),
  organizationAddress: z
    .string()
    .min(5, {
      message: "Organization address must be at least 5 characters long",
    })
    .optional(),
  organizationId: z
    .string()
    .min(5, { message: "Organization ID must be at least 5 characters long" })
    .optional(),
  role: z.enum(["EMPLOYEE", "CUSTOMER"]).optional(),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" })
    .optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .optional(),
});

export type RegisterDto = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;

export const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 digits" }),
});

export type OTPDto = z.infer<typeof otpSchema>;
