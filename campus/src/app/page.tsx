import EventCard from "@/components/events/event-card";
import HeroSection from "@/components/layout/hero-section";
import { DUMMY_EVENTS } from "@/data/events";

export default function Home() {
  // Select the 4 featured upcoming events defined in Frame 01
  const featuredEvents = DUMMY_EVENTS.filter((event) => event.featured);

  // The 6 category pills shown in Frame 01
  const categories = [
    "Workshops",
    "Hackathons",
    "Competitions",
    "Cultural Events",
    "Technical Events",
    "Club Activities",
  ];

  // The 3 steps shown in How CampusLoop Works
  const steps = [
    {
      step: "1. Discover events",
      description: "Browse every campus activity in one feed",
    },
    {
      step: "2. Save interesting events",
      description: "Bookmark and set reminders",
    },
    {
      step: "3. Register and participate",
      description: "Use the organiser's registration link",
    },
  ];

  return (
    <div className="flex w-full flex-col">
      {/* A. Hero Section */}
      <HeroSection />

      {/* B. Featured Upcoming Events Section */}
      <section
        id="explore"
        className="w-full border-t border-border bg-surface py-12 md:py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Featured Upcoming Events
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* C. Browse by Category Section */}
      <section className="w-full border-t border-border bg-surface-muted py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Browse by Category
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <div
                key={category}
                className="flex min-h-12 items-center justify-center rounded-full border border-border bg-surface px-4 py-2.5 text-center text-sm font-medium text-text-primary shadow-xs transition-colors hover:border-text-secondary hover:bg-surface-muted"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D. How CampusLoop Works Section */}
      <section className="w-full border-t border-border bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            How CampusLoop Works
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface-muted p-8 text-center shadow-xs"
              >
                <h3 className="text-lg font-bold text-text-primary">
                  {item.step}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
