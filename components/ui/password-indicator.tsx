import { Check, X } from "lucide-react";
import { getStrengthColor, getStrengthText } from "@/lib/utils";

export const PasswordStrengthIndicator = ({
  strengthScore,
}: {
  strengthScore: number;
}) => {
  return (
    <div
      className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
      role="progressbar"
      aria-valuenow={strengthScore}
      aria-valuemin={0}
      aria-valuemax={4}
      aria-label="Password strength"
    >
      <div
        className={`h-full ${getStrengthColor(
          strengthScore
        )} transition-all duration-500 ease-out`}
        style={{ width: `${(strengthScore / 4) * 100}%` }}
      ></div>
    </div>
  );
};

type PasswordRequirementProps = {
  strengthScore: number;
  strength: {
    met: boolean;
    text: string;
  }[];
};

export const PasswordRequirement = ({
  strengthScore,
  strength,
}: PasswordRequirementProps) => {
  return (
    <>
      {/* Password strength description */}
      <p
        id="password-strength"
        className="mb-2 text-sm font-medium text-foreground"
      >
        {getStrengthText(strengthScore)}. Must contain:
      </p>

      {/* Password requirements list */}
      <ul className="space-y-1.5" aria-label="Password requirements">
        {strength.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            {req.met ? (
              <Check
                size={16}
                className="text-emerald-500"
                aria-hidden="true"
              />
            ) : (
              <X
                size={16}
                className="text-muted-foreground/80"
                aria-hidden="true"
              />
            )}
            <span
              className={`text-xs ${
                req.met ? "text-emerald-600" : "text-muted-foreground"
              }`}
            >
              {req.text}
              <span className="sr-only">
                {req.met ? " - Requirement met" : " - Requirement not met"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};
