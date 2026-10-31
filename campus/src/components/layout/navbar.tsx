"use client";

import { Compass, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/common/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side: Brand Logo & Title */}
        <div className="flex items-center">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            aria-label="CampusLoop Home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
              <Compass className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="text-lg font-bold tracking-tight text-text-primary">
              Campus<span className="text-primary">Loop</span>
            </span>
          </Link>
        </div>

        {/* Middle: Desktop Navigation Links */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main Navigation"
        >
          <Link
            href="/"
            className="text-sm font-medium text-text-primary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            Home
          </Link>
          <Link
            href="#explore"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            Explore Events
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            About
          </Link>
        </nav>

        {/* Right Side: Desktop Action Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="#login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            Login
          </Link>
          <Link href="#signup" tabIndex={-1}>
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close main menu" : "Open main menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary hover:bg-surface-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
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
          className="border-b border-border bg-surface px-4 pt-2 pb-6 md:hidden sm:px-6"
        >
          <nav
            className="flex flex-col gap-2 pt-2"
            aria-label="Mobile Navigation"
          >
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-text-primary transition-colors hover:bg-surface-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              Home
            </Link>
            <Link
              href="#explore"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-text-secondary transition-colors hover:bg-surface-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              Explore Events
            </Link>
            <Link
              href="#about"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-text-secondary transition-colors hover:bg-surface-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              About
            </Link>
            <div className="mt-4 flex flex-col gap-2.5 border-t border-border pt-4">
              <Link
                href="#login"
                onClick={closeMenu}
                className="flex items-center justify-center rounded-lg border border-border bg-surface py-2.5 text-center text-sm font-medium text-text-primary hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                Login
              </Link>
              <Link href="#signup" onClick={closeMenu} tabIndex={-1}>
                <Button size="md" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
