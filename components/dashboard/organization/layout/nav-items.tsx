"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { cn } from "@/lib/utils";
import { NavItem } from "@/types";

const NavLink = ({ item, pathname }: { item: NavItem; pathname: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.2 }}
  >
    <Button
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
  </motion.div>
);

export const NavItems = ({ sidebarItems }: { sidebarItems: NavItem[] }) => {
  const pathname = usePathname();

  return (
    <motion.div
      className="space-y-1 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {sidebarItems.map((item) =>
        item.submenu ? (
          <CollapsibleNavItems
            key={item.title}
            item={item}
            pathname={pathname}
          />
        ) : (
          <NavLink key={item.href} item={item} pathname={pathname} />
        )
      )}
    </motion.div>
  );
};

export const CollapsibleNavItems = ({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <item.icon className="h-4 w-4" />
          {item.title}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-auto h-4 w-4"
          >
            <ChevronDown className="ml-auto h-4 w-4" />
          </motion.div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <motion.div
          className="ml-4 space-y-1"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {item.submenu?.map((subItem) => (
              <NavLink key={subItem.href} item={subItem} pathname={pathname} />
            ))}
          </AnimatePresence>
        </motion.div>
      </CollapsibleContent>
    </Collapsible>
  );
};
