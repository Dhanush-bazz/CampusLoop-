"use client";

import {
  AlertCircle,
  Bell,
  Bookmark,
  Calendar,
  Check,
  ChevronLeft,
  Clock,
  ExternalLink,
  MapPin,
  X,
} from "lucide-react";
import Link from "next/link";
import { Suspense, use, useState } from "react";
import EventBanner from "@/components/events/event-banner";
import StudentLayout from "@/components/layout/student-layout";
import { useStudent } from "@/context/student-context";
import { DUMMY_EVENTS } from "@/data/events";
import { isValidHttpUrl } from "@/lib/urls";

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

function EventDetailInner({ params }: EventDetailPageProps) {
  const { id } = use(params);
  const {
    getEventById,
    isBookmarked,
    toggleBookmark,
    isRegistered,
    markAsRegistered,
    removeRegistration,
    addReminder,
  } = useStudent();

  const event = getEventById(id) || DUMMY_EVENTS.find((e) => e.id === id);

  // Reminder Modal State
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [remindTiming, setRemindTiming] = useState<
    "1 day before" | "1 hour before" | "Custom"
  >("1 day before");
  const [remindTarget, setRemindTarget] = useState<
    "Event start" | "Registration deadline"
  >("Event start");
  const [customDate, setCustomDate] = useState("");
  const [customTime, setCustomTime] = useState("");
  const [reminderSavedSuccess, setReminderSavedSuccess] = useState(false);

  // If event not found, handle gracefully
  if (!event) {
    return (
      <StudentLayout>
        <div className="mx-auto max-w-2xl py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface-muted text-text-disabled">
            <AlertCircle className="h-8 w-8 text-rose-500" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-text-primary">
            Event Not Found
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            The event you are looking for does not exist or may have been
            removed.
          </p>
          <div className="mt-6">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover shadow-xs"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Explore Events</span>
            </Link>
          </div>
        </div>
      </StudentLayout>
    );
  }

  const saved = isBookmarked(event.id);
  const registered = isRegistered(event.id);
  const organiserName = event.organiser || event.organiserName;
  const registrationLink = event.registrationUrl || event.registrationLink;

  const handleSaveReminder = (e: React.FormEvent) => {
    e.preventDefault();
    addReminder({
      eventId: event.id,
      remindTiming,
      remindTarget,
      customDate: remindTiming === "Custom" ? customDate : undefined,
      customTime: remindTiming === "Custom" ? customTime : undefined,
    });
    setReminderModalOpen(false);
    setReminderSavedSuccess(true);
    setTimeout(() => setReminderSavedSuccess(false), 4000);
  };

  return (
    <StudentLayout>
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Navigation Back Link matching Frame 07: < Back to Events */}
        <div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Events</span>
          </Link>
        </div>

        {/* Reminder Success Notification */}
        {reminderSavedSuccess && (
          <output
            className="flex items-center justify-between rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-success shadow-xs animate-in fade-in"
            aria-live="polite"
          >
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0" />
              <span>
                Reminder set for <strong>{event.title}</strong>! View in My
                Reminders.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setReminderSavedSuccess(false)}
              className="text-success hover:opacity-75"
              aria-label="Dismiss message"
            >
              <X className="h-4 w-4" />
            </button>
          </output>
        )}

        {/* Event High-Resolution Banner */}
        <EventBanner
          event={event}
          className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl border border-border shadow-sm"
          showCategoryBadge={true}
          priority={true}
        />

        {/* Title and Organizer Header matching Frame 07 */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            {event.title}
          </h1>
          <p className="text-base text-text-secondary">
            {event.category} <span className="text-border">|</span> Organised by{" "}
            <span className="font-semibold text-text-primary">
              {organiserName}
            </span>
          </p>
        </div>

        {/* Two-Column Layout: Left Details vs Right Info Box */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: About this event & Urgency box */}
          <div className="space-y-6 lg:col-span-2">
            <section className="space-y-3" aria-label="About this event">
              <h2 className="text-xl font-bold text-text-primary">
                About this event
              </h2>
              <p className="text-base leading-relaxed text-text-secondary whitespace-pre-line">
                {event.description}
              </p>
            </section>

            {/* Registration Deadline Banner matching Frame 07 fill="#fff5ed" */}
            <div className="rounded-xl border border-amber-300 bg-[#fff5ed] p-4 text-sm text-amber-950 shadow-xs">
              <p className="font-medium">
                <strong>Registration closes soon.</strong> Deadline:{" "}
                {event.registrationDeadline}, 23:59
              </p>
            </div>
          </div>

          {/* Right Column: Event Info Card matching Frame 07 */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-surface-muted p-6 space-y-4 shadow-xs">
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary shrink-0" />
                  <span className="font-bold text-text-primary">Date:</span>{" "}
                  <span className="text-text-secondary">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                  <span className="font-bold text-text-primary">Time:</span>{" "}
                  <span className="text-text-secondary">
                    {event.startTime} - {event.endTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span className="font-bold text-text-primary">Venue:</span>{" "}
                  <span className="text-text-secondary">{event.venue}</span>
                </div>
                <div>
                  <span className="font-bold text-text-primary">
                    Registration deadline:
                  </span>{" "}
                  <span className="text-text-secondary">
                    {event.registrationDeadline}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-text-primary">
                    Registration:
                  </span>{" "}
                  <span className="text-text-secondary">
                    external form (link)
                  </span>
                </div>
              </div>

              {/* Register Now button matching Frame 07 */}
              <div className="space-y-2 pt-2 border-t border-border">
                {isValidHttpUrl(registrationLink) ? (
                  <a
                    href={registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-hover shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  >
                    <span>Register Now</span>
                    <span className="text-xs font-normal text-white/80">
                      (external link)
                    </span>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="inline-flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-surface-muted border border-border px-4 text-sm font-semibold text-text-disabled cursor-not-allowed"
                  >
                    <span>Registration Link Unavailable</span>
                  </button>
                )}

                {/* Mark as registered toggle */}
                <button
                  type="button"
                  onClick={() => {
                    if (registered) {
                      removeRegistration(event.id);
                    } else {
                      markAsRegistered(event.id);
                    }
                  }}
                  className={`w-full py-2.5 text-xs font-semibold rounded-xl border transition-colors ${
                    registered
                      ? "border-success bg-success/10 text-success"
                      : "border-border bg-surface text-text-secondary hover:bg-surface-muted"
                  }`}
                >
                  {registered ? "✓ Marked as registered" : "Mark as registered"}
                </button>
              </div>

              {/* Action Buttons: Bookmark Event & Set Reminder */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* Bookmark Button */}
                <button
                  type="button"
                  onClick={() => toggleBookmark(event.id)}
                  className={`inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                    saved
                      ? "border-primary bg-primary text-white hover:bg-primary-hover"
                      : "border-border bg-surface text-text-primary hover:bg-surface-muted"
                  }`}
                  aria-label={saved ? "Remove bookmark" : "Bookmark Event"}
                >
                  <Bookmark
                    className={`h-4 w-4 ${saved ? "fill-white" : ""}`}
                    aria-hidden="true"
                  />
                  <span>{saved ? "Saved" : "Bookmark Event"}</span>
                </button>

                {/* Set Reminder Button */}
                <button
                  type="button"
                  onClick={() => setReminderModalOpen(true)}
                  className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface text-text-primary transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                >
                  <Bell
                    className="h-4 w-4 text-text-secondary"
                    aria-hidden="true"
                  />
                  <span>Set Reminder</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Set Reminder Modal matching Frame 07 */}
        {reminderModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reminder-modal-title"
          >
            <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-surface p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h3
                  id="reminder-modal-title"
                  className="text-lg font-bold text-text-primary"
                >
                  Set Reminder
                </h3>
                <button
                  type="button"
                  onClick={() => setReminderModalOpen(false)}
                  className="rounded-lg p-1 text-text-secondary hover:bg-surface-muted"
                  aria-label="Close reminder modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveReminder} className="space-y-4">
                {/* Remind me options */}
                <div className="space-y-2">
                  <span className="block text-xs font-bold uppercase tracking-wider text-text-secondary">
                    Remind me:
                  </span>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 text-sm text-text-primary cursor-pointer">
                      <input
                        type="radio"
                        name="remindTiming"
                        value="1 day before"
                        checked={remindTiming === "1 day before"}
                        onChange={() => setRemindTiming("1 day before")}
                        className="text-primary focus:ring-focus"
                      />
                      <span>1 day before</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-sm text-text-primary cursor-pointer">
                      <input
                        type="radio"
                        name="remindTiming"
                        value="1 hour before"
                        checked={remindTiming === "1 hour before"}
                        onChange={() => setRemindTiming("1 hour before")}
                        className="text-primary focus:ring-focus"
                      />
                      <span>1 hour before</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-sm text-text-primary cursor-pointer">
                      <input
                        type="radio"
                        name="remindTiming"
                        value="Custom"
                        checked={remindTiming === "Custom"}
                        onChange={() => setRemindTiming("Custom")}
                        className="text-primary focus:ring-focus"
                      />
                      <span>Custom</span>
                    </label>
                  </div>

                  {remindTiming === "Custom" && (
                    <div className="mt-2 grid grid-cols-2 gap-3 pl-6 pt-1">
                      <div>
                        <label
                          htmlFor="custom-remind-date"
                          className="text-xs text-text-secondary"
                        >
                          Date
                        </label>
                        <input
                          id="custom-remind-date"
                          type="date"
                          value={customDate}
                          onChange={(e) => setCustomDate(e.target.value)}
                          required={remindTiming === "Custom"}
                          className="mt-1 w-full rounded-lg border border-border px-2.5 py-1.5 text-xs text-text-primary focus:border-focus focus:outline-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="custom-remind-time"
                          className="text-xs text-text-secondary"
                        >
                          Time
                        </label>
                        <input
                          id="custom-remind-time"
                          type="time"
                          value={customTime}
                          onChange={(e) => setCustomTime(e.target.value)}
                          required={remindTiming === "Custom"}
                          className="mt-1 w-full rounded-lg border border-border px-2.5 py-1.5 text-xs text-text-primary focus:border-focus focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Remind for options */}
                <div className="space-y-2 pt-2 border-t border-border">
                  <span className="block text-xs font-bold uppercase tracking-wider text-text-secondary">
                    Remind for:
                  </span>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 text-sm text-text-primary cursor-pointer">
                      <input
                        type="radio"
                        name="remindTarget"
                        value="Event start"
                        checked={remindTarget === "Event start"}
                        onChange={() => setRemindTarget("Event start")}
                        className="text-primary focus:ring-focus"
                      />
                      <span>Event start</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-sm text-text-primary cursor-pointer">
                      <input
                        type="radio"
                        name="remindTarget"
                        value="Registration deadline"
                        checked={remindTarget === "Registration deadline"}
                        onChange={() =>
                          setRemindTarget("Registration deadline")
                        }
                        className="text-primary focus:ring-focus"
                      />
                      <span>Registration deadline</span>
                    </label>
                  </div>
                </div>

                {/* Modal Action Buttons matching Frame 07: [ Save Reminder ] [ Cancel ] */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setReminderModalOpen(false)}
                    className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary hover:bg-surface-muted"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover shadow-xs"
                  >
                    Save Reminder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-text-secondary">
          Loading event details...
        </div>
      }
    >
      <EventDetailInner params={params} />
    </Suspense>
  );
}
