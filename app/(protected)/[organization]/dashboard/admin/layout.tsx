"use client";

import { Header, Sidebar } from "@/components/dashboard/organization/layout";

import { adminNavItems } from "@/config";
import { OrgDashboardLayoutProps } from "@/types";

export default function AdminDashboardLayout({
  children,
  params,
}: OrgDashboardLayoutProps) {
  const { organization } = params;

  console.log({ organization });

  return (
    <div className="flex h-screen overscroll-none">
      <Sidebar sidebarItems={adminNavItems} />
      <div className="flex-1 lg:pl-[256px]">
        <Header userType="staff" />
        <main className="p-6 overscroll-none">{children}</main>
      </div>
    </div>
  );
}
