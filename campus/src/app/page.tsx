import {
  ArrowRight,
  Bookmark,
  CalendarCheck,
  Code,
  Compass,
  Cpu,
  GraduationCap,
  Music,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import EventCard from "@/components/events/event-card";
import HeroSection from "@/components/layout/hero-section";
import { DUMMY_EVENTS, type EventCategory } from "@/data/events";

export default function Home() {
  // Select the 4 featured upcoming events defined in Frame 01
  const featuredEvents = DUMMY_EVENTS.filter((event) => event.featured);

  // The 6 category cards shown in Frame 01 with requested Lucide icons
  const categories: {
    name: string;
    category: EventCategory;
    icon: typeof GraduationCap;
    color: string;
  }[] = [
    {
      name: "Workshops",
      category: "Workshop",
      icon: GraduationCap,
      color: "group-hover:text-blue-600 group-hover:bg-blue-50",
    },
    {
      name: "Hackathons",
      category: "Hackathon",
      icon: Code,
      color: "group-hover:text-purple-600 group-hover:bg-purple-50",
    },
    {
      name: "Competitions",
      category: "Competition",
      icon: Trophy,
      color: "group-hover:text-amber-600 group-hover:bg-amber-50",
    },
    {
      name: "Cultural Events",
      category: "Cultural Event",
      icon: Music,
      color: "group-hover:text-rose-600 group-hover:bg-rose-50",
    },
    {
      name: "Technical Events",
      category: "Technical Event",
      icon: Cpu,
      color: "group-hover:text-cyan-600 group-hover:bg-cyan-50",
    },
    {
      name: "Club Activities",
      category: "Club Activity",
      icon: Users,
      color: "group-hover:text-emerald-600 group-hover:bg-emerald-50",
    },
  ];

  // The 3 steps shown in How CampusLoop Works with requested icons
  const steps = [
    {
      number: "01",
      step: "Discover events",
      description:
        "Browse every campus workshop, hackathon, and club activity in one verified real-time feed.",
      icon: Compass,
      accent: "text-primary bg-primary/10 border-primary/20",
    },
    {
      number: "02",
      step: "Save interesting events",
      description:
        "Bookmark standout opportunities for later and set custom deadline reminders so you never forget.",
      icon: Bookmark,
      accent: "text-accent bg-accent/10 border-accent/20",
    },
    {
      number: "03",
      step: "Register and participate",
      description:
        "Jump directly to the official organiser registration page, track your status, and participate.",
      icon: CalendarCheck,
      accent: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
  ];

  return (
    <div className="flex w-full flex-col">
      {/* A. Hero Section with Interactive 3D Floating College Objects */}
      <HeroSection />

      {/* B. Featured Upcoming Events Section */}
      <section
        id="explore"
        className="w-full border-t border-border bg-surface py-14 md:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Curated Highlights
              </span>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
                Featured Upcoming Events
              </h2>
            </div>
            <Link
              href="/explore"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
            >
              <span>See all events</span>
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* C. Browse by Category Section */}
      <section className="w-full border-t border-border bg-surface-muted/60 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              Diverse Campus Interests
            </span>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
              Browse by Category
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Explore events across tech, arts, sports, competitions, and
              student societies.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={`/explore?category=${encodeURIComponent(item.category)}`}
                  className="group relative flex flex-col items-center justify-center rounded-2xl border border-border bg-surface p-5 text-center shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-surface-muted text-text-secondary transition-all duration-300 group-hover:scale-110 ${item.color}`}
                  >
                    <Icon
                      className="h-6 w-6 transition-transform duration-300 group-hover:rotate-6"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="mt-3.5 text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* D. How CampusLoop Works Section */}
      <section
        id="about"
        className="w-full border-t border-border bg-surface py-14 md:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Simple 3-Step Process
            </span>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
              How CampusLoop Works
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Everything you need to stay plugged in to university activities in
              three easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="group relative flex flex-col items-start rounded-2xl border border-border bg-surface p-8 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-md"
                >
                  {/* Subtle Giant Step Number in Background */}
                  <span
                    className="pointer-events-none absolute top-4 right-5 font-black text-5xl text-border/30 select-none transition-colors group-hover:text-primary/15"
                    aria-hidden="true"
                  >
                    {item.number}
                  </span>

                  {/* Icon badge */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border shadow-2xs transition-transform duration-300 group-hover:scale-110 ${item.accent}`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
                    {item.step}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
