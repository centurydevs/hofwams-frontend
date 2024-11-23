"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Building, UserPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Form, FormLabel, RadioGroup, RadioGroupItem } from "@/components/ui";
import {
  CustomFormField,
  CustomFormFieldWithChild,
  EmailField,
  LoadingButton,
  PasswordField,
  PhoneInput,
  RadioGroupField,
} from "@/components/common";

import { RegisterDto, registerSchema } from "@/schema/auth";

const roleOptions = [
  { value: "EMPLOYEE", label: "Employee" },
  { value: "CUSTOMER", label: "Customer" },
];

export function RegisterForm() {
  const [isOrganization, setIsOrganization] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterDto>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      organizationName: undefined,
      organizationAddress: undefined,
      organizationId: undefined,
      role: "EMPLOYEE",
      phoneNumber: undefined,
      password: undefined,
    },
  });

  const onSubmit = async (values: RegisterDto) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log({ values });

    toast.success(
      <div>
        <h1>
          {isOrganization ? "Organization created" : "Joined organization"}{" "}
          successfully!
        </h1>
        <h1>Please check your email for further instructions.</h1>
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
          <RadioGroup
            defaultValue="organization"
            onValueChange={(value) =>
              setIsOrganization(value === "organization")
            }
            className="flex justify-center space-x-4 mb-6"
          >
            <div className="flex flex-col items-center space-y-2">
              <RadioGroupItem
                value="organization"
                id="organization"
                className="sr-only"
              />
              <FormLabel
                htmlFor="organization"
                className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-colors ${
                  isOrganization
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <Building className="w-8 h-8 mb-2" />
                Register Organization
              </FormLabel>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <RadioGroupItem value="join" id="join" className="sr-only" />
              <FormLabel
                htmlFor="join"
                className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-colors ${
                  !isOrganization
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <UserPlus className="w-8 h-8 mb-2" />
                Join Organization
              </FormLabel>
            </div>
          </RadioGroup>

          <div className="grid grid-cols-2 gap-4">
            <CustomFormField
              form={form}
              name="firstName"
              label="First Name"
              required
            />
            <CustomFormField
              form={form}
              name="lastName"
              label="Last Name"
              required
            />
          </div>

          <EmailField form={form} />

          {isOrganization ? (
            <>
              <CustomFormField
                form={form}
                name="organizationName"
                label="Organization Name"
                required
              />

              <CustomFormField
                form={form}
                name="organizationAddress"
                label="Organization Address"
                required
              />
            </>
          ) : (
            <>
              <CustomFormField
                form={form}
                name="organizationId"
                label="Organization ID"
                required
              />

              <RadioGroupField
                form={form}
                name="role"
                label="Role"
                options={roleOptions}
              />
            </>
          )}

          <CustomFormFieldWithChild
            form={form}
            name="phoneNumber"
            label="Phone Number"
            renderChild={(field) => <PhoneInput {...field} />}
            required
          />

          <PasswordField name="password" label="Password" form={form} />

          <LoadingButton isLoading={isLoading}>Register</LoadingButton>
        </form>
      </Form>
    </motion.div>
  );
}
