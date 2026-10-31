"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, Suspense } from "react";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { OrganiserProvider } from "@/context/organiser-context";
import { StudentProvider } from "@/context/student-context";

interface AppShellProps {
  children: ReactNode;
}

function AppShellContent({ children }: AppShellProps) {
  const pathname = usePathname();

  // Route-based chrome rules matching wireframes:
  // /signup:           Navbar Hidden,  Footer Hidden (Frame 02)
  // /login:            Navbar Visible, Footer Hidden (Frame 03)
  // /forgot-password:  Navbar Visible, Footer Hidden (Frame 04)
  // Student routes:    Navbar Hidden (Student Chrome), Footer Hidden (Frames 05-11)
  // Organiser routes:  Navbar Hidden (Organiser Chrome), Footer Hidden (Frames 12-16)
  // Public routes:     Navbar Visible, Footer Visible (Frame 01)
  const isStudentRoute =
    pathname === "/dashboard" ||
    pathname === "/explore" ||
    pathname.startsWith("/events") ||
    pathname === "/bookmarks" ||
    pathname === "/registrations" ||
    pathname === "/reminders" ||
    pathname === "/profile";

  const isOrganiserRoute = pathname.startsWith("/organiser");

  const showNavbar =
    pathname !== "/signup" && !isStudentRoute && !isOrganiserRoute;
  const showFooter =
    pathname !== "/signup" &&
    pathname !== "/login" &&
    pathname !== "/forgot-password" &&
    !isStudentRoute &&
    !isOrganiserRoute;

  return (
    <>
      {showNavbar && <Navbar />}
      <main className="flex flex-1 flex-col">{children}</main>
      {showFooter && <Footer />}
    </>
  );
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <StudentProvider>
      <OrganiserProvider>
        <Suspense
          fallback={<main className="flex flex-1 flex-col">{children}</main>}
        >
          <AppShellContent>{children}</AppShellContent>
        </Suspense>
      </OrganiserProvider>
    </StudentProvider>
  );
}
