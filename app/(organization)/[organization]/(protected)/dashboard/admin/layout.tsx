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
      <div className="flex h-screen overscroll-none">
        <Sidebar sidebarItems={adminNavItems} />
        <div className="flex-1 lg:pl-[256px]">
          <Header userType="staff" />
          {/* <main className="p-6 overscroll-none">{children}</main> */}
          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-background to-background/80">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
