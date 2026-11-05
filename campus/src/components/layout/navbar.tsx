"use client";

import { Compass, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import UserAvatar from "@/components/profile/user-avatar";
import { useAuth } from "@/context/auth-context";
import { getRoleDashboardPath } from "@/lib/auth/auth-service";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const dashboardHref = user ? getRoleDashboardPath(user.role) : "/login";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#071426]/90 backdrop-blur-md transition-shadow duration-200 text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side: Brand Logo & Title with micro-interaction */}
        <div className="flex items-center">
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 p-1 transition-all"
            aria-label="CampusLoop Home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white shadow-sm shadow-blue-500/30 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6">
              <Compass
                className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45"
                aria-hidden="true"
              />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white">
              Campus<span className="text-sky-400">Loop</span>
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
            className="relative rounded-lg px-3.5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:text-sky-400 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            Home
          </Link>
          <Link
            href="/explore"
            className="relative rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-300 transition-all duration-200 hover:text-sky-400 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            Explore Events
          </Link>
          <Link
            href="/#about"
            className="relative rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-300 transition-all duration-200 hover:text-sky-400 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
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
                className="inline-flex min-h-9 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-white/15 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                {user.profileImage ? (
                  <div className="relative h-5 w-5 rounded-full overflow-hidden shrink-0 border border-white/30">
                    <UserAvatar
                      src={user.profileImage}
                      alt={user.name}
                      fallback={user.name[0]?.toUpperCase() || "U"}
                      className="text-[10px] font-bold"
                    />
                  </div>
                ) : (
                  <User className="h-3.5 w-3.5 text-sky-400" />
                )}
                <span>Dashboard ({user.name.split(" ")[0]})</span>
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:text-rose-400 hover:bg-rose-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-300 transition-all duration-200 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="inline-flex min-h-9 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all duration-200 hover:from-blue-500 hover:to-indigo-500 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-slate-200 shadow-sm hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 transition-colors"
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
          className="border-b border-white/10 bg-[#071426]/95 backdrop-blur-xl px-4 pt-2 pb-6 md:hidden sm:px-6 animate-in slide-in-from-top-2 duration-200"
        >
          <nav
            className="flex flex-col gap-1.5 pt-2"
            aria-label="Mobile Navigation"
          >
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-xl px-3.5 py-2.5 text-base font-semibold text-white transition-colors hover:bg-white/5 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              Home
            </Link>
            <Link
              href="/explore"
              onClick={closeMenu}
              className="rounded-xl px-3.5 py-2.5 text-base font-semibold text-slate-300 transition-colors hover:bg-white/5 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              Explore Events
            </Link>
            <Link
              href="/#about"
              onClick={closeMenu}
              className="rounded-xl px-3.5 py-2.5 text-base font-semibold text-slate-300 transition-colors hover:bg-white/5 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              About
            </Link>
            <div className="mt-4 flex flex-col gap-2.5 border-t border-white/10 pt-4">
              {isAuthenticated && user ? (
                <>
                  <Link
                    href={dashboardHref}
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 py-2.5 text-center text-sm font-bold text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 shadow-sm"
                  >
                    {user.profileImage ? (
                      <div className="relative h-5 w-5 rounded-full overflow-hidden shrink-0 border border-white/30">
                        <UserAvatar
                          src={user.profileImage}
                          alt={user.name}
                          fallback={user.name[0]?.toUpperCase() || "U"}
                          className="text-[10px] font-bold"
                        />
                      </div>
                    ) : (
                      <User className="h-4 w-4 text-sky-400" />
                    )}
                    <span>Open Dashboard ({user.name.split(" ")[0]})</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      logout();
                    }}
                    className="flex items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 py-2.5 text-center text-sm font-bold text-rose-300 hover:bg-rose-500/20 focus-visible:outline-none"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="flex items-center justify-center rounded-xl border border-white/20 bg-white/10 py-2.5 text-center text-sm font-bold text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 shadow-sm"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={closeMenu}
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-blue-500/25 transition-colors hover:from-blue-500 hover:to-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
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
