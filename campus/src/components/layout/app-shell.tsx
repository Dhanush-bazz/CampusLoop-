"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, Suspense } from "react";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { AdminProvider } from "@/context/admin-context";
import { AuthProvider } from "@/context/auth-context";
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
  // Admin routes:      Navbar Hidden (Admin Chrome), Footer Hidden (Frames 17-22)
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
  const isAdminRoute = pathname.startsWith("/admin");

  const showNavbar =
    pathname !== "/signup" &&
    !isStudentRoute &&
    !isOrganiserRoute &&
    !isAdminRoute;
  const showFooter =
    pathname !== "/signup" &&
    pathname !== "/login" &&
    pathname !== "/forgot-password" &&
    !isStudentRoute &&
    !isOrganiserRoute &&
    !isAdminRoute;

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
    <AuthProvider>
      <OrganiserProvider>
        <AdminProvider>
          <StudentProvider>
            <Suspense
              fallback={
                <main className="flex flex-1 flex-col">{children}</main>
              }
            >
              <AppShellContent>{children}</AppShellContent>
            </Suspense>
          </StudentProvider>
        </AdminProvider>
      </OrganiserProvider>
    </AuthProvider>
  );
}
