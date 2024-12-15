"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { UserRole } from "@/types";
import { useAuth } from "@/hooks/use-auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // No user - redirect to login
      if (!user) {
        push("/login");
        return;
      }

      // Check role if required
      if (requiredRole && user.role !== requiredRole) {
        push("/unauthorized");
      }
    }
  }, [user, isLoading, requiredRole, push]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Render children if authenticated and authorized
  return <>{children}</>;
}
