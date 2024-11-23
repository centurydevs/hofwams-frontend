"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { EmailField, LoadingButton } from "@/components/common";
import { Form } from "@/components/ui";

import { ForgotPasswordDto, forgotPasswordSchema } from "@/schema/auth";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordDto>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordDto) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log({ values });

    toast.success(
      <div>
        <h1>Password reset email sent</h1>
        <h2>Please check your email for further instructions.</h2>
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
          <EmailField form={form} />

          <LoadingButton isLoading={isLoading}>Reset Password</LoadingButton>
        </form>
      </Form>
    </motion.div>
  );
}
