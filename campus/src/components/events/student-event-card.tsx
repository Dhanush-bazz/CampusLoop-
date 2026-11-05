"use client";

import { Bookmark, Calendar, Clock, MapPin, Tag } from "lucide-react";
import Link from "next/link";
import EventBanner from "@/components/events/event-banner";
import { useBookmarks } from "@/context/bookmark-context";
import type { Event } from "@/data/events";

interface StudentEventCardProps {
  event: Event;
  variant?: "dashboard" | "explore";
}

export default function StudentEventCard({
  event,
  variant = "dashboard",
}: StudentEventCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const saved = isBookmarked(event.id);

  if (variant === "explore") {
    return (
      <article className="group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
        {/* Event Banner with Category Badge */}
        <EventBanner
          event={event}
          className="relative h-44 w-full"
          showCategoryBadge={true}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex-1 space-y-2">
            <h3 className="line-clamp-1 text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
              {event.title}
            </h3>

            <div className="space-y-1.5 text-sm text-text-secondary">
              <div className="flex items-center gap-1.5">
                <Tag
                  className="h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="font-medium text-text-primary">
                  {event.category}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar
                  className="h-4 w-4 shrink-0 text-text-secondary"
                  aria-hidden="true"
                />
                <span>
                  {event.date} • {event.startTime} to {event.endTime}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin
                  className="h-4 w-4 shrink-0 text-text-secondary"
                  aria-hidden="true"
                />
                <span className="line-clamp-1">{event.venue}</span>
              </div>
              <p className="text-xs text-text-secondary">
                Organised by{" "}
                <span className="font-medium text-text-primary">
                  {event.organiser || event.organiserName}
                </span>
              </p>
            </div>
          </div>

          {/* Action Row matching Frame 06: [ Bookmark ] [ View Details ] */}
          <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={() => toggleBookmark(event.id)}
              className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                saved
                  ? "border-primary bg-primary text-white hover:bg-primary-hover"
                  : "border-border bg-surface text-text-secondary hover:bg-surface-muted hover:text-text-primary"
              }`}
              aria-label={
                saved
                  ? `Remove bookmark for ${event.title}`
                  : `Bookmark ${event.title}`
              }
            >
              <Bookmark
                className={`h-4 w-4 ${saved ? "fill-white" : ""}`}
                aria-hidden="true"
              />
              <span>{saved ? "Saved" : "Bookmark"}</span>
            </button>

            <Link
              href={`/events/${event.id}`}
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus text-center"
            >
              View Details
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Dashboard variant matching Frame 05
  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      {/* Banner Image with Bookmark button on top-right */}
      <EventBanner
        event={event}
        className="relative h-40 w-full"
        showCategoryBadge={true}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      >
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleBookmark(event.id);
          }}
          className={`pointer-events-auto absolute top-3 right-3 inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
            saved
              ? "bg-primary text-white hover:bg-primary-hover"
              : "border border-border/80 bg-surface/90 backdrop-blur-xs text-text-primary hover:bg-surface"
          }`}
          aria-label={
            saved
              ? `Remove ${event.title} from bookmarks`
              : `Save ${event.title}`
          }
        >
          <Bookmark
            className={`h-3.5 w-3.5 ${saved ? "fill-white" : ""}`}
            aria-hidden="true"
          />
          <span>{saved ? "Saved" : "Save"}</span>
        </button>
      </EventBanner>

      {/* Info Section matching Frame 05 content */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        <div className="space-y-1.5">
          <h3 className="line-clamp-1 text-base font-bold text-text-primary group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <p className="text-xs text-text-secondary">
            {event.category} <span className="text-border">|</span> by{" "}
            {event.organiser || event.organiserName}
          </p>
          <div className="flex items-center gap-1 text-xs text-text-secondary">
            <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>
              {event.date} <span className="text-border">|</span>{" "}
              {event.startTime} to {event.endTime}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-text-secondary">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-border/60">
          <Link
            href={`/events/${event.id}`}
            className="inline-flex min-h-9 w-full items-center justify-center rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
