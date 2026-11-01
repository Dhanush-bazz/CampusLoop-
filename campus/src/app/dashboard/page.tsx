"use client";

import {
  ArrowRight,
  Bookmark,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FilterX,
  MapPin,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import StudentEventCard from "@/components/events/student-event-card";
import StudentLayout from "@/components/layout/student-layout";
import { useStudent } from "@/context/student-context";
import {
  DUMMY_EVENTS,
  type EventCategory,
  getEventDateTimestamp,
  isEventInDateRange,
  isUpcomingEvent,
} from "@/data/events";

export default function StudentDashboardPage() {
  const { profile, reminders, isBookmarked, toggleBookmark, allEvents } =
    useStudent();
  const eventsList =
    allEvents && allEvents.length > 0 ? allEvents : DUMMY_EVENTS;
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDate, setSelectedDate] = useState<string>("All");
  const [selectedSort, setSelectedSort] = useState<string>("upcoming");

  // Featured carousel state
  const featuredEvents =
    eventsList.filter((e) => e.featured).length > 0
      ? eventsList.filter((e) => e.featured)
      : eventsList.slice(0, 4);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const prevSlide = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? featuredEvents.length - 1 : prev - 1,
    );
  };

  const nextSlide = () => {
    setCarouselIndex((prev) =>
      prev === featuredEvents.length - 1 ? 0 : prev + 1,
    );
  };

  const currentFeatured = featuredEvents[carouselIndex];
  const isCurrentFeaturedSaved = currentFeatured
    ? isBookmarked(currentFeatured.id)
    : false;

  // Clear filters handler
  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedDate("All");
    setSelectedSort("upcoming");
  };

  // Filter upcoming events for the Upcoming Events grid
  const filteredUpcoming = eventsList
    .filter((event) => {
      if (currentDate && !isUpcomingEvent(event.date, currentDate))
        return false;
      if (selectedCategory !== "All" && event.category !== selectedCategory) {
        return false;
      }
      if (
        selectedDate !== "All" &&
        currentDate &&
        !isEventInDateRange(event.date, selectedDate, currentDate)
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = getEventDateTimestamp(a.date) ?? Number.POSITIVE_INFINITY;
      const dateB = getEventDateTimestamp(b.date) ?? Number.POSITIVE_INFINITY;
      if (selectedSort === "recent") {
        return dateB - dateA;
      }
      return dateA - dateB;
    });

  // Upcoming Events section displays the first 3 events matching Frame 05
  const upcomingEvents = filteredUpcoming.slice(0, 3);

  // Recently added items: either specific IDs or latest added events
  const recentlyAdded = eventsList
    .filter(
      (event) =>
        event.id === "photography-walk" ||
        event.id === "robotics-expo" ||
        event.id.startsWith("org-event-"),
    )
    .slice(0, 2);

  // The 6 categories in Frame 05 Explore Categories
  const exploreCategories: { name: string; category: EventCategory }[] = [
    { name: "Workshops", category: "Workshop" },
    { name: "Hackathons", category: "Hackathon" },
    { name: "Competitions", category: "Competition" },
    { name: "Cultural Events", category: "Cultural Event" },
    { name: "Technical Events", category: "Technical Event" },
    { name: "Club Activities", category: "Club Activity" },
  ];

  return (
    <StudentLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        {/* A. Student Welcome Section matching Frame 05 */}
        <section className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Welcome back, {profile.fullName.split(" ")[0] || "Priya"}
          </h1>
          <p className="text-sm text-text-secondary sm:text-base">
            You have{" "}
            {currentDate
              ? eventsList.filter(
                  (event) =>
                    isUpcomingEvent(event.date, currentDate) &&
                    isEventInDateRange(event.date, "this-week", currentDate),
                ).length
              : 0}{" "}
            upcoming events this week and {reminders.length}{" "}
            {reminders.length === 1 ? "reminder" : "reminders"} set.
          </p>
        </section>

        {/* B. Search and Filters Row matching Frame 05 */}
        <section
          className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface p-4"
          aria-label="Filter events"
        >
          {/* Category Dropdown */}
          <div className="relative min-w-[160px] flex-1 sm:flex-initial">
            <label htmlFor="dashboard-category" className="sr-only">
              Category
            </label>
            <select
              id="dashboard-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 w-full appearance-none rounded-lg border border-border bg-surface px-3 pr-8 text-sm text-text-primary transition-colors hover:border-text-secondary/40 focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus"
            >
              <option value="All">Category: All</option>
              <option value="Workshop">Workshops</option>
              <option value="Hackathon">Hackathons</option>
              <option value="Competition">Competitions</option>
              <option value="Cultural Event">Cultural Events</option>
              <option value="Technical Event">Technical Events</option>
              <option value="Club Activity">Club Activities</option>
            </select>
            <span
              className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-text-secondary"
              aria-hidden="true"
            >
              ▼
            </span>
          </div>

          {/* Date Dropdown */}
          <div className="relative min-w-[140px] flex-1 sm:flex-initial">
            <label htmlFor="dashboard-date" className="sr-only">
              Date
            </label>
            <select
              id="dashboard-date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="h-10 w-full appearance-none rounded-lg border border-border bg-surface px-3 pr-8 text-sm text-text-primary transition-colors hover:border-text-secondary/40 focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus"
            >
              <option value="All">Date: All</option>
              <option value="this-week">Date: This week</option>
              <option value="this-month">Date: This month</option>
            </select>
            <span
              className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-text-secondary"
              aria-hidden="true"
            >
              ▼
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="relative min-w-[200px] flex-1 sm:flex-initial">
            <label htmlFor="dashboard-sort" className="sr-only">
              Sort
            </label>
            <select
              id="dashboard-sort"
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="h-10 w-full appearance-none rounded-lg border border-border bg-surface px-3 pr-8 text-sm text-text-primary transition-colors hover:border-text-secondary/40 focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus"
            >
              <option value="upcoming">Sort: Upcoming / Recent</option>
              <option value="recent">Sort: Latest event date</option>
            </select>
            <span
              className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-text-secondary"
              aria-hidden="true"
            >
              ▼
            </span>
          </div>

          {/* Clear Filters Button */}
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-surface px-4 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            <FilterX className="h-4 w-4" aria-hidden="true" />
            <span>Clear Filters</span>
          </button>
        </section>

        {/* C. Featured Events Carousel matching Frame 05 */}
        <section className="space-y-3" aria-label="Featured Events Carousel">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-text-primary">
              Featured Events
            </h2>
            {/* Carousel navigation controls ( < 1 / 4 > ) */}
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <button
                type="button"
                onClick={prevSlide}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary hover:bg-surface-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                aria-label="Previous featured event"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="font-semibold text-text-primary">
                {carouselIndex + 1} / {featuredEvents.length}
              </span>
              <button
                type="button"
                onClick={nextSlide}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary hover:bg-surface-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                aria-label="Next featured event"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Slide Container */}
          {currentFeatured && (
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-muted p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div className="max-w-2xl space-y-3">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Featured Spotlight</span>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary sm:text-3xl">
                    {currentFeatured.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-text-secondary">
                    {currentFeatured.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-text-secondary">
                    <span className="font-medium text-text-primary">
                      {currentFeatured.category}
                    </span>
                    <span>•</span>
                    <span>by {currentFeatured.organiser}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      {currentFeatured.date} ({currentFeatured.startTime} to{" "}
                      {currentFeatured.endTime})
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                      {currentFeatured.venue}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-3 md:flex-col md:items-end">
                  <button
                    type="button"
                    onClick={() => toggleBookmark(currentFeatured.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                      isCurrentFeaturedSaved
                        ? "border-primary bg-primary text-white hover:bg-primary-hover"
                        : "border-border bg-surface text-text-primary hover:bg-surface-muted"
                    }`}
                    aria-label={
                      isCurrentFeaturedSaved
                        ? `Remove ${currentFeatured.title} from bookmarks`
                        : `Save ${currentFeatured.title}`
                    }
                  >
                    <Bookmark
                      className={`h-4 w-4 ${isCurrentFeaturedSaved ? "fill-white" : ""}`}
                      aria-hidden="true"
                    />
                    <span>{isCurrentFeaturedSaved ? "Saved" : "Save"}</span>
                  </button>

                  <Link
                    href={`/events/${currentFeatured.id}`}
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* D. Upcoming Events Section matching Frame 05 */}
        <section className="space-y-4" aria-label="Upcoming Events">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-text-primary">
              Upcoming Events
            </h2>
            <Link
              href="/explore"
              className="text-sm font-semibold text-primary hover:underline"
            >
              See all events →
            </Link>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <StudentEventCard
                  key={event.id}
                  event={event}
                  variant="dashboard"
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border p-8 text-center text-text-secondary">
              No upcoming events match your selected filters.
            </div>
          )}
        </section>

        {/* E. Recently Added Section matching Frame 05 */}
        <section className="space-y-4" aria-label="Recently Added Events">
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            Recently Added
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {recentlyAdded.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-border bg-surface p-4 transition-shadow hover:shadow-xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-xs font-medium text-text-disabled">
                    [img]
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      {item.category} <span className="text-border">|</span>{" "}
                      {item.date}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/events/${item.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* F. Explore Categories Section matching Frame 05 */}
        <section className="space-y-4" aria-label="Explore Categories">
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            Explore Categories
          </h2>
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
            {exploreCategories.map((cat) => (
              <Link
                key={cat.name}
                href={`/explore?category=${encodeURIComponent(cat.category)}`}
                className="flex h-20 flex-col items-center justify-center rounded-xl border border-border bg-surface-muted p-3 text-center transition-all hover:border-primary hover:bg-surface hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                <span className="text-xs font-bold text-text-primary">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </StudentLayout>
  );
}
