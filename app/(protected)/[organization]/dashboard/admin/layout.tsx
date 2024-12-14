"use client";

import { ReactNode } from "react";

import { Header, Sidebar } from "@/components/dashboard/organization/layout";

import { adminNavItems } from "@/config";

type AdminDashboardLayoutProps = {
  children: ReactNode;
  params: { organization: string };
};

export default function AdminDashboardLayout({
  children,
  params,
}: AdminDashboardLayoutProps) {
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
