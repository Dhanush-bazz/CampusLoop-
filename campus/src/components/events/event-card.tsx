import { Calendar, Tag } from "lucide-react";
import Link from "next/link";
import type { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="flex w-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-xs transition-shadow hover:shadow-md">
      {/* Event Image / Placeholder Area */}
      <div className="flex h-[110px] w-full items-center justify-center bg-surface-muted text-text-disabled">
        <span className="text-sm font-medium">Image</span>
      </div>

      {/* Information Section */}
      <div className="flex flex-col p-4">
        {/* Event Title */}
        <h3 className="line-clamp-1 text-base font-bold text-text-primary">
          {event.title}
        </h3>

        {/* Date and Category */}
        <div className="mt-2 flex flex-col gap-1 text-sm text-text-secondary">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Tag className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{event.category}</span>
          </div>
        </div>

        {/* Action Link styled as primary small button */}
        <div className="mt-4 pt-1">
          <Link
            href={`#event-${event.id}`}
            className="inline-flex min-h-9 items-center justify-center rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover active:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
