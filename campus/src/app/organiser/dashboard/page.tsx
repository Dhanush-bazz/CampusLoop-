"use client";

import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  FileEdit,
  Plus,
  Tag,
  Trash2,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import OrganiserLayout from "@/components/layout/organiser-layout";
import {
  type EventApprovalStatus,
  type OrganiserEvent,
  useOrganiser,
} from "@/context/organiser-context";

export default function OrganiserDashboardPage() {
  const { events, deleteEvent } = useOrganiser();
  const [eventToDelete, setEventToDelete] = useState<OrganiserEvent | null>(
    null,
  );
  const [activeFilter, setActiveFilter] = useState<"All" | EventApprovalStatus>(
    "All",
  );

  // Compute live counts matching SVG structure
  const totalCount = events.length;
  const approvedCount = events.filter(
    (e) => e.approvalStatus === "Approved",
  ).length;
  const pendingCount = events.filter(
    (e) => e.approvalStatus === "Pending",
  ).length;
  const rejectedCount = events.filter(
    (e) => e.approvalStatus === "Rejected",
  ).length;

  const filteredEvents =
    activeFilter === "All"
      ? events
      : events.filter((e) => e.approvalStatus === activeFilter);

  const confirmDelete = () => {
    if (eventToDelete) {
      deleteEvent(eventToDelete.id);
      setEventToDelete(null);
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
      case "Draft":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-2.5 py-1 text-xs font-semibold text-text-secondary">
            Draft
          </span>
        );
    }
  };

  return (
    <OrganiserLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Top Section: Welcome Header & + Create New Event button */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Welcome, Organiser
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Manage your club&apos;s event listings, submissions, and status
              approvals.
            </p>
          </div>

          <Link
            href="/organiser/events/create"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#313131] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            <Plus className="h-4 w-4" />
            <span>+ Create New Event</span>
          </Link>
        </div>

        {/* Frame 13 Stats Grid (Matching SVG exact tiles & colors) */}
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
              {totalCount}
            </span>
          </button>

          {/* 2. Approved Events (#eaf9ef / #067429) */}
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
              {approvedCount}
            </span>
          </button>

          {/* 3. Pending Approvals (#fff5ed / #9b4a08) */}
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
              {pendingCount}
            </span>
          </button>

          {/* 4. Rejected Events (#fff0f0 / #bd0a0a) */}
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
              {rejectedCount}
            </span>
          </button>
        </div>

        {/* Frame 13 Recent Events Table Section */}
        <div className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border px-6 py-4">
            <div>
              <h2 className="text-base font-bold text-text-primary">
                Recent Submissions & Events
              </h2>
              <p className="text-xs text-text-secondary">
                Showing {filteredEvents.length} of {totalCount} events
              </p>
            </div>

            {/* Quick Filter tabs */}
            <div className="flex items-center gap-1.5 rounded-lg bg-surface-muted p-1 text-xs font-semibold">
              {(
                ["All", "Approved", "Pending", "Rejected", "Draft"] as const
              ).map((status) => (
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
              ))}
            </div>
          </div>

          {/* Table */}
          {filteredEvents.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="mx-auto h-10 w-10 text-text-tertiary" />
              <h3 className="mt-3 text-sm font-semibold text-text-primary">
                No events found
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
                      Event Date
                    </th>
                    <th scope="col" className="px-6 py-3.5">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3.5">
                      Submission Date
                    </th>
                    <th scope="col" className="px-6 py-3.5">
                      Approval Status
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
                          href={`/organiser/events/${event.id}`}
                          className="hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus rounded-sm"
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
                        {event.date}
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
                        <div className="flex items-center justify-end gap-3 text-xs font-semibold">
                          <Link
                            href={`/organiser/events/${event.id}`}
                            className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>View</span>
                          </Link>
                          <span className="text-border">|</span>
                          <Link
                            href={`/organiser/events/${event.id}/edit`}
                            className="inline-flex items-center gap-1 text-primary hover:underline transition-colors"
                          >
                            <FileEdit className="h-3.5 w-3.5" />
                            <span>Edit</span>
                          </Link>
                          <span className="text-border">|</span>
                          <button
                            type="button"
                            onClick={() => setEventToDelete(event)}
                            className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Delete</span>
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

      {/* Delete Confirmation Modal (matching Wireframe confirmation dialog) */}
      {eventToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3
                  id="delete-dialog-title"
                  className="text-base font-bold text-text-primary"
                >
                  Delete Event
                </h3>
                <p className="text-xs text-text-secondary">
                  Are you sure you want to delete this event listing?
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-surface-muted p-3 text-xs text-text-secondary">
              <strong className="text-text-primary block font-semibold mb-0.5">
                {eventToDelete.title}
              </strong>
              Status: {eventToDelete.approvalStatus} • Date:{" "}
              {eventToDelete.date}
            </div>

            <p className="text-xs text-text-secondary leading-relaxed">
              This action will remove the event from the organiser preview saved
              in this browser. This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEventToDelete(null)}
                className="rounded-lg border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-rose-700 transition-colors"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </OrganiserLayout>
  );
}
