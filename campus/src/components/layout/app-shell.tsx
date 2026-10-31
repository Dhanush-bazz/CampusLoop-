"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  // Route-based chrome rules matching wireframes:
  // /signup: Navbar Hidden, Footer Hidden
  // /login:  Navbar Visible, Footer Hidden
  // Other:   Navbar Visible, Footer Visible
  const showNavbar = pathname !== "/signup";
  const showFooter = pathname !== "/signup" && pathname !== "/login";

  return (
    <>
      {showNavbar && <Navbar />}
      <main className="flex flex-1 flex-col">{children}</main>
      {showFooter && <Footer />}
    </>
  );
}
