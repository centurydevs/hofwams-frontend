import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  authRoute,
  protectedRoutes,
  publicRoutes,
  subdomainProtectedRoutes,
} from "./config";
import { verifyToken } from "./lib/utils";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const pathname = req.nextUrl.pathname;

  // Get host for multi-tenant routing
  const host = req.headers.get("host") || "";
  const allowedHosts = ["localhost:3000", "hofwams.com"];

  // Check if host is allowed for multi-tenancy
  if (!allowedHosts.some((allowedHost) => host.endsWith(allowedHost))) {
    return NextResponse.next();
  }

  const subdomain = host.split(".")[0];
  const isSubdomain = subdomain && subdomain !== "www" && subdomain !== host;

  // Clone URL for route rewriting
  const url = req.nextUrl.clone();

  // Handle subdomain routing
  if (isSubdomain) {
    console.log("Subdomain detected:", subdomain);
    console.log("Original pathname:", pathname);

    // Default to organization home page for root subdomain route
    const newPathname =
      pathname === "/" ? `/${subdomain}` : `/${subdomain}${pathname}`;

    console.log("New pathname:", newPathname);

    // Rewrite URL for organization routes
    url.pathname = newPathname;

    // Check if this is an organization-specific route
    const isSubdomainProtectedRoute = subdomainProtectedRoutes.some((route) =>
      new RegExp(`^/${subdomain}${route.source.slice(1)}$`).test(newPathname)
    );

    // Verify token for protected routes
    if (isSubdomainProtectedRoute) {
      const payload = await verifyToken(accessToken);

      if (!payload) {
        // Redirect to organization login if no valid token
        return NextResponse.redirect(new URL(`/login`, req.url));
      }

      // Optional: Add role-based access control
      const userRole = payload.role;
      const requestedPath = newPathname.split("/").pop();

      if (
        (requestedPath === "admin" && userRole !== "admin") ||
        (requestedPath === "staffs" && userRole !== "staff")
      ) {
        // Redirect to unauthorized or dashboard based on role
        return NextResponse.redirect(
          new URL(`/${subdomain}/dashboard/${userRole}`, req.url)
        );
      }
    }

    return NextResponse.rewrite(url);
  }

  // Handle non-subdomain routes
  const isPublicRoute = publicRoutes.some((route) => route.test(pathname));
  const isProtectedRoute = protectedRoutes.some((route) =>
    route.test(pathname)
  );

  // Verify token for protected routes
  if (isProtectedRoute) {
    const payload = await verifyToken(accessToken);

    if (!payload) {
      // Redirect to main auth page if no valid token
      return NextResponse.redirect(new URL(authRoute, req.url));
    }

    return NextResponse.next();
  }

  // Public routes are always allowed
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Default: block access
  return NextResponse.redirect(new URL(authRoute, req.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
