"use client";

import {
  Bell,
  Bookmark,
  CalendarCheck,
  Compass,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  Menu,
  Search,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type FormEvent, type ReactNode, Suspense, useState } from "react";
import { useStudent } from "@/context/student-context";

interface StudentLayoutProps {
  children: ReactNode;
}

function StudentLayoutContent({ children }: StudentLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { profile, reminders } = useStudent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState("");

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      router.push(`/explore?q=${encodeURIComponent(headerSearch.trim())}`);
    } else {
      router.push("/explore");
    }
  };

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      label: "Explore Events",
      href: "/explore",
      icon: Compass,
      active: pathname === "/explore" || pathname.startsWith("/events"),
    },
    {
      label: "Bookmarked Events",
      href: "/bookmarks",
      icon: Bookmark,
      active: pathname === "/bookmarks",
    },
    {
      label: "My Registrations",
      href: "/registrations",
      icon: CalendarCheck,
      active: pathname === "/registrations",
    },
    {
      label: "My Reminders",
      href: "/reminders",
      icon: Bell,
      active: pathname === "/reminders",
    },
    {
      label: "Profile",
      href: "/profile",
      icon: User,
      active: pathname === "/profile",
    },
  ];

  // Derive student initials for avatar
  const initials = profile.fullName
    ? profile.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "P";

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      {/* 1. Student Top Header matching Frames 05 - 11 */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border bg-surface px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary hover:bg-surface-muted lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            aria-label="Toggle student navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="student-navigation-drawer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            aria-label="CampusLoop Student Dashboard"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
              <Compass className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="text-lg font-bold tracking-tight text-text-primary">
              Campus<span className="text-primary">Loop</span>
            </span>
          </Link>

          {/* Development Demo Switcher Link */}
          <Link
            href="/demo"
            className="hidden xl:inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-500/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ml-2"
            title="Return to Demo Portal Selector"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Demo Mode • Switch Portal</span>
          </Link>
        </div>

        {/* Center: Search input [ Search events by name... ] */}
        <form
          onSubmit={handleSearchSubmit}
          className="mx-4 hidden max-w-md flex-1 sm:block lg:max-w-xl"
        >
          <div className="relative w-full">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-text-disabled"
              aria-hidden="true"
            />
            <input
              type="search"
              aria-label="Search events"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              placeholder="Search events by name..."
              className="h-10 w-full rounded-lg border border-border bg-surface pr-4 pl-9 text-sm text-text-primary placeholder:text-text-disabled transition-colors hover:border-text-secondary/40 focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus"
            />
          </div>
        </form>

        {/* Right: Notification Bell & Me Avatar */}
        <div className="flex items-center gap-3">
          <Link
            href="/reminders"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary hover:bg-surface-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            aria-label={`Notifications (${reminders.length} reminders set)`}
            title="My Reminders"
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
            {reminders.length > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
            )}
          </Link>

          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-lg border border-border bg-surface-muted px-2.5 py-1.5 text-xs font-semibold text-text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            aria-label={`Student Profile: ${profile.fullName}`}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
              {initials}
            </div>
            <span className="hidden sm:inline">Me</span>
          </Link>
        </div>
      </header>

      {/* 2. Main Layout with Sidebar and Content */}
      <div className="flex flex-1">
        {/* Desktop Sidebar matching Frames 05 - 11 */}
        <aside
          className="hidden w-60 shrink-0 flex-col justify-between border-r border-border bg-surface-muted p-4 lg:flex"
          aria-label="Student Navigation"
        >
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                    item.active
                      ? "border border-border bg-surface font-semibold text-text-primary shadow-xs"
                      : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                  }`}
                >
                  <Icon
                    className="h-4 w-4 shrink-0 text-text-secondary"
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions: Demo Switcher & Logout */}
          <div className="border-t border-border pt-4 space-y-1">
            <Link
              href="/demo"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold text-amber-800 hover:bg-amber-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              <LayoutGrid
                className="h-4 w-4 shrink-0 text-amber-600"
                aria-hidden="true"
              />
              <span>Demo Portals</span>
            </Link>
            <Link
              href="/login"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-hover hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Logout</span>
            </Link>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {mobileMenuOpen && (
          <div
            id="student-navigation-drawer"
            className="fixed inset-0 z-50 flex lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Student navigation"
          >
            <button
              type="button"
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation drawer"
            />
            <div className="relative flex w-64 max-w-xs flex-1 flex-col justify-between border-r border-border bg-surface p-5 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="font-bold text-text-primary">Menu</span>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-md p-1 text-text-secondary hover:bg-surface-muted"
                    aria-label="Close navigation"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSearchSubmit} className="pt-1">
                  <div className="relative w-full">
                    <Search
                      className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-text-disabled"
                      aria-hidden="true"
                    />
                    <input
                      type="search"
                      aria-label="Search events"
                      value={headerSearch}
                      onChange={(e) => setHeaderSearch(e.target.value)}
                      placeholder="Search events..."
                      className="h-9 w-full rounded-lg border border-border bg-surface pr-3 pl-9 text-xs text-text-primary focus:border-focus focus:outline-none"
                    />
                  </div>
                </form>

                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={item.active ? "page" : undefined}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          item.active
                            ? "bg-surface-muted font-semibold text-text-primary"
                            : "text-text-secondary hover:bg-surface-muted"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="border-t border-border pt-4 space-y-1">
                <Link
                  href="/demo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold text-amber-800 hover:bg-amber-500/10"
                >
                  <LayoutGrid
                    className="h-4 w-4 shrink-0 text-amber-600"
                    aria-hidden="true"
                  />
                  <span>Demo Portals</span>
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface-muted hover:text-danger"
                >
                  <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Logout</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 3. Main Content View Area */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-surface text-text-secondary">
          Loading student layout...
        </div>
      }
    >
      <StudentLayoutContent>{children}</StudentLayoutContent>
    </Suspense>
  );
}
