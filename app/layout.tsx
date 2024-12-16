import type { Metadata } from "next";
import { Poppins, Fraunces } from "next/font/google";

import { ThemeProvider } from "@/components/common/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { BackToTop } from "@/components/common/back-to-top";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "HOFWAMS",
  description:
    "Pioneering sustainable solutions for food waste management in the hospitality industry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head />
      <body
        className={`${poppins.variable} ${fraunces.variable} antialiased min-h-svh w-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <BackToTop />
        </ThemeProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{ duration: 5000 }}
          richColors
        />
      </body>
    </html>
  );
}
