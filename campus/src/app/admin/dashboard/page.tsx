"use client";

import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  Tag,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AdminLayout from "@/components/layout/admin-layout";
import { useAdmin } from "@/context/admin-context";
import type {
  EventApprovalStatus,
  OrganiserEvent,
} from "@/context/organiser-context";

export default function AdminDashboardPage() {
  const { events, stats, approveEvent, rejectEvent } = useAdmin();

  const [activeFilter, setActiveFilter] = useState<"All" | EventApprovalStatus>(
    "All",
  );
  const [eventToApprove, setEventToApprove] = useState<OrganiserEvent | null>(
    null,
  );
  const [eventToReject, setEventToReject] = useState<OrganiserEvent | null>(
    null,
  );
  const [rejectionReason, setRejectionReason] = useState("");
  const [actionToast, setActionToast] = useState<string | null>(null);

  const filteredEvents =
    activeFilter === "All"
      ? events
      : events.filter((e) => e.approvalStatus === activeFilter);

  const handleConfirmApproval = () => {
    if (eventToApprove) {
      approveEvent(eventToApprove.id);
      setActionToast(
        `Event "${eventToApprove.title}" approved successfully. Status = Approved`,
      );
      setEventToApprove(null);
      setTimeout(() => setActionToast(null), 4000);
    }
  };

  const handleConfirmRejection = () => {
    if (eventToReject) {
      const reason =
        rejectionReason.trim() ||
        "Submission does not meet campus activity guidelines.";
      rejectEvent(eventToReject.id, reason);
      setActionToast(
        `Event "${eventToReject.title}" rejected. Feedback sent to organiser.`,
      );
      setEventToReject(null);
      setRejectionReason("");
      setTimeout(() => setActionToast(null), 4000);
    }
  };

  const getStatusBadge = (status: EventApprovalStatus) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#067429]/30 bg-[#eaf9ef] px-2.5 py-1 text-xs font-semibold text-[#067429]">
            <CheckCircle2 className="h-3 w-3" />
            Approved
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#9b4a08]/30 bg-[#fff5ed] px-2.5 py-1 text-xs font-semibold text-[#9b4a08]">
            <Clock className="h-3 w-3" />
            Pending
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bd0a0a]/30 bg-[#fff0f0] px-2.5 py-1 text-xs font-semibold text-[#bd0a0a]">
            <XCircle className="h-3 w-3" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Top Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Campus event approval console and university moderation queue.
          </p>
        </div>

        {/* Action Toast */}
        {actionToast && (
          <output
            aria-live="polite"
            className="flex items-center gap-2 rounded-xl border border-[#067429] bg-[#eaf9ef] p-4 text-xs font-bold text-[#067429] shadow-sm animate-in fade-in"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{actionToast}</span>
          </output>
        )}

        {/* Frame 18 KPI Stat Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {/* 1. Total Events */}
          <button
            type="button"
            onClick={() => setActiveFilter("All")}
            className={`flex flex-col items-center justify-center rounded-xl border p-5 text-center transition-all ${
              activeFilter === "All"
                ? "border-primary ring-2 ring-primary/20 bg-surface shadow-sm"
                : "border-border bg-[#f7f7f7] hover:bg-surface"
            }`}
          >
            <span className="text-sm font-medium text-text-secondary">
              Total Events
            </span>
            <span className="mt-1 text-3xl font-black text-text-primary">
              {stats.total}
            </span>
          </button>

          {/* 2. Pending Approvals */}
          <button
            type="button"
            onClick={() => setActiveFilter("Pending")}
            className={`flex flex-col items-center justify-center rounded-xl border p-5 text-center transition-all ${
              activeFilter === "Pending"
                ? "border-[#9b4a08] ring-2 ring-[#9b4a08]/20 shadow-sm"
                : "border-[#9b4a08]/30"
            } bg-[#fff5ed] hover:opacity-90`}
          >
            <span className="text-sm font-semibold text-[#9b4a08]">
              Pending Approvals
            </span>
            <span className="mt-1 text-3xl font-black text-[#9b4a08]">
              {stats.pending}
            </span>
          </button>

          {/* 3. Approved Events */}
          <button
            type="button"
            onClick={() => setActiveFilter("Approved")}
            className={`flex flex-col items-center justify-center rounded-xl border p-5 text-center transition-all ${
              activeFilter === "Approved"
                ? "border-[#067429] ring-2 ring-[#067429]/20 shadow-sm"
                : "border-[#067429]/30"
            } bg-[#eaf9ef] hover:opacity-90`}
          >
            <span className="text-sm font-semibold text-[#067429]">
              Approved Events
            </span>
            <span className="mt-1 text-3xl font-black text-[#067429]">
              {stats.approved}
            </span>
          </button>

          {/* 4. Rejected Events */}
          <button
            type="button"
            onClick={() => setActiveFilter("Rejected")}
            className={`flex flex-col items-center justify-center rounded-xl border p-5 text-center transition-all ${
              activeFilter === "Rejected"
                ? "border-[#bd0a0a] ring-2 ring-[#bd0a0a]/20 shadow-sm"
                : "border-[#bd0a0a]/30"
            } bg-[#fff0f0] hover:opacity-90`}
          >
            <span className="text-sm font-semibold text-[#bd0a0a]">
              Rejected Events
            </span>
            <span className="mt-1 text-3xl font-black text-[#bd0a0a]">
              {stats.rejected}
            </span>
          </button>
        </div>

        {/* Frame 18 Pending Approvals Banner (#fff5ed fill / #9b4a08 text) */}
        {stats.pending > 0 ? (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-amber-300 bg-[#fff5ed] p-4 text-[#9b4a08] shadow-xs">
            <div className="flex items-center gap-2.5">
              <Clock className="h-5 w-5 shrink-0" />
              <span className="text-sm">
                <strong>Pending Approvals:</strong> {stats.pending}{" "}
                {stats.pending === 1 ? "event is" : "events are"} waiting for
                review.
              </span>
            </div>
            <Link
              href="/admin/events/pending"
              className="inline-flex items-center gap-1 text-xs font-bold underline hover:opacity-80 whitespace-nowrap"
            >
              Review now &gt;
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 rounded-xl border border-emerald-300 bg-[#eaf9ef] p-4 text-xs font-medium text-[#067429] shadow-xs">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>All event submissions have been reviewed and resolved.</span>
          </div>
        )}

        {/* Frame 18 Recent Submissions Table */}
        <div className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border px-6 py-4">
            <div>
              <h2 className="text-base font-bold text-text-primary">
                Recent Submissions
              </h2>
              <p className="text-xs text-text-secondary">
                Showing {filteredEvents.length} of {stats.total} total
                submissions
              </p>
            </div>

            {/* Quick status tabs */}
            <div className="flex items-center gap-1.5 rounded-lg bg-surface-muted p-1 text-xs font-semibold">
              {(["All", "Pending", "Approved", "Rejected"] as const).map(
                (status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setActiveFilter(status)}
                    className={`rounded-md px-3 py-1 transition-colors ${
                      activeFilter === status
                        ? "bg-surface text-text-primary shadow-xs"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {status}
                  </button>
                ),
              )}
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="mx-auto h-10 w-10 text-text-tertiary" />
              <h3 className="mt-3 text-sm font-semibold text-text-primary">
                No events in this category
              </h3>
              <p className="mt-1 text-xs text-text-secondary">
                No events match the selected &quot;{activeFilter}&quot; status.
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
                      Submission Date
                    </th>
                    <th scope="col" className="px-6 py-3.5">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3.5 text-right">
                      Actions
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
                        {event.adminFeedback && (
                          <div className="mt-1 text-xs text-[#bd0a0a] line-clamp-1">
                            Note: {event.adminFeedback}
                          </div>
                        )}
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
                        {event.submissionDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(event.approvalStatus)}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2 text-xs font-semibold">
                          <Link
                            href={`/admin/events/${event.id}/review`}
                            className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>View Details</span>
                          </Link>
                          {event.approvalStatus === "Pending" && (
                            <>
                              <span className="text-border">|</span>
                              <button
                                type="button"
                                onClick={() => setEventToApprove(event)}
                                className="text-emerald-700 hover:text-emerald-800 transition-colors font-bold"
                              >
                                Approve
                              </button>
                              <span className="text-border">|</span>
                              <button
                                type="button"
                                onClick={() => setEventToReject(event)}
                                className="text-rose-600 hover:text-rose-700 transition-colors font-bold"
                              >
                                Reject
                              </button>
                            </>
                          )}
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

      {/* Approve Dialog (matching Frame 20 SVG spec) */}
      {eventToApprove && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-emerald-700">
              <CheckCircle2 className="h-6 w-6" />
              <h3 className="text-base font-bold text-text-primary">
                Approve Dialog
              </h3>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
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

      {/* Reject Dialog (matching Frame 20 SVG spec) */}
      {eventToReject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertCircle className="h-6 w-6" />
              <h3 className="text-base font-bold text-text-primary">
                Reject Dialog
              </h3>
            </div>
            <p className="text-xs text-text-secondary">
              Rejecting <strong>&apos;{eventToReject.title}&apos;</strong>. The
              organiser will be prompted to resolve this feedback.
            </p>
            <div>
              <label
                htmlFor="admin-rejection-reason"
                className="block text-xs font-semibold text-text-primary mb-1.5"
              >
                Rejection Reason <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="admin-rejection-reason"
                rows={3}
                required
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Venue booking not confirmed. Please attach approval from facilities office."
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus resize-y"
              />
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setEventToReject(null);
                  setRejectionReason("");
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
