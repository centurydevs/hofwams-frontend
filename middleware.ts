import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;

  const pathname = req.nextUrl.pathname;

  // Multi-tenant routing
  const host = req.headers.get("host");
  const subdomain = host?.split(".")[0];

  if (subdomain && subdomain !== "www") {
    const url = req.nextUrl.clone();
    url.pathname = `/${subdomain}${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Protected routes
  const protectedRoutes = [
    /^\/[^/]+\/dashboard\/admin/,
    /^\/[^/]+\/dashboard\/staff/,
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    route.test(pathname)
  );

  if (isProtectedRoute) {
    // No token
    if (!accessToken) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    // Verify token
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(accessToken, secret);

      // Additional checks can be added here for role, organization, etc.
      const organizationSlug = pathname.split("/")[1];

      // Example of organization check (adjust based on your token payload)
      if (payload.organizationId !== organizationSlug) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Token verification failed", error);
      // Token verification failed
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
