"use client";

import {
  Briefcase,
  CheckCircle2,
  Clock,
  Compass,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  Menu,
  ShieldCheck,
  X,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, Suspense, useEffect, useState } from "react";
import { useAdmin } from "@/context/admin-context";

interface AdminLayoutProps {
  children: ReactNode;
}

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const { profile, stats } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/admin/dashboard",
    },
    {
      label: "Pending Events",
      href: "/admin/events/pending",
      icon: Clock,
      badge: isMounted && stats.pending > 0 ? stats.pending : undefined,
      badgeColor: "bg-amber-100 text-amber-800",
      active:
        pathname === "/admin/events/pending" ||
        (pathname.startsWith("/admin/events/") && pathname.includes("/review")),
    },
    {
      label: "Approved Events",
      href: "/admin/events/approved",
      icon: CheckCircle2,
      active: pathname === "/admin/events/approved",
    },
    {
      label: "Rejected Events",
      href: "/admin/events/rejected",
      icon: XCircle,
      active: pathname === "/admin/events/rejected",
    },
  ];

  const initials = profile.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AD";

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      {/* 1. Admin Top Header matching Frames 17 - 22 */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border bg-surface px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo & Admin Console Tag */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary hover:bg-surface-muted lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            aria-label="Toggle admin navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="admin-navigation-drawer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 font-bold text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-md"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-black text-sm">
              CL
            </div>
            <span className="text-lg tracking-tight">CampusLoop</span>
            <span className="hidden sm:inline-block text-border text-lg font-light">
              |
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-md bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700 ring-1 ring-inset ring-purple-600/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              Admin Console
            </span>
          </Link>
        </div>

        {/* Right: Demo Mode indicator & Admin Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/demo"
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50/80 px-2.5 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            title="Switch demo role / view all demo portals"
          >
            <LayoutGrid className="h-3.5 w-3.5 text-amber-600" />
            <span className="hidden sm:inline">Demo Mode •</span> Switch Portal
          </Link>

          <div
            className="flex items-center gap-2 rounded-full p-1"
            title={`${profile.name} (${profile.role})`}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-700 text-xs font-bold text-white ring-2 ring-purple-600/20">
              {initials}
            </div>
            <span className="hidden text-sm font-semibold text-text-primary md:inline">
              Admin
            </span>
          </div>
        </div>
      </header>

      {/* 2. Main Body with Fixed Sidebar */}
      <div className="flex flex-1">
        {/* Desktop Sidebar (240px wide matching SVG x=0..240) */}
        <aside className="hidden w-60 shrink-0 border-r border-border bg-surface lg:flex lg:flex-col justify-between p-4">
          <nav className="space-y-1" aria-label="Admin Console Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                    item.active
                      ? "bg-primary text-white font-semibold shadow-sm"
                      : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-4 w-4 shrink-0 ${
                        item.active ? "text-white" : "text-text-tertiary"
                      }`}
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                        item.active ? "bg-white text-primary" : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar bottom links: Demo Switcher & Logout */}
          <div className="space-y-2 border-t border-border pt-4">
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
              href="/organiser/dashboard"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              <Briefcase
                className="h-4 w-4 shrink-0 text-text-tertiary"
                aria-hidden="true"
              />
              <span>Organiser Portal</span>
            </Link>

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

            <Link
              href="/admin/login"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Logout</span>
            </Link>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="admin-navigation-drawer"
            className="fixed inset-0 z-50 flex lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Admin Navigation Menu"
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
                    Admin Console
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
                      className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium ${
                        item.active
                          ? "bg-primary text-white font-semibold"
                          : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                            item.active
                              ? "bg-white text-primary"
                              : item.badgeColor
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto border-t border-border pt-6 space-y-2">
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
                  href="/organiser/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-muted"
                >
                  <Briefcase
                    className="h-4 w-4 shrink-0 text-text-tertiary"
                    aria-hidden="true"
                  />
                  <span>Organiser Portal</span>
                </Link>
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
                <Link
                  href="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Logout</span>
                </Link>
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

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-surface p-8">Loading...</div>}
    >
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </Suspense>
  );
}
