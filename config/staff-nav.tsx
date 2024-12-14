import {
  LayoutDashboard,
  Calendar,
  ShoppingBasket,
  UtensilsCrossed,
  Wine,
} from "lucide-react";
import { NavItem } from "@/types";
import { ROUTES } from "./routes";

export const staffNavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: `${ROUTES.STAFF_DASHBOARD}`,
  },
  {
    title: "Events",
    icon: Calendar,
    href: `${ROUTES.STAFF_DASHBOARD}/events`,
  },
  {
    title: "Ingredient inventory",
    icon: ShoppingBasket,
    href: `${ROUTES.STAFF_DASHBOARD}/ingredient-inventory`,
  },
  {
    title: "Meal inventory",
    icon: UtensilsCrossed,
    href: `${ROUTES.STAFF_DASHBOARD}/meal-inventory`,
  },
  {
    title: "Drink inventory",
    icon: Wine,
    href: `${ROUTES.STAFF_DASHBOARD}/drink-inventory`,
  },
];
