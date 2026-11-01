import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import FloatingCampusObjects from "@/components/layout/floating-campus-objects";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-canvas py-12 md:py-16 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-4 sm:px-6 lg:flex-row lg:gap-14 lg:px-8">
        {/* Left Side: Content Hierarchy */}
        <div className="flex flex-1 flex-col items-start text-left z-10">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary mb-4 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Campus Life in One Place</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.18]">
            Never Miss What&apos;s Happening{" "}
            <span className="bg-gradient-to-r from-primary via-blue-600 to-accent bg-clip-text text-transparent">
              on Campus.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-5 max-w-2xl text-base text-text-secondary sm:text-lg sm:leading-relaxed">
            Discover campus events, workshops, hackathons, and activities
            happening around you. Everything your campus offers, in one place.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href="/explore"
              className="group inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 text-base font-semibold text-white shadow-sm shadow-primary/25 transition-all duration-200 hover:bg-primary-hover hover:scale-[1.02] hover:shadow-md hover:shadow-primary/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 text-center"
            >
              <span>Explore Events</span>
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/signup"
              className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-xl border border-border bg-surface px-7 py-3 text-base font-semibold text-text-primary shadow-xs transition-all duration-200 hover:border-primary/40 hover:bg-surface-muted hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 text-center"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Right Side: Animated 3D Floating College Objects */}
        <div className="flex w-full justify-center lg:w-[480px] xl:w-[520px] lg:shrink-0">
          <FloatingCampusObjects />
        </div>
      </div>
    </section>
  );
}
