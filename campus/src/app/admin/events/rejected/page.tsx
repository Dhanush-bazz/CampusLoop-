"use client";

import { AlertCircle, Calendar, RotateCcw, Search, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AdminLayout from "@/components/layout/admin-layout";
import { useAdmin } from "@/context/admin-context";

const CATEGORIES = [
  "All",
  "Hackathon",
  "Technical Event",
  "Cultural Event",
  "Workshop",
  "Competition",
  "Club Activity",
];

export default function RejectedEventsPage() {
  const { rejectedEvents, approveEvent } = useAdmin();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredEvents = rejectedEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organiserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.adminFeedback || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleReconsiderApproval = (id: string, title: string) => {
    approveEvent(id);
    setToastMessage(`Event "${title}" approved upon re-evaluation.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Title matching Frame 22 */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            Rejected Events
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Audit history of rejected proposals with recorded administrative
            feedback and compliance notes.
          </p>
        </div>

        {/* Toast */}
        {toastMessage && (
          <output
            aria-live="polite"
            className="flex items-center gap-2 rounded-xl border border-[#067429] bg-[#eaf9ef] p-4 text-xs font-bold text-[#067429] shadow-sm animate-in fade-in"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-[#067429]" />
            <span>{toastMessage}</span>
          </output>
        )}

        {/* Toolbar matching Frame 22 rects */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between rounded-xl border border-border bg-surface p-4 shadow-xs">
          {/* Search by event name... */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-tertiary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by event name, organiser, or rejection reason..."
              className="w-full rounded-lg border border-border bg-surface pl-9 pr-4 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
            />
          </div>

          {/* Category dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label
              htmlFor="rejected-cat-filter"
              className="text-xs font-semibold text-text-secondary shrink-0"
            >
              Category:
            </label>
            <select
              id="rejected-cat-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table matching Frame 22: Event Name | Organiser | Submission Date | Rejection Reason | View Details */}
        <div className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
          {filteredEvents.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="mx-auto h-10 w-10 text-text-tertiary" />
              <h3 className="mt-3 text-sm font-semibold text-text-primary">
                No Rejected Events
              </h3>
              <p className="mt-1 text-xs text-text-secondary">
                {rejectedEvents.length === 0
                  ? "There are currently no rejected events."
                  : "No rejected events match your search criteria."}
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
                      Organiser
                    </th>
                    <th scope="col" className="px-6 py-3.5">
                      Submission Date
                    </th>
                    <th scope="col" className="px-6 py-3.5">
                      Rejection Reason
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
                        <div className="mt-1 flex items-center gap-1 text-xs text-text-tertiary">
                          <Tag className="h-3 w-3" />
                          <span>{event.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-text-secondary whitespace-nowrap">
                        {event.organiserName}
                      </td>
                      <td className="px-6 py-4 text-text-secondary whitespace-nowrap">
                        {event.submissionDate}
                      </td>
                      <td className="px-6 py-4">
                        <div className="rounded-lg bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-900 leading-relaxed max-w-md">
                          {event.adminFeedback ||
                            "Venue booking or policy compliance issue."}
                        </div>
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
                            onClick={() =>
                              handleReconsiderApproval(event.id, event.title)
                            }
                            className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 transition-colors"
                            title="Re-approve event"
                          >
                            <RotateCcw className="h-3 w-3" />
                            <span>Re-approve</span>
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
    </AdminLayout>
  );
}
