"use client";

import { Header, Sidebar } from "@/components/dashboard/organization/layout";
import { ProtectedRoute } from "@/components/common";

import { staffNavItems } from "@/config";
import { OrgDashboardLayoutProps, UserRole } from "@/types";

export default function StaffDashboardLayout({
  children,
  params,
}: OrgDashboardLayoutProps) {
  const { organization } = params;

  console.log("organization", JSON.stringify(organization, null, 2));

  return (
    <ProtectedRoute requiredRole={UserRole.STAFF}>
      <div className="flex w-full max-w-[100vw] h-full overscroll-none">
        <Sidebar sidebarItems={staffNavItems} />
        <div className="flex-1 lg:pl-[256px]">
          <Header userType="staff" />
          <main className="p-6 overscroll-none">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
