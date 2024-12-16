"use client";

import { Header, Sidebar } from "@/components/dashboard/organization/layout";
import { ProtectedRoute } from "@/components/common";

import { adminNavItems } from "@/config";
import { OrgDashboardLayoutProps, UserRole } from "@/types";

export default function AdminDashboardLayout({
  children,
  params,
}: OrgDashboardLayoutProps) {
  const { organization } = params;

  console.log({ organization });

  return (
    <ProtectedRoute requiredRole={UserRole.ADMIN}>
      <div className="flex w-full max-w-[100vw] h-full overscroll-none">
        <Sidebar sidebarItems={adminNavItems} />
        <div className="flex-1 lg:pl-[256px]">
          <Header userType="admin" />
          <main className="p-6 overscroll-none">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
