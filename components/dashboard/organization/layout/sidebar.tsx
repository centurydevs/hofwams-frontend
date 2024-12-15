"use client";

import Link from "next/link";

import { NavItems } from "./nav-items";

import { NavItem } from "@/types";

export function Sidebar({ sidebarItems }: { sidebarItems: NavItem[] }) {
  return (
    <div className="hidden border-r bg-muted/10 lg:block lg:w-64 fixed top-0 left-0 bottom-0">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="h-6 w-6">S</span>
          <span>Welcome Sheraton</span>
        </Link>
      </div>

      <NavItems sidebarItems={sidebarItems} />
    </div>
  );
}
