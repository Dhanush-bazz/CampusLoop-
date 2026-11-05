"use client";

import { Bell, Compass, Trash2 } from "lucide-react";
import Link from "next/link";
import EventBanner from "@/components/events/event-banner";
import StudentLayout from "@/components/layout/student-layout";
import { useStudent } from "@/context/student-context";
import { DUMMY_EVENTS } from "@/data/events";

export default function MyRemindersPage() {
  const { reminders, removeReminder, getEventById } = useStudent();

  // Map reminders to their event data
  const reminderList = reminders.map((rem) => {
    const event =
      getEventById(rem.eventId) ||
      DUMMY_EVENTS.find((e) => e.id === rem.eventId);
    return {
      rem,
      event,
    };
  });

  return (
    <StudentLayout>
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header matching Frame 10 */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            My Reminders
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Keep track of upcoming deadlines and start times for your saved
            events.
          </p>
        </div>

        {/* Reminders List */}
        {reminderList.length > 0 ? (
          <div className="space-y-4">
            {reminderList.map(({ rem, event }) => {
              if (!event) return null;

              return (
                <div
                  key={rem.id}
                  className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-5 shadow-xs transition-shadow hover:shadow-md sm:flex-row sm:items-center"
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <EventBanner
                      event={event}
                      className="relative h-20 w-full sm:w-28 shrink-0 rounded-lg"
                      sizes="(max-width: 640px) 100vw, 112px"
                    />

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Bell className="h-3.5 w-3.5" aria-hidden="true" />
                        </div>
                        <h3 className="text-base font-bold text-text-primary sm:text-lg">
                          {event.title}
                        </h3>
                      </div>

                      <div className="space-y-1 pl-9 text-xs text-text-secondary sm:text-sm">
                        <p className="font-medium text-text-primary">
                          Remind me:{" "}
                          <span className="font-semibold text-primary">
                            {rem.remindTiming}
                          </span>{" "}
                          for{" "}
                          <span className="font-semibold text-text-primary">
                            {rem.remindTarget}
                          </span>
                          {rem.customDate && (
                            <span className="ml-1 text-text-secondary">
                              (on {rem.customDate} at {rem.customTime})
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-text-secondary">
                          Event date: {event.date} ({event.startTime} -{" "}
                          {event.endTime}) | Venue: {event.venue}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions: [ View Details ] [ Remove Reminder ] */}
                  <div className="flex flex-col sm:flex-row shrink-0 items-stretch sm:items-center gap-2.5 sm:self-center w-full sm:w-auto">
                    <Link
                      href={`/events/${event.id}`}
                      className="inline-flex h-10 w-full sm:w-auto items-center justify-center rounded-lg bg-primary px-4 text-xs font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus sm:text-sm text-center"
                    >
                      View Details
                    </Link>

                    <button
                      type="button"
                      onClick={() => removeReminder(rem.id)}
                      className="inline-flex h-10 w-full sm:w-auto items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 text-xs font-medium text-text-secondary transition-colors hover:bg-surface-muted hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus sm:text-sm"
                      aria-label={`Remove reminder for ${event.title}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State matching Frame 10 */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface-muted/50 p-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface text-text-disabled shadow-xs">
              <Bell className="h-7 w-7" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-text-primary">
              Empty state
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              No upcoming reminders.
              <br />
              Open any event and choose Set Reminder.
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
