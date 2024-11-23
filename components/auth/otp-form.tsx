/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Form,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui";
import { CustomFormFieldWithChild, LoadingButton } from "@/components/common";

import { OTPDto, otpSchema } from "@/schema/auth";

export function OTPVerificationForm({
  onVerificationSuccess,
}: {
  onVerificationSuccess: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<OTPDto>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (values: OTPDto) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log({ values });

    toast.success(
      <div>
        <h1>OTP verified successfully!</h1>
        <h1>You are now logged in.</h1>
      </div>
    );

    setIsLoading(false);
    onVerificationSuccess();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CustomFormFieldWithChild
            form={form}
            name="otp"
            label="Enter OTP"
            renderChild={(field) => <OTPInput field={field} />}
          />

          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Enter the 6-digit code sent to your email
          </p>

          <LoadingButton loadingText="Verifying..." isLoading={isLoading}>
            Verify OTP
          </LoadingButton>
        </form>
      </Form>
    </motion.div>
  );
}

function OTPInput({ field }: { field: ControllerRenderProps<any, string> }) {
  return (
    <div className="flex justify-center">
      <InputOTP maxLength={6} {...field}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
