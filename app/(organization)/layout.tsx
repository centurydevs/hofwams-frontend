"use client";

import { ReactNode } from "react";
import { QueryProvider } from "@/components/common";

const OrgGroupLayout = ({ children }: { children: ReactNode }) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default OrgGroupLayout;
