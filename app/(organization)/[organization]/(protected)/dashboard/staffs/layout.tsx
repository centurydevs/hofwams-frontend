"use client";

import { Header, Sidebar } from "@/components/dashboard/organization/layout";
import { ProtectedRoute } from "@/components/global/protected-route";

import { staffNavItems } from "@/config";
import { OrgDashboardLayoutProps, UserRole } from "@/types";

export default function StaffDashboardLayout({
  children,
  params,
}: OrgDashboardLayoutProps) {
  const { organization } = params;

  console.log({ organization });

  return (
    <ProtectedRoute requiredRole={UserRole.STAFF}>
      <div className="flex h-screen overscroll-none">
        <Sidebar sidebarItems={staffNavItems} />
        <div className="flex-1 lg:pl-[256px]">
          <Header userType="staff" />
          <main className="p-6 overscroll-none">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
