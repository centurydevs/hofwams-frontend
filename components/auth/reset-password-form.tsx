"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Form } from "@/components/ui";
import { LoadingButton, PasswordField } from "@/components/common";

import { ResetPasswordDto, resetPasswordSchema } from "@/schema/auth";

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetPasswordDto>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordDto) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log({ values });

    toast.success(
      <div>
        <h1>Password reset successful!</h1>
        <h2>You can now log in with your new password.</h2>
      </div>
    );

    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <PasswordField name="password" label="Password" form={form} />

          <PasswordField
            name="confirmPassword"
            label="Confirm Password"
            form={form}
          />

          <LoadingButton isLoading={isLoading}>Reset Password</LoadingButton>
        </form>
      </Form>
    </motion.div>
  );
}
