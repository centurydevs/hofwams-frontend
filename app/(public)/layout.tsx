"use client";

import { ReactNode, useEffect, useState } from "react";

import { Footer, Header } from "@/components/public";

const PublicLayout = ({ children }: { children: ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header isScrolled={isScrolled} />
      {children}
      <Footer />
    </>
  );
};

export default PublicLayout;
