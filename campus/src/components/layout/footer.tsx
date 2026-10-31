import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-muted py-8 text-center">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Brand Name */}
        <span className="text-base font-bold text-text-primary">
          CampusLoop
        </span>

        {/* Footer Navigation Links */}
        <nav
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-text-secondary"
          aria-label="Footer Navigation"
        >
          <Link
            href="#about"
            className="transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded px-1"
          >
            About
          </Link>
          <span aria-hidden="true" className="text-border">
            |
          </span>
          <Link
            href="#contact"
            className="transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded px-1"
          >
            Contact
          </Link>
          <span aria-hidden="true" className="text-border">
            |
          </span>
          <Link
            href="#privacy"
            className="transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded px-1"
          >
            Privacy Policy
          </Link>
          <span aria-hidden="true" className="text-border">
            |
          </span>
          <Link
            href="#terms"
            className="transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded px-1"
          >
            Terms and Conditions
          </Link>
        </nav>
      </div>
    </footer>
  );
}

