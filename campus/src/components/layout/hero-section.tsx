import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full bg-canvas py-12 md:py-16 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-4 sm:px-6 lg:flex-row lg:gap-16 lg:px-8">
        {/* Left Side: Content Hierarchy */}
        <div className="flex flex-1 flex-col items-start text-left">
          {/* Main Heading */}
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:leading-tight">
            Never Miss What&apos;s Happening on Campus.
          </h1>

          {/* Supporting Text */}
          <p className="mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
            Discover campus events, workshops, hackathons, and activities
            happening around you. Everything your campus offers, in one place.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#explore"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-white transition-colors hover:bg-primary-hover active:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
            >
              Explore Events
            </Link>

            <Link
              href="#signup"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-surface px-6 py-3 text-base font-medium text-text-primary transition-colors hover:bg-surface-muted active:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Right Side: Hero Image Placeholder (approx 424 x 328) */}
        <div className="flex w-full max-w-[424px] justify-center lg:w-[424px] lg:shrink-0">
          <div className="flex h-[280px] w-full items-center justify-center rounded-xl border border-border bg-surface-muted p-6 text-center shadow-xs sm:h-[328px]">
            <span className="text-base font-medium text-text-secondary">
              Hero image placeholder
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
