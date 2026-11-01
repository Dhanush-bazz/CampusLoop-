"use client";

import { CheckCircle2, Clock, Search, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AdminLayout from "@/components/layout/admin-layout";
import { useAdmin } from "@/context/admin-context";
import type { OrganiserEvent } from "@/context/organiser-context";

const CATEGORIES = [
  "All",
  "Hackathon",
  "Technical Event",
  "Cultural Event",
  "Workshop",
  "Competition",
  "Club Activity",
];

export default function PendingEventsPage() {
  const { pendingEvents, approveEvent, rejectEvent } = useAdmin();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dateSort, setDateSort] = useState<"newest" | "oldest">("newest");

  const [eventToApprove, setEventToApprove] = useState<OrganiserEvent | null>(
    null,
  );
  const [eventToReject, setEventToReject] = useState<OrganiserEvent | null>(
    null,
  );
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionError, setRejectionError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredEvents = pendingEvents
    .filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organiserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat =
        selectedCategory === "All" || event.category === selectedCategory;
      return matchesSearch && matchesCat;
    })
    .sort((a, b) => {
      if (dateSort === "newest") {
        return (
          new Date(b.submissionDate).getTime() -
          new Date(a.submissionDate).getTime()
        );
      }
      return (
        new Date(a.submissionDate).getTime() -
        new Date(b.submissionDate).getTime()
      );
    });

  const handleConfirmApproval = () => {
    if (eventToApprove) {
      approveEvent(eventToApprove.id);
      setToastMessage(`Event "${eventToApprove.title}" approved successfully.`);
      setEventToApprove(null);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleConfirmRejection = () => {
    if (!eventToReject) return;

    if (!rejectionReason.trim()) {
      setRejectionError("Please provide a rejection reason for the organiser.");
      return;
    }

    setRejectionError(null);
    rejectEvent(eventToReject.id, rejectionReason.trim());
    setToastMessage(
      `Event "${eventToReject.title}" rejected. Rejection notice dispatched to organiser.`,
    );
    setEventToReject(null);
    setRejectionReason("");
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Title matching Frame 19 */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            Pending Event Approvals
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Review event proposals submitted by registered campus clubs and
            societies.
          </p>
        </div>

        {/* Toast */}
        {toastMessage && (
          <output
            aria-live="polite"
            className="flex items-center gap-2 rounded-xl border border-[#067429] bg-[#eaf9ef] p-4 text-xs font-bold text-[#067429] shadow-sm animate-in fade-in"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{toastMessage}</span>
          </output>
        )}

        {/* Toolbar matching Frame 19 rects (Search, Category v, Submission date v) */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center justify-between rounded-xl border border-border bg-surface p-4 shadow-xs">
          {/* Search by event name... */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-tertiary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by event name, organiser, or venue..."
              className="w-full rounded-lg border border-border bg-surface pl-9 pr-4 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Category dropdown */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="pending-cat-filter"
                className="text-xs font-semibold text-text-secondary"
              >
                Category:
              </label>
              <select
                id="pending-cat-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Submission date sort */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="pending-date-sort"
                className="text-xs font-semibold text-text-secondary"
              >
                Submission date:
              </label>
              <select
                id="pending-date-sort"
                value={dateSort}
                onChange={(e) =>
                  setDateSort(e.target.value as "newest" | "oldest")
                }
                className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table matching Frame 19: Event Name | Organiser | Category | Event Date | Submission Date | View Details */}
        <div className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
          {filteredEvents.length === 0 ? (
            <div className="p-12 text-center">
              <Clock className="mx-auto h-10 w-10 text-text-tertiary" />
              <h3 className="mt-3 text-sm font-semibold text-text-primary">
                No Pending Events
              </h3>
              <p className="mt-1 text-xs text-text-secondary">
                {pendingEvents.length === 0
                  ? "Great job! All submitted events have been reviewed."
                  : "No pending events match your filter criteria."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-surface-muted/60 text-xs font-semibold uppercase text-text-secondary">
                  <tr>
                    <th scope="col" className="px-6 py-3.5">
                      Event Name
                    </th>
                    <th scope="col" className="px-6 py-3.5">
                      Organiser
                    </th>
                    <th scope="col" className="px-6 py-3.5">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3.5">
                      Event Date
                    </th>
                    <th scope="col" className="px-6 py-3.5">
                      Submission Date
                    </th>
                    <th scope="col" className="px-6 py-3.5 text-right">
                      View Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredEvents.map((event) => (
                    <tr
                      key={event.id}
                      className="hover:bg-surface-muted/30 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-text-primary">
                        <Link
                          href={`/admin/events/${event.id}/review`}
                          className="hover:text-primary hover:underline"
                        >
                          {event.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-text-secondary whitespace-nowrap">
                        {event.organiserName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 rounded-md bg-surface-muted px-2 py-0.5 text-xs font-medium text-text-secondary">
                          <Tag className="h-3 w-3" />
                          {event.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-text-secondary whitespace-nowrap">
                        {event.date}
                      </td>
                      <td className="px-6 py-4 text-text-secondary whitespace-nowrap">
                        {event.submissionDate}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-3 text-xs font-semibold">
                          <Link
                            href={`/admin/events/${event.id}/review`}
                            className="inline-flex items-center gap-1 text-primary hover:underline font-bold"
                          >
                            <span>View Details &gt;</span>
                          </Link>
                          <span className="text-border">|</span>
                          <button
                            type="button"
                            onClick={() => setEventToApprove(event)}
                            className="text-emerald-700 hover:text-emerald-800 transition-colors"
                          >
                            Approve
                          </button>
                          <span className="text-border">|</span>
                          <button
                            type="button"
                            onClick={() => setEventToReject(event)}
                            className="text-rose-600 hover:text-rose-700 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Approve Dialog */}
      {eventToApprove && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-text-primary">
              Approve Dialog
            </h3>
            <p className="text-sm text-text-secondary">
              Approve <strong>&apos;{eventToApprove.title}&apos;</strong>? It
              will be published to students.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEventToApprove(null)}
                className="rounded-lg border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmApproval}
                className="rounded-lg bg-[#067429] px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
              >
                Confirm Approval
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Dialog */}
      {eventToReject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-text-primary">
              Reject Dialog
            </h3>
            <div>
              <label
                htmlFor="reason-input"
                className="block text-xs font-semibold text-text-primary mb-1.5"
              >
                Rejection Reason <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="reason-input"
                rows={3}
                required
                value={rejectionReason}
                onChange={(e) => {
                  setRejectionReason(e.target.value);
                  if (rejectionError) setRejectionError(null);
                }}
                placeholder="Specify the reason why this event cannot be approved..."
                className={`w-full rounded-lg border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 resize-y ${
                  rejectionError
                    ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                    : "border-border focus:border-focus focus:ring-focus"
                }`}
              />
              {rejectionError && (
                <p className="mt-1 text-xs font-semibold text-rose-600">
                  {rejectionError}
                </p>
              )}
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setEventToReject(null);
                  setRejectionReason("");
                  setRejectionError(null);
                }}
                className="rounded-lg border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRejection}
                className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700"
              >
                Submit Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
