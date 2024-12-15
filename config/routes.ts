export const ROUTES = {
  HOME: "/",
  ABOUT: "/about-us",
  SERVICES: "/services",
  CONTACT: "/contact-us",
  BLOG: "/blog",
  PRIVACY: "/privacy-policy",
  AUTH: "/auth",
  ADMIN_DASHBOARD: "/dashboard/admin",
  STAFF_DASHBOARD: "/dashboard/staffs",
};

export const publicRoutes = [
  /^\/$/,
  /^\/about-us/,
  /^\/contact-us/,
  /^\/services/,
  /^\/blog/,
  /^\/blog\/[^/]+$/,
  /^\/privacy-policy/,
  /^\/terms-of-use/,
  /^\/auth/,
];

export const protectedRoutes = [/^\/users\/[^/]+/];

export const subdomainProtectedRoutes = [
  /^\/dashboard\/admin/,
  /^\/dashboard\/staffs/,
];

export const authRoute = "/auth";
export const subdomainAuthRoute = /^\/login/;
export const subdomainPublicRoute = /^\/[^/]+/;
