import { Compass } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-muted/80 py-10 text-center">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-base font-extrabold text-text-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-lg px-2 py-1"
          aria-label="CampusLoop Home"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white shadow-2xs">
            <Compass className="h-4 w-4" aria-hidden="true" />
          </div>
          <span>
            Campus<span className="text-primary">Loop</span>
          </span>
        </Link>

        {/* Tagline */}
        <p className="max-w-md text-xs text-text-secondary leading-relaxed">
          The centralized university event discovery and moderation platform.
          Never miss what&apos;s happening on campus.
        </p>

        {/* Footer Navigation Links */}
        <nav
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-text-secondary"
          aria-label="Footer Navigation"
        >
          <Link
            href="/#about"
            className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded px-1.5 py-0.5 hover:underline"
          >
            About
          </Link>
          <span aria-hidden="true" className="text-border">
            •
          </span>
          <span className="px-1 text-text-disabled" aria-disabled="true">
            Contact
          </span>
          <span aria-hidden="true" className="text-border">
            •
          </span>
          <span className="px-1 text-text-disabled" aria-disabled="true">
            Privacy Policy
          </span>
          <span aria-hidden="true" className="text-border">
            •
          </span>
          <span className="px-1 text-text-disabled" aria-disabled="true">
            Terms and Conditions
          </span>
        </nav>

        {/* Copyright notice */}
        <p className="text-[11px] text-text-tertiary pt-2 border-t border-border/50 w-full max-w-xs">
          &copy; {new Date().getFullYear()} CampusLoop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
