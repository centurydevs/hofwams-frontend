import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";

export const NavItems = ({ sidebarItems }: { sidebarItems: NavItem[] }) => {
  const pathname = usePathname();

  return (
    <div className="space-y-1 p-4">
      {sidebarItems.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-2",
            pathname === item.href && "bg-primary/10 hover:bg-primary/20"
          )}
          asChild
        >
          <Link href={item.href} className="relative">
            <item.icon className="h-4 w-4" />
            {item.title}
            {pathname === item.href && (
              <motion.div
                layoutId="sidebar-active"
                className="absolute left-0 top-0 h-full w-1 bg-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </Link>
        </Button>
      ))}
    </div>
  );
};
