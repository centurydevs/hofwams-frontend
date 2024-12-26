import {
  Box,
  CreditCard,
  Calendar,
  LayoutDashboard,
  Users,
  UserCog,
  ShoppingBasket,
  UtensilsCrossed,
  Wine,
  Settings,
  User,
} from "lucide-react";
import { NavItem } from "@/types";
import { ROUTES } from "./routes";

export const adminNavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: `${ROUTES.ADMIN_DASHBOARD}`,
  },
  {
    title: "Events",
    icon: Calendar,
    href: `${ROUTES.ADMIN_DASHBOARD}/events`,
  },
  {
    title: "Customers",
    icon: Users,
    href: `${ROUTES.ADMIN_DASHBOARD}/customers`,
  },
  {
    title: "Staffs",
    icon: UserCog,
    href: `${ROUTES.ADMIN_DASHBOARD}/staffs`,
  },
  {
    title: "Inventories",
    icon: Box,
    href: "#",
    submenu: [
      {
        title: "Ingredient",
        icon: ShoppingBasket,
        href: `${ROUTES.ADMIN_DASHBOARD}/inventory/ingredient`,
      },
      {
        title: "Meal",
        icon: UtensilsCrossed,
        href: `${ROUTES.ADMIN_DASHBOARD}/inventory/meal`,
      },
      {
        title: "Drink",
        icon: Wine,
        href: `${ROUTES.ADMIN_DASHBOARD}/inventory/drink`,
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    href: "#",
    submenu: [
      {
        title: "Role Management",
        href: `${ROUTES.ADMIN_DASHBOARD}/settings/role-management`,
        icon: UserCog,
      },
      {
        title: "Account",
        href: `${ROUTES.ADMIN_DASHBOARD}/settings/account`,
        icon: User,
      },
      {
        title: "Billing",
        href: `${ROUTES.ADMIN_DASHBOARD}/settings/billing`,
        icon: CreditCard,
      },
    ],
  },
];
