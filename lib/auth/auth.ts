import { ApiClient } from "./api-client";
import { AuthError } from "./auth-error";
import { TokenStorage } from "./token-storage";
import { User, AuthResponse, PasswordChangeRequest } from "@/types";

export class AuthService {
  static async loginWithEmailPassword(
    email: string,
    password: string
  ): Promise<User> {
    try {
      const response = await ApiClient.getInstance().post<AuthResponse>(
        "/auth/login",
        {
          email,
          password,
        }
      );

      // Store tokens
      TokenStorage.setTokens(response.data.tokens);

      return response.data.user;
    } catch (error) {
      console.error("Login failed", JSON.stringify(error, null, 2));
      throw AuthError.fromAxiosError(error);
    }
  }

  static async loginWithOTP(email: string, otp: string): Promise<User> {
    try {
      const response = await ApiClient.getInstance().post<AuthResponse>(
        "/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      TokenStorage.setTokens(response.data.tokens);

      return response.data.user;
    } catch (error) {
      console.error("OTP verification failed", JSON.stringify(error, null, 2));
      throw AuthError.fromAxiosError(error);
    }
  }

  static async googleSignIn(googleToken: string): Promise<User> {
    try {
      const response = await ApiClient.getInstance().post<AuthResponse>(
        "/auth/google-signin",
        {
          token: googleToken,
        }
      );

      TokenStorage.setTokens(response.data.tokens);

      return response.data.user;
    } catch (error) {
      console.error("Google Sign-in failed", JSON.stringify(error, null, 2));
      throw AuthError.fromAxiosError(error);
    }
  }

  static async logout() {
    try {
      // Invalidate refresh token on the server
      await ApiClient.getInstance().post("/auth/logout", {
        refreshToken: TokenStorage.getRefreshToken(),
      });
    } catch (error) {
      console.error("Logout failed", JSON.stringify(error, null, 2));
      throw AuthError.fromAxiosError(error);
    } finally {
      // Always clear tokens
      TokenStorage.clearTokens();
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    try {
      const response = await ApiClient.getInstance().get<User>("/auth/me");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch current user", error);
      return null;
    }
  }

  // Change password (requires authentication)
  static async changePassword(passwords: PasswordChangeRequest): Promise<void> {
    // Client-side validation before API call
    const { newPassword, confirmNewPassword, currentPassword } = passwords;
    if (newPassword !== confirmNewPassword) {
      throw new AuthError("New passwords do not match", "PASSWORD_MISMATCH");
    }

    try {
      await ApiClient.getInstance().post("/auth/change-password", {
        currentPassword,
        newPassword,
      });
    } catch (error) {
      throw AuthError.fromAxiosError(error);
    }
  }
}
