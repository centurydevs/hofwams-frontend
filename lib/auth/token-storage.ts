import { TokenPair } from "@/types";
import { cookies } from "next/headers";

export class TokenStorage {
  static setTokens(tokens: TokenPair) {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      path: "/",
    };

    // Access token (short-lived)
    cookies().set("access_token", tokens.accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60, // 15 minutes
    });

    // Refresh token (long-lived)
    cookies().set("refresh_token", tokens.refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
  }

  static getAccessToken(): string | undefined {
    return cookies().get("access_token")?.value;
  }

  static getRefreshToken(): string | undefined {
    return cookies().get("refresh_token")?.value;
  }

  static clearTokens() {
    cookies().delete("access_token");
    cookies().delete("refresh_token");
  }
}
