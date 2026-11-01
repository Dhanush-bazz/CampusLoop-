"use client";

import { Compass, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { getRoleDashboardPath } from "@/lib/auth/auth-service";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const dashboardHref = user ? getRoleDashboardPath(user.role) : "/login";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/90 backdrop-blur-md transition-shadow duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side: Brand Logo & Title with micro-interaction */}
        <div className="flex items-center">
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus p-1 transition-all"
            aria-label="CampusLoop Home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm shadow-primary/30 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6">
              <Compass
                className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45"
                aria-hidden="true"
              />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-text-primary">
              Campus<span className="text-primary">Loop</span>
            </span>
          </Link>
        </div>

        {/* Middle: Desktop Navigation Links with animated hover pill */}
        <nav
          className="hidden items-center gap-1.5 md:flex"
          aria-label="Main Navigation"
        >
          <Link
            href="/"
            className="relative rounded-lg px-3.5 py-2 text-sm font-semibold text-text-primary transition-all duration-200 hover:text-primary hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            Home
          </Link>
          <Link
            href="/explore"
            className="relative rounded-lg px-3.5 py-2 text-sm font-semibold text-text-secondary transition-all duration-200 hover:text-primary hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            Explore Events
          </Link>
          <Link
            href="/#about"
            className="relative rounded-lg px-3.5 py-2 text-sm font-semibold text-text-secondary transition-all duration-200 hover:text-primary hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            About
          </Link>
        </nav>

        {/* Right Side: Desktop Action Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated && user ? (
            <>
              <Link
                href={dashboardHref}
                className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-3.5 py-1.5 text-xs font-bold text-text-primary shadow-2xs transition-all duration-200 hover:border-primary/40 hover:bg-surface-muted hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                <User className="h-3.5 w-3.5 text-primary" />
                <span>Dashboard ({user.name.split(" ")[0]})</span>
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-xl px-3 py-1.5 text-xs font-semibold text-text-secondary transition-colors hover:text-danger hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl px-3.5 py-2 text-sm font-semibold text-text-secondary transition-all duration-200 hover:text-text-primary hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="inline-flex min-h-9 items-center justify-center rounded-xl bg-primary px-4 py-1.5 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition-all duration-200 hover:bg-primary-hover hover:scale-[1.02] hover:shadow-md hover:shadow-primary/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close main menu" : "Open main menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary shadow-2xs hover:bg-surface-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus transition-colors"
          >
            {isOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Panel */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="border-b border-border bg-surface px-4 pt-2 pb-6 md:hidden sm:px-6 animate-in slide-in-from-top-2 duration-200"
        >
          <nav
            className="flex flex-col gap-1.5 pt-2"
            aria-label="Mobile Navigation"
          >
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-xl px-3.5 py-2.5 text-base font-semibold text-text-primary transition-colors hover:bg-surface-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              Home
            </Link>
            <Link
              href="/explore"
              onClick={closeMenu}
              className="rounded-xl px-3.5 py-2.5 text-base font-semibold text-text-secondary transition-colors hover:bg-surface-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              Explore Events
            </Link>
            <Link
              href="/#about"
              onClick={closeMenu}
              className="rounded-xl px-3.5 py-2.5 text-base font-semibold text-text-secondary transition-colors hover:bg-surface-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              About
            </Link>
            <div className="mt-4 flex flex-col gap-2.5 border-t border-border pt-4">
              {isAuthenticated && user ? (
                <>
                  <Link
                    href={dashboardHref}
                    onClick={closeMenu}
                    className="flex items-center justify-center rounded-xl border border-border bg-surface py-2.5 text-center text-sm font-bold text-text-primary hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus shadow-xs"
                  >
                    Open Dashboard ({user.name.split(" ")[0]})
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      logout();
                    }}
                    className="flex items-center justify-center rounded-xl border border-rose-200 bg-rose-50 py-2.5 text-center text-sm font-bold text-rose-700 hover:bg-rose-100 focus-visible:outline-none"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="flex items-center justify-center rounded-xl border border-border bg-surface py-2.5 text-center text-sm font-bold text-text-primary hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus shadow-2xs"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={closeMenu}
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm shadow-primary/25 transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
