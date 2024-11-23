import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export const LoadingButton = ({
  isLoading,
  loadingText = "Please wait",
  children,
  className,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      type="submit"
      className={cn("w-full", className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
};
