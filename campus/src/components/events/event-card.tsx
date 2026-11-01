import { ArrowRight, Calendar, MapPin, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Event, EventCategory } from "@/data/events";

interface EventCardProps {
  event: Event;
}

// Curated high-resolution visual mapping per event and category
const EVENT_IMAGE_MAP: Record<string, string> = {
  "ai-ml-workshop":
    "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80",
  "code-sprint-hackathon":
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
  "inter-college-debate":
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80",
  "photography-walk":
    "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=600&q=80",
  "cultural-night":
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
  "cultural-dance-night":
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80",
  "robotics-expo":
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
};

const CATEGORY_FALLBACK_IMAGES: Record<EventCategory, string> = {
  Workshop:
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
  Hackathon:
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
  Competition:
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80",
  "Cultural Event":
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
  "Technical Event":
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
  "Club Activity":
    "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=600&q=80",
};

const CATEGORY_BADGE_STYLES: Record<EventCategory, string> = {
  Workshop: "bg-blue-50 text-blue-700 border-blue-200/80",
  Hackathon: "bg-purple-50 text-purple-700 border-purple-200/80",
  Competition: "bg-amber-50 text-amber-700 border-amber-200/80",
  "Cultural Event": "bg-rose-50 text-rose-700 border-rose-200/80",
  "Technical Event": "bg-cyan-50 text-cyan-700 border-cyan-200/80",
  "Club Activity": "bg-emerald-50 text-emerald-700 border-emerald-200/80",
};

export default function EventCard({ event }: EventCardProps) {
  // Resolve image URL
  const imageUrl =
    EVENT_IMAGE_MAP[event.id] ||
    CATEGORY_FALLBACK_IMAGES[event.category] ||
    (event.image && event.image !== "/file.svg" ? event.image : "");

  const badgeStyle =
    CATEGORY_BADGE_STYLES[event.category] ||
    "bg-surface-muted text-text-secondary border-border";

  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lg">
      {/* Event Banner Image */}
      <div className="relative h-44 w-full overflow-hidden bg-surface-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            unoptimized
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-tr from-primary/10 to-accent/10 text-primary">
            <Tag className="h-8 w-8 opacity-60" aria-hidden="true" />
          </div>
        )}

        {/* Subtle Dark Gradient Overlay for Contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40"
          aria-hidden="true"
        />

        {/* Floating Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-xs backdrop-blur-md ${badgeStyle}`}
          >
            {event.category}
          </span>
        </div>

        {/* Host / Organiser Tag */}
        {event.organiser && (
          <div className="absolute bottom-2.5 left-3 right-3 text-xs font-medium text-white/90 drop-shadow-sm truncate">
            by {event.organiser}
          </div>
        )}
      </div>

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
            className="inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-surface-muted px-4 py-2 text-xs font-bold text-text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-white group-hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
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
