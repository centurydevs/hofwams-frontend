import { NavItem } from "@/types";
import { Bell, Calendar, LayoutDashboard, Settings2 } from "lucide-react";

export const userMenuItems = (organizationId: string): NavItem[] => [
  {
    title: "Home",
    href: `/dashboard/${organizationId}`,
    icon: LayoutDashboard,
  },
  {
    title: "My Events",
    href: `/dashboard/${organizationId}/events`,
    icon: Calendar,
  },
  {
    title: "Event Requests",
    href: `/dashboard/${organizationId}/event-requests`,
    icon: Bell,
  },

  {
    title: "Settings",
    href: `/dashboard/${organizationId}/settings`,
    icon: Settings2,
  },
];
