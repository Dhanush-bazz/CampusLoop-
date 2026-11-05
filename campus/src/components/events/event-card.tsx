"use client";

import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import EventBanner from "@/components/events/event-banner";
import type { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const organiserName = event.organiser || event.organiserName;

  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lg">
      {/* Event Banner Image with Category Badge & Organiser Tag */}
      <EventBanner
        event={event}
        className="relative h-44 w-full"
        showCategoryBadge={true}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      >
        {organiserName && (
          <div className="absolute bottom-2.5 left-3 right-3 text-xs font-medium text-white/90 drop-shadow-sm truncate">
            by {organiserName}
          </div>
        )}
      </EventBanner>

      {/* Information Section */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        <div className="space-y-2.5">
          {/* Event Title */}
          <h3 className="line-clamp-2 text-base font-bold text-text-primary group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          {/* Date, Time, Venue Meta */}
          <div className="space-y-1.5 text-xs text-text-secondary">
            <div className="flex items-center gap-2">
              <Calendar
                className="h-3.5 w-3.5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span className="font-medium text-text-primary">
                {event.date}
              </span>
              {event.startTime && (
                <span className="text-text-tertiary">
                  ({event.startTime} - {event.endTime})
                </span>
              )}
            </div>

            {event.venue && (
              <div className="flex items-center gap-2 truncate">
                <MapPin
                  className="h-3.5 w-3.5 shrink-0 text-text-tertiary"
                  aria-hidden="true"
                />
                <span className="truncate">{event.venue}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Link Button */}
        <div className="pt-2 border-t border-border/60">
          <Link
            href={`/events/${event.id}`}
            className="inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-surface-muted px-4 py-2 text-xs font-bold text-text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-white group-hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            <span>View Details</span>
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
