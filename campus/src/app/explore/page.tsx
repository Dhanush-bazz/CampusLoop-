"use client";

import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  FilterX,
  Search,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import StudentEventCard from "@/components/events/student-event-card";
import StudentLayout from "@/components/layout/student-layout";
import { useStudent } from "@/context/student-context";
import {
  DUMMY_EVENTS,
  type EventCategory,
  getEventDateTimestamp,
  isEventInDateRange,
} from "@/data/events";

const CATEGORY_TABS: {
  label: string;
  value: string;
  category?: EventCategory;
}[] = [
  { label: "All", value: "All" },
  { label: "Workshops", value: "Workshop" },
  { label: "Hackathons", value: "Hackathon" },
  { label: "Competitions", value: "Competition" },
  { label: "Cultural", value: "Cultural Event" },
  { label: "Technical", value: "Technical Event" },
  { label: "Club Activities", value: "Club Activity" },
];

const ITEMS_PER_PAGE = 6;

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialQuery = searchParams.get("q") || "";
  const bookmarkedOnly = searchParams.get("bookmarked") === "true";

  const { isBookmarked, allEvents } = useStudent();
  const eventsList =
    allEvents && allEvents.length > 0 ? allEvents : DUMMY_EVENTS;

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedDate, setSelectedDate] = useState("All");
  const [selectedSort, setSelectedSort] = useState("upcoming");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  // Clear filters handler
  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setSelectedDate("All");
    setSelectedSort("upcoming");
    setCurrentPage(1);
  };

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    return eventsList
      .filter((event) => {
        // Bookmarked filter if accessed via Bookmarked Events sidebar link
        if (bookmarkedOnly && !isBookmarked(event.id)) {
          return false;
        }

        // Category tab filter
        if (activeCategory !== "All" && event.category !== activeCategory) {
          return false;
        }

        // Search query filter (title, organiser, venue, category, or description)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchesTitle = event.title.toLowerCase().includes(query);
          const matchesCategory = event.category.toLowerCase().includes(query);
          const matchesOrganiser = event.organiser
            .toLowerCase()
            .includes(query);
          const matchesVenue = event.venue.toLowerCase().includes(query);
          const matchesDescription = event.description
            .toLowerCase()
            .includes(query);
          if (
            !matchesTitle &&
            !matchesCategory &&
            !matchesOrganiser &&
            !matchesVenue &&
            !matchesDescription
          ) {
            return false;
          }
        }

        // Date filter
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
        if (selectedSort === "alpha") {
          return a.title.localeCompare(b.title);
        }
        // default: upcoming
        return dateA - dateB;
      });
  }, [
    activeCategory,
    currentDate,
    searchQuery,
    selectedDate,
    selectedSort,
    bookmarkedOnly,
    isBookmarked,
    eventsList,
  ]);

  // Pagination calculation
  const totalItems = filteredEvents.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = filteredEvents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Switch category and reset to page 1
  const handleCategoryChange = (val: string) => {
    setActiveCategory(val);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Title & Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          {bookmarkedOnly ? "Bookmarked Events" : "Explore Events"}
        </h1>
        {bookmarkedOnly && (
          <p className="mt-1 text-sm text-text-secondary">
            Viewing events you have saved for quick access.
          </p>
        )}
      </div>

      {/* A. Search Bar matching Frame 06 [ Search by event name... ] */}
      <div className="relative w-full">
        <label htmlFor="explore-search" className="sr-only">
          Search by event name
        </label>
        <Search
          className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-text-disabled pointer-events-none"
          aria-hidden="true"
        />
        <input
          id="explore-search"
          type="search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by event name..."
          className="h-12 w-full rounded-xl border border-border bg-surface pr-4 pl-10 text-sm text-text-primary placeholder:text-text-disabled shadow-xs transition-colors hover:border-text-secondary/40 focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus"
        />
      </div>

      {/* B. Category Tabs matching Frame 06 */}
      <div
        className="flex items-center gap-2 overflow-x-auto pb-2"
        role="tablist"
        aria-label="Filter events by category"
      >
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeCategory === tab.value;
          return (
            <button
              key={tab.label}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleCategoryChange(tab.value)}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                isActive
                  ? "bg-primary text-white shadow-xs"
                  : "bg-surface-muted text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* C. Sub-Filters Row: Date, Sort, Clear Filters, Counter */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Filter Dropdown */}
          <div className="relative min-w-[170px]">
            <label htmlFor="explore-date" className="sr-only">
              Filter by Date
            </label>
            <select
              id="explore-date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 w-full appearance-none rounded-lg border border-border bg-surface px-3 pr-8 text-sm text-text-primary hover:border-text-secondary/40 focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus"
            >
              <option value="All">Date: All dates</option>
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
          <div className="relative min-w-[180px]">
            <label htmlFor="explore-sort" className="sr-only">
              Sort events
            </label>
            <select
              id="explore-sort"
              value={selectedSort}
              onChange={(e) => {
                setSelectedSort(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 w-full appearance-none rounded-lg border border-border bg-surface px-3 pr-8 text-sm text-text-primary hover:border-text-secondary/40 focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus"
            >
              <option value="upcoming">Sort: Upcoming first</option>
              <option value="recent">Sort: Latest event date</option>
              <option value="alpha">Sort: Title (A-Z)</option>
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
            onClick={handleClearFilters}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 text-sm font-medium text-text-secondary hover:bg-surface-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            <FilterX className="h-4 w-4" aria-hidden="true" />
            <span>Clear Filters</span>
          </button>
        </div>

        {/* Dynamic Counter matching Frame 06 [ Showing 12 events ] */}
        <output
          className="text-sm font-medium text-text-secondary"
          aria-live="polite"
        >
          Showing {totalItems} {totalItems === 1 ? "event" : "events"}
        </output>
      </div>

      {/* D. Event Grid matching Frame 06 */}
      {paginatedEvents.length > 0 ? (
        <section aria-label="Events list">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedEvents.map((event) => (
              <StudentEventCard
                key={event.id}
                event={event}
                variant="explore"
              />
            ))}
          </div>
        </section>
      ) : (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <Bookmark className="mx-auto h-8 w-8 text-text-disabled" />
          <h3 className="mt-3 text-base font-bold text-text-primary">
            No events found
          </h3>
          <p className="mt-1 text-sm text-text-secondary">
            No events match your current filter and search combination.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="mt-4 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* E. Pagination Controls matching Frame 06 < 1 2 3 > */}
      {totalPages > 1 && (
        <nav
          className="flex items-center justify-center gap-1.5 pt-6"
          aria-label="Explore events pagination"
        >
          {/* Previous Page Button (<) */}
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={validPage === 1}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* Numbered Page Buttons (1 2 3 ...) */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setCurrentPage(num)}
              className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                validPage === num
                  ? "bg-primary text-white shadow-xs"
                  : "border border-border bg-surface text-text-secondary hover:bg-surface-muted hover:text-text-primary"
              }`}
              aria-current={validPage === num ? "page" : undefined}
            >
              {num}
            </button>
          ))}

          {/* Next Page Button (>) */}
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={validPage === totalPages}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </nav>
      )}
    </div>
  );
}

export default function ExploreEventsPage() {
  return (
    <StudentLayout>
      <Suspense
        fallback={
          <div className="flex h-64 items-center justify-center text-text-secondary">
            Loading events...
          </div>
        }
      >
        <ExploreContent />
      </Suspense>
    </StudentLayout>
  );
}
