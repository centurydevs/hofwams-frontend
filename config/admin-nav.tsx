import {
  LayoutDashboard,
  Calendar,
  Users,
  UserCog,
  ShoppingBasket,
  UtensilsCrossed,
  Wine,
  Settings,
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
    title: "Customer",
    icon: Users,
    href: `${ROUTES.ADMIN_DASHBOARD}/customers`,
  },
  {
    title: "Staff",
    icon: UserCog,
    href: `${ROUTES.ADMIN_DASHBOARD}/staffs`,
  },
  {
    title: "Ingredient inventory",
    icon: ShoppingBasket,
    href: `${ROUTES.ADMIN_DASHBOARD}/ingredient-inventory`,
  },
  {
    title: "Meal inventory",
    icon: UtensilsCrossed,
    href: `${ROUTES.ADMIN_DASHBOARD}/meal-inventory`,
  },
  {
    title: "Drink inventory",
    icon: Wine,
    href: `${ROUTES.ADMIN_DASHBOARD}/drink-inventory`,
  },
  {
    title: "Settings",
    icon: Settings,
    href: `${ROUTES.ADMIN_DASHBOARD}/settings`,
  },
];
