"use client";

import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileEdit,
  MapPin,
  Tag,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, use, useState } from "react";
import OrganiserLayout from "@/components/layout/organiser-layout";
import { useOrganiser } from "@/context/organiser-context";
import { isValidHttpUrl } from "@/lib/urls";

interface OrganiserEventDetailPageProps {
  params: Promise<{ id: string }>;
}

function OrganiserEventDetailInner({ params }: OrganiserEventDetailPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { getEventById, deleteEvent } = useOrganiser();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const event = getEventById(id);

  if (!event) {
    return (
      <OrganiserLayout>
        <div className="max-w-3xl mx-auto p-12 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-rose-500" />
          <h2 className="mt-4 text-xl font-bold text-text-primary">
            Event Not Found
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            The event with ID &quot;{id}&quot; was not found in your organiser
            account.
          </p>
          <div className="mt-6">
            <Link
              href="/organiser/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Dashboard
            </Link>
          </div>
        </div>
      </OrganiserLayout>
    );
  }

  const handleDelete = () => {
    deleteEvent(event.id);
    router.push("/organiser/dashboard");
  };

  return (
    <OrganiserLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation back to dashboard matching Frame 16: "< Back to Dashboard" */}
        <div>
          <Link
            href="/organiser/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus rounded-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            &lt; Back to Dashboard
          </Link>
        </div>

        {/* 2-Column Grid Layout matching Frame 16 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Event Banner & Details Card (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Event Banner */}
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
              <div className="relative aspect-video w-full bg-[#e7e7e7]">
                <Image
                  src={event.bannerUrl}
                  alt={event.title}
                  width={1200}
                  height={675}
                  unoptimized
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/70 backdrop-blur-xs px-3 py-1 text-xs font-semibold text-white">
                    <Tag className="h-3 w-3" />
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Event Metadata Card (matching Frame 16 rect #f7f7f7) */}
              <div className="p-6 bg-[#f7f7f7] border-t border-border space-y-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-text-primary">
                    {event.title}
                  </h1>
                  <p className="mt-1 text-sm font-medium text-text-secondary">
                    {event.category} &nbsp;|&nbsp; {event.organiserName}
                  </p>
                </div>

                <div className="space-y-2.5 text-sm text-text-primary border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-text-tertiary shrink-0" />
                    <span>
                      <strong>Date:</strong> {event.date} &nbsp;|&nbsp;{" "}
                      {event.startTime} to {event.endTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-text-tertiary shrink-0" />
                    <span>
                      <strong>Venue:</strong> {event.venue}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-text-tertiary shrink-0" />
                    <span>
                      <strong>Registration deadline:</strong>{" "}
                      {event.registrationDeadline}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-text-tertiary shrink-0" />
                    <span>
                      <strong>Registration link:</strong>{" "}
                      {isValidHttpUrl(event.registrationUrl) ? (
                        <a
                          href={event.registrationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary font-medium hover:underline break-all"
                        >
                          {event.registrationUrl}
                        </a>
                      ) : (
                        <span className="text-text-secondary">
                          Not provided
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-text-secondary pt-2">
                    <Users className="h-4 w-4 text-text-tertiary shrink-0" />
                    <span>
                      <strong>Submitted on:</strong> {event.submissionDate}
                    </span>
                  </div>
                </div>

                {/* Event Description */}
                <div className="border-t border-border pt-4 text-xs text-text-secondary leading-relaxed">
                  <strong className="block text-text-primary mb-1">
                    Description:
                  </strong>
                  <p>{event.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Approval Status & Action Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider text-text-secondary">
                Approval Status
              </h2>

              {/* Status Display matching Frame 16 wireframe variants */}
              {event.approvalStatus === "Pending" && (
                <div className="rounded-xl border border-[#9b4a08]/40 bg-[#fff5ed] p-5 text-sm text-[#9b4a08] space-y-2">
                  <div className="flex items-center gap-2 font-bold">
                    <Clock className="h-5 w-5 shrink-0" />
                    <span>Pending Review:</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    This event has been submitted and is currently in the campus
                    administration moderation queue awaiting approval.
                  </p>
                </div>
              )}

              {event.approvalStatus === "Draft" && (
                <div className="rounded-xl border border-border bg-surface-muted p-5 text-sm text-text-secondary space-y-2">
                  <div className="flex items-center gap-2 font-bold">
                    <FileEdit className="h-5 w-5 shrink-0" />
                    <span>Draft:</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    This event is saved as a draft and has not yet been
                    submitted for campus administrative review.
                  </p>
                </div>
              )}

              {event.approvalStatus === "Approved" && (
                <div className="rounded-xl border border-[#067429]/40 bg-[#eaf9ef] p-5 text-sm text-[#067429] space-y-2">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <span>Approved &amp; Published:</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    This event has been officially approved by campus
                    administration and is now published for student discovery.
                  </p>
                </div>
              )}

              {event.approvalStatus === "Rejected" && (
                <div className="rounded-xl border border-[#bd0a0a]/40 bg-[#fff0f0] p-5 text-sm text-[#bd0a0a] space-y-3">
                  <div className="flex items-center gap-2 font-bold">
                    <XCircle className="h-5 w-5 shrink-0" />
                    <span>Rejected:</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    Your event was rejected. Review the admin feedback and make
                    the required changes.
                  </p>
                  {event.adminFeedback && (
                    <div className="rounded-lg bg-white/70 border border-rose-200 p-3 text-xs">
                      <strong className="block font-semibold mb-1 text-rose-950">
                        Admin feedback:
                      </strong>
                      <p className="text-rose-900">{event.adminFeedback}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons matching Frame 16: Edit Event & Delete Event */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                <Link
                  href={`/organiser/events/${event.id}/edit`}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#313131] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-black transition-colors"
                >
                  <FileEdit className="h-4 w-4" />
                  <span>Edit Event</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-rose-200 bg-[#fff0f0] px-5 py-3 text-sm font-semibold text-[#bd0a0a] hover:bg-rose-100 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Event</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3 text-rose-600">
                <AlertTriangle className="h-6 w-6" />
                <h3 className="text-base font-bold text-text-primary">
                  Delete Event
                </h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Are you sure you want to delete &quot;{event.title}&quot;? This
                action cannot be undone and will permanently remove this
                listing.
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="rounded-lg border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-muted"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700"
                >
                  Delete Event
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </OrganiserLayout>
  );
}

export default function OrganiserEventDetailPage(
  props: OrganiserEventDetailPageProps,
) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface p-8 text-sm">
          Loading event details...
        </div>
      }
    >
      <OrganiserEventDetailInner {...props} />
    </Suspense>
  );
}
