"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggler } from "@/components/ui/theme-toggler";

import { cn } from "@/lib/utils";

type HeaderProps = {
  isScrolled: boolean;
};

export const Header = ({ isScrolled }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = ["Home", "About us", "Services", "Blog", "Contact us"];

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const isActive = (path: string) => {
    if (path === "Home") {
      return pathname === "/";
    }
    return pathname.startsWith(`/${path.toLowerCase().replace(" ", "-")}`);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item}
                href={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "-")}`
                }
                className={cn(
                  "transition-colors duration-300",
                  isScrolled
                    ? "text-gray-700 dark:text-gray-300"
                    : "text-gray-300",
                  isActive(item)
                    ? "text-green-700 dark:text-green-500 font-bold"
                    : "hover:text-green-700 dark:hover:text-green-500",
                  isActive(item) && !isScrolled && "text-green-100"
                )}
                aria-current={isActive(item) ? "page" : undefined}
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggler />
            <Button
              variant="ghost"
              className={cn(
                "hover:bg-[#ECF8F2] hover:text-[#00AB55] duration-300 justify-center",
                isScrolled
                  ? "text-gray-700 dark:hover:bg-[#00AB5529] dark:text-gray-100 dark:hover:text-[#00AB55]"
                  : "text-gray-100"
              )}
            >
              Log In
            </Button>
            <Button className="bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-gray-100">
              Get Started
            </Button>
          </div>

          <div className="lg:hidden flex items-center">
            <ThemeToggler />
            <Button variant="ghost" onClick={toggleMobileMenu} className="ml-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="lg:hidden bg-white dark:bg-gray-900 shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col py-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={
                      item === "Home"
                        ? "/"
                        : `/${item.toLowerCase().replace(" ", "-")}`
                    }
                    className={cn(
                      "transition-colors px-4 py-2 block",
                      isScrolled
                        ? "text-gray-700 dark:text-gray-300"
                        : "text-gray-500",
                      isActive(item)
                        ? "text-green-700 dark:text-green-500 font-semibold"
                        : "hover:text-green-700 dark:hover:text-green-500"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-current={isActive(item) ? "page" : undefined}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="flex flex-col space-y-2 px-4 mt-4"
              >
                <Button
                  variant="ghost"
                  className="hover:bg-[#ECF8F2] hover:text-[#00AB55] duration-300 justify-center text-gray-700 dark:hover:bg-[#00AB5529] dark:text-gray-100 dark:hover:text-[#00AB55]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log In
                </Button>
                <Button
                  className="bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
