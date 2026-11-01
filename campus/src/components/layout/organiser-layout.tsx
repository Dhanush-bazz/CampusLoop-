"use client";

import {
  CalendarPlus,
  Compass,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, Suspense, useState } from "react";
import ProtectedRoute from "@/components/auth/protected-route";
import { useAuth } from "@/context/auth-context";
import { useOrganiser } from "@/context/organiser-context";

interface OrganiserLayoutProps {
  children: ReactNode;
}

function OrganiserLayoutContent({ children }: OrganiserLayoutProps) {
  const pathname = usePathname();
  const { profile } = useOrganiser();
  const { logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      href: "/organiser/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/organiser/dashboard",
    },
    {
      label: "My Events",
      href: "/organiser/events",
      icon: ListOrdered,
      active:
        pathname === "/organiser/events" ||
        (pathname.startsWith("/organiser/events/") &&
          !pathname.includes("/create")),
    },
    {
      label: "Create Event",
      href: "/organiser/events/create",
      icon: CalendarPlus,
      active: pathname === "/organiser/events/create",
    },
    {
      label: "Profile",
      href: "/organiser/profile",
      icon: User,
      active: pathname === "/organiser/profile",
    },
  ];

  const initials = profile.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AK";

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      {/* 1. Organiser Top Header matching Frames 12 - 16 */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border bg-surface px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo & Portal Tag */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary hover:bg-surface-muted lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            aria-label="Toggle organiser navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="organiser-navigation-drawer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
          <Link
            href="/organiser/dashboard"
            className="flex items-center gap-2 font-bold text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-md"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-black text-sm">
              CL
            </div>
            <span className="text-lg tracking-tight">CampusLoop</span>
            <span className="hidden sm:inline-block text-border text-lg font-light">
              |
            </span>
            <span className="hidden sm:inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
              Organiser Portal
            </span>
          </Link>
        </div>

        {/* Right: Organiser Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/organiser/profile"
            className="flex items-center gap-2 rounded-full p-1 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white ring-2 ring-primary/20">
              {initials}
            </div>
            <span className="hidden text-sm font-semibold text-text-primary md:inline">
              {profile.name}
            </span>
          </Link>
        </div>
      </header>

      {/* 2. Main Body with Fixed Sidebar */}
      <div className="flex flex-1">
        {/* Desktop Sidebar (240px wide matching SVG x=0..240) */}
        <aside className="hidden w-60 shrink-0 border-r border-border bg-surface lg:flex lg:flex-col justify-between p-4">
          <nav className="space-y-1" aria-label="Organiser Portal Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                    item.active
                      ? "bg-primary text-white font-semibold shadow-sm"
                      : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      item.active ? "text-white" : "text-text-tertiary"
                    }`}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Sidebar bottom links: Student View & Logout */}
          <div className="space-y-2 border-t border-border pt-4">
            <Link
              href="/dashboard"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              <Compass
                className="h-4 w-4 shrink-0 text-text-tertiary"
                aria-hidden="true"
              />
              <span>Student View</span>
            </Link>

            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="organiser-navigation-drawer"
            className="fixed inset-0 z-50 flex lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Backdrop */}
            <button
              type="button"
              className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation overlay"
            />

            {/* Drawer */}
            <div className="relative flex w-full max-w-xs flex-1 flex-col bg-surface p-6 shadow-xl">
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-black text-sm">
                    CL
                  </div>
                  <span className="font-bold text-text-primary">
                    Organiser Portal
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg p-1.5 text-text-secondary hover:bg-surface-muted"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-6 space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={item.active ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                        item.active
                          ? "bg-primary text-white font-semibold"
                          : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto border-t border-border pt-6 space-y-2">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-muted"
                >
                  <Compass
                    className="h-4 w-4 shrink-0 text-text-tertiary"
                    aria-hidden="true"
                  />
                  <span>Student View</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 bg-surface-muted/30 p-4 sm:p-6 lg:p-8 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function OrganiserLayout({ children }: OrganiserLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={["organiser", "admin"]}>
      <Suspense
        fallback={
          <div className="min-h-screen bg-surface p-8">
            Loading organiser portal...
          </div>
        }
      >
        <OrganiserLayoutContent>{children}</OrganiserLayoutContent>
      </Suspense>
    </ProtectedRoute>
  );
}
