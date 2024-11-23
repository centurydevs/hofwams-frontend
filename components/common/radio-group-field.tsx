/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui";
import { CustomFormFieldWithChild } from "./custom-form-field";

interface RadioGroupOption {
  value: string;
  label: string;
}

interface RadioGroupFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  options: RadioGroupOption[];
}

export const RadioGroupField = ({
  form,
  name,
  label,
  options,
}: RadioGroupFieldProps) => {
  return (
    <CustomFormFieldWithChild
      form={form}
      name={name}
      label={label}
      renderChild={(field) => (
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="flex space-x-4"
        >
          {options.map((option) => (
            <FormItem
              key={option.value}
              className="flex items-center space-x-2"
            >
              <FormControl>
                <RadioGroupItem value={option.value} />
              </FormControl>
              <FormLabel className="font-normal !mt-0">
                {option.label}
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      )}
    />
  );
};
