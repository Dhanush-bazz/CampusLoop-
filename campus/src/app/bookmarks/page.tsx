"use client";

import { Bookmark, Compass, Trash2 } from "lucide-react";
import Link from "next/link";
import StudentLayout from "@/components/layout/student-layout";
import { useStudent } from "@/context/student-context";
import { DUMMY_EVENTS } from "@/data/events";

export default function BookmarkedEventsPage() {
  const { bookmarkedIds, removeBookmark } = useStudent();

  // Find the actual events corresponding to the bookmarked IDs
  const bookmarkedEvents = DUMMY_EVENTS.filter((e) =>
    bookmarkedIds.includes(e.id),
  );

  return (
    <StudentLayout>
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header matching Frame 08: Bookmarked Events & Counter */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Bookmarked Events
          </h1>
          <p className="mt-1 text-sm text-text-secondary sm:text-base">
            {bookmarkedEvents.length}{" "}
            {bookmarkedEvents.length === 1 ? "saved event" : "saved events"}
          </p>
        </div>

        {/* List of Bookmarked Events matching Frame 08 */}
        {bookmarkedEvents.length > 0 ? (
          <div className="space-y-4">
            {bookmarkedEvents.map((event) => (
              <div
                key={event.id}
                className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:p-5 shadow-xs transition-shadow hover:shadow-md"
              >
                {/* Left: Thumbnail and Info */}
                <div className="flex items-start gap-4">
                  <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-xs font-medium text-text-disabled">
                    Image
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-text-primary sm:text-lg">
                      {event.title}
                    </h3>
                    <p className="text-xs text-text-secondary sm:text-sm">
                      {event.category} <span className="text-border">|</span>{" "}
                      {event.date} <span className="text-border">|</span>{" "}
                      {event.venue} <span className="text-border">|</span>{" "}
                      {event.organiser}
                    </p>
                    <div className="flex items-center gap-2 pt-1 text-xs text-text-secondary">
                      <span>
                        Time: {event.startTime} - {event.endTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions matching Frame 08: [ View Details ] [ Remove Bookmark ] */}
                <div className="flex shrink-0 items-center gap-2.5 sm:self-center">
                  <Link
                    href={`/events/${event.id}`}
                    className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-xs font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus sm:text-sm"
                  >
                    View Details
                  </Link>

                  <button
                    type="button"
                    onClick={() => removeBookmark(event.id)}
                    className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 text-xs font-medium text-text-secondary transition-colors hover:bg-surface-muted hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus sm:text-sm"
                    aria-label={`Remove ${event.title} from bookmarks`}
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Remove Bookmark</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State matching Frame 08 */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface-muted/50 p-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface text-text-disabled shadow-xs">
              <Bookmark className="h-7 w-7" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-text-primary">
              Empty state
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              You haven&apos;t bookmarked any events yet.
            </p>
            <div className="mt-6">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                <Compass className="h-4 w-4" aria-hidden="true" />
                <span>Explore Events</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
