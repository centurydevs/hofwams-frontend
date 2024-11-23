import { useMemo } from "react";

import {
  PasswordRequirement,
  PasswordStrengthIndicator,
} from "@/components/ui/password-indicator";
import { checkStrength } from "@/lib/utils";
import { PasswordInput, PasswordInputProps } from "./password-input";

interface PasswordInputWithIndicatorProps extends PasswordInputProps {
  password: string;
}

export function PasswordInputWithIndicator({
  field,
  password,
}: PasswordInputWithIndicatorProps) {
  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  return (
    <>
      <PasswordInput field={field} />

      {/* Password strength indicator */}
      <PasswordStrengthIndicator strengthScore={strengthScore} />
      <PasswordRequirement strength={strength} strengthScore={strengthScore} />
    </>
  );
}
