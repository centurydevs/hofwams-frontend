"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Form } from "@/components/ui";
import {
  EmailField,
  LoadingButton,
  PasswordField,
  ToastMessage,
} from "@/components/common";

import { LoginDto, loginSchema } from "@/schema/auth";

export function LoginForm({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordless, setIsPasswordless] = useState(false);

  const form = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: undefined,
    },
  });

  const onSubmit = async (values: LoginDto) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log({ values });

    toast.success(
      <ToastMessage
        title={isPasswordless ? "OTP sent successfully!" : "Login successful!"}
        details={
          isPasswordless
            ? "Please enter the OTP to complete login."
            : "Redirecting to dashboard"
        }
      />
    );

    setIsLoading(false);
    onLoginSuccess();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <EmailField form={form} />

          {!isPasswordless && (
            <PasswordField name="password" label="Password" form={form} />
          )}

          <LoadingButton isLoading={isLoading}>
            {isPasswordless ? "Send OTP" : "Login"}
          </LoadingButton>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsPasswordless(!isPasswordless)}
              className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors"
            >
              {isPasswordless ? "Login with password" : "Login with OTP"}
            </button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
