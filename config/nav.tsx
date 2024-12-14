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

export const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Events",
    icon: Calendar,
    href: "/events",
  },
  {
    title: "Customer",
    icon: Users,
    href: "/customers",
  },
  {
    title: "Staff",
    icon: UserCog,
    href: "/staff",
  },
  {
    title: "Ingredient inventory",
    icon: ShoppingBasket,
    href: "/ingredient-inventory",
  },
  {
    title: "Meal inventory",
    icon: UtensilsCrossed,
    href: "/meal-inventory",
  },
  {
    title: "Drink inventory",
    icon: Wine,
    href: "/drink-inventory",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];
