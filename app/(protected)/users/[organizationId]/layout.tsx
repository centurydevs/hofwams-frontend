import { ReactNode } from "react";

import { AppSidebar } from "@/components/dashboard/users/layout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type UsersDashboardLayoutProps = {
  children: ReactNode;
  params: { organizationId: string };
};

export default function UsersDashboardLayout({
  children,
  params,
}: UsersDashboardLayoutProps) {
  const { organizationId } = params;

  console.log({ organizationId });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
