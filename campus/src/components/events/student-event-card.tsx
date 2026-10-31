"use client";

import { Bookmark, Calendar, Clock, MapPin, Tag } from "lucide-react";
import Link from "next/link";
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
      <article className="flex w-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-xs transition-shadow hover:shadow-md">
        {/* Event Image / Placeholder Area */}
        <div className="flex h-44 w-full items-center justify-center bg-surface-muted text-text-disabled">
          <span className="text-sm font-medium">Event image</span>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex-1 space-y-2">
            <h3 className="line-clamp-1 text-lg font-bold text-text-primary">
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
                <span>{event.venue}</span>
              </div>
              <p className="text-xs text-text-secondary">
                Organised by{" "}
                <span className="font-medium text-text-primary">
                  {event.organiser}
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
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
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
    <article className="flex w-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-xs transition-shadow hover:shadow-md">
      {/* Banner Image with Bookmark on top-right */}
      <div className="relative flex h-36 w-full items-center justify-center bg-surface-muted text-text-disabled">
        <span className="text-sm font-medium">Banner image</span>
        <button
          type="button"
          onClick={() => toggleBookmark(event.id)}
          className={`absolute top-3 right-3 inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
            saved
              ? "bg-primary text-white hover:bg-primary-hover"
              : "border border-border bg-surface text-text-primary hover:bg-surface-muted"
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
      </div>

      {/* Info Section matching Frame 05 content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="space-y-1.5">
          <h3 className="line-clamp-1 text-base font-bold text-text-primary">
            {event.title}
          </h3>
          <p className="text-xs text-text-secondary">
            {event.category} <span className="text-border">|</span> by{" "}
            {event.organiser}
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

        <div className="mt-4 pt-2">
          <Link
            href={`/events/${event.id}`}
            className="inline-flex min-h-9 items-center justify-center rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
