"use client";

import {
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  FileEdit,
  Plus,
  Search,
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

export default function OrganiserMyEventsPage() {
  const { events, deleteEvent } = useOrganiser();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<
    "All" | EventApprovalStatus
  >("All");
  const [eventToDelete, setEventToDelete] = useState<OrganiserEvent | null>(
    null,
  );

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" || e.approvalStatus === selectedStatus;
    return matchesSearch && matchesStatus;
  });

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
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              My Events
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Review and manage all submitted campus activities and their
              approval statuses.
            </p>
          </div>

          <Link
            href="/organiser/events/create"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#313131] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-black transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Event</span>
          </Link>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between rounded-xl border border-border bg-surface p-4 shadow-xs">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-tertiary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, category, venue..."
              className="w-full rounded-lg border border-border bg-surface pl-9 pr-4 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-semibold text-text-secondary shrink-0">
              Status:
            </span>
            <div className="flex items-center gap-1 rounded-lg bg-surface-muted p-1 text-xs font-semibold shrink-0">
              {(
                ["All", "Approved", "Pending", "Rejected", "Draft"] as const
              ).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setSelectedStatus(status)}
                  className={`rounded-md px-3 py-1 transition-colors shrink-0 ${
                    selectedStatus === status
                      ? "bg-surface text-text-primary shadow-xs"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
          {filteredEvents.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="mx-auto h-10 w-10 text-text-tertiary" />
              <h3 className="mt-3 text-sm font-semibold text-text-primary">
                No events found
              </h3>
              <p className="mt-1 text-xs text-text-secondary">
                Try adjusting your search query or status filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[640px]">
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
                            className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>View</span>
                          </Link>
                          <span className="text-border">|</span>
                          <Link
                            href={`/organiser/events/${event.id}/edit`}
                            className="inline-flex items-center gap-1 text-primary hover:underline"
                          >
                            <FileEdit className="h-3.5 w-3.5" />
                            <span>Edit</span>
                          </Link>
                          <span className="text-border">|</span>
                          <button
                            type="button"
                            onClick={() => setEventToDelete(event)}
                            className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700"
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

      {/* Delete Confirmation Modal */}
      {eventToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-surface p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-text-primary">
              Delete Event
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Are you sure you want to delete &quot;{eventToDelete.title}&quot;?
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEventToDelete(null)}
                className="rounded-lg border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700"
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
