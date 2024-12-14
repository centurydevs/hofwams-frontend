import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import { AuthService } from "@/lib/auth";
import { User } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { push } = useRouter();

  // Fetch user on initial load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error("Failed to fetch user", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Login method with enhanced error handling
  const loginWithPassword = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const userData = await AuthService.loginWithEmailPassword(
          email,
          password
        );
        setUser(userData);

        push("/dashboard");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred";
        setError(errorMessage);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    },
    [push]
  );

  const loginWithOTP = useCallback(
    async (email: string, otp: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const userData = await AuthService.loginWithOTP(email, otp);

        setUser(userData);

        push("/dashboard");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred";
        setError(errorMessage);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    },
    [push]
  );

  // Logout method
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      setUser(null);
      push("/auth");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Logout failed";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [push]);

  return {
    user,
    isLoading,
    error,
    loginWithPassword,
    logout,
    loginWithOTP,
    isAuthenticated: !!user,
  };
}
