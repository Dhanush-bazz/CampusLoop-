"use client";

import { CalendarCheck, Compass, Info, Trash2 } from "lucide-react";
import Link from "next/link";
import EventBanner from "@/components/events/event-banner";
import StudentLayout from "@/components/layout/student-layout";
import { useStudent } from "@/context/student-context";
import { DUMMY_EVENTS } from "@/data/events";

export default function MyRegistrationsPage() {
  const { registrations, removeRegistration, getEventById } = useStudent();

  // Map registered items to event records
  const registeredEvents = registrations.map((reg) => {
    const event =
      getEventById(reg.eventId) ||
      DUMMY_EVENTS.find((e) => e.id === reg.eventId);
    return {
      reg,
      event,
    };
  });

  return (
    <StudentLayout>
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header matching Frame 09 */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            My Registrations
          </h1>
        </div>

        {/* Informational Banner matching Frame 09 fill="#f0f5fd" */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-[#f0f5fd] p-4 text-sm text-blue-950 shadow-xs">
          <Info
            className="h-5 w-5 shrink-0 text-blue-600 mt-0.5"
            aria-hidden="true"
          />
          <p className="leading-relaxed">
            Registration happens on the organiser&apos;s external site. Events
            appear here when you mark them as registered.
          </p>
        </div>

        {/* List of Registered Events matching Frame 09 */}
        {registeredEvents.length > 0 ? (
          <div className="space-y-4">
            {registeredEvents.map(({ reg, event }) => {
              if (!event) return null;
              const isMarked = reg.status === "Marked as registered";
              const registrationLink =
                event.registrationUrl || event.registrationLink;

              return (
                <div
                  key={reg.eventId}
                  className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-5 shadow-xs transition-shadow hover:shadow-md sm:flex-row sm:items-center"
                >
                  {/* Left: Event Thumbnail & Details */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <EventBanner
                      event={event}
                      className="relative h-20 w-full sm:w-28 shrink-0 rounded-lg"
                      sizes="(max-width: 640px) 100vw, 112px"
                    />

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-base font-bold text-text-primary sm:text-lg">
                          {event.title}
                        </h3>
                        {/* Status badge matching Frame 09 */}
                        <span
                          className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ${
                            isMarked
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-surface-muted text-text-secondary border border-border"
                          }`}
                        >
                          Status: {reg.status}
                        </span>
                      </div>

                      <p className="text-xs text-text-secondary sm:text-sm">
                        {event.date} <span className="text-border">|</span>{" "}
                        {event.venue} <span className="text-border">|</span>{" "}
                        <span className="inline-flex items-center gap-1 text-primary break-all">
                          <span>
                            Registration link:{" "}
                            {registrationLink.replace("https://", "")}
                          </span>
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Right Actions matching Frame 09: [ View Event Details ] */}
                  <div className="flex shrink-0 items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto">
                    <Link
                      href={`/events/${event.id}`}
                      className="inline-flex h-10 flex-1 sm:flex-initial items-center justify-center rounded-lg bg-primary px-4 text-xs font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus sm:text-sm text-center"
                    >
                      View Event Details
                    </Link>

                    <button
                      type="button"
                      onClick={() => removeRegistration(event.id)}
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary hover:bg-surface-muted hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                      aria-label={`Remove ${event.title} from registrations`}
                      title="Remove from my registrations"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State matching Frame 09 */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface-muted/50 p-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface text-text-disabled shadow-xs">
              <CalendarCheck className="h-7 w-7" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-text-primary">
              Empty state
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              You haven&apos;t added any registrations yet.
              <br />
              Find an event and register through its link.
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
