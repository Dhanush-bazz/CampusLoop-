"use client";

import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Tag,
  User,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, use, useState } from "react";
import AdminLayout from "@/components/layout/admin-layout";
import { useAdmin } from "@/context/admin-context";

interface AdminReviewPageProps {
  params: Promise<{ id: string }>;
}

function AdminReviewInner({ params }: AdminReviewPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { getEventById, approveEvent, rejectEvent } = useAdmin();

  const event = getEventById(id);

  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionError, setRejectionError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!event) {
    return (
      <AdminLayout>
        <div className="max-w-3xl mx-auto p-12 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-rose-500" />
          <h2 className="mt-4 text-xl font-bold text-text-primary">
            Event Not Found
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            The event submission with ID &quot;{id}&quot; does not exist or may
            have been removed.
          </p>
          <div className="mt-6">
            <Link
              href="/admin/events/pending"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Pending Events
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const handleConfirmApproval = () => {
    approveEvent(event.id);
    setShowApproveDialog(false);
    setToastMessage("Event approved successfully. Status = Approved");
    setTimeout(() => {
      router.push("/admin/events/approved");
    }, 1200);
  };

  const handleConfirmRejection = () => {
    if (!rejectionReason.trim()) {
      setRejectionError("Please provide a rejection reason for the organiser.");
      return;
    }
    setRejectionError(null);
    rejectEvent(event.id, rejectionReason.trim());
    setShowRejectDialog(false);
    setToastMessage("Event rejected. Feedback recorded for organiser.");
    setTimeout(() => {
      router.push("/admin/events/rejected");
    }, 1200);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back Link matching Frame 20: "< Back to Pending Events" */}
        <div>
          <Link
            href="/admin/events/pending"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus rounded-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            &lt; Back to Pending Events
          </Link>
        </div>

        {/* Heading & Status Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Event Approval Review
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-text-secondary">
              Review event guidelines, venue clearance, and safety policies
              before publishing.
            </p>
          </div>

          <div>
            {event.approvalStatus === "Pending" && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
                <Clock className="h-3.5 w-3.5" />
                Status: Pending Approval
              </span>
            )}
            {event.approvalStatus === "Approved" && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Status: Approved &amp; Published
              </span>
            )}
            {event.approvalStatus === "Rejected" && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-bold text-rose-800">
                <XCircle className="h-3.5 w-3.5" />
                Status: Rejected
              </span>
            )}
          </div>
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

        {/* Main 2-column layout matching Frame 20 SVG */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Event Banner & Details Card (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
              {/* Event banner */}
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

              {/* Event information card (matching Frame 20 rect #f7f7f7) */}
              <div className="p-6 bg-[#f7f7f7] border-t border-border space-y-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                    {event.title}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-text-secondary">
                    Category: {event.category}
                  </p>
                </div>

                <div className="text-xs text-text-secondary leading-relaxed">
                  <strong className="block text-text-primary text-xs mb-1">
                    Description:
                  </strong>
                  <p>{event.description}</p>
                </div>

                <div className="space-y-2.5 text-sm text-text-primary border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-text-tertiary shrink-0" />
                    <span>
                      <strong>Organiser:</strong> {event.organiserName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-text-tertiary shrink-0" />
                    <span>
                      <strong>Organiser email:</strong>{" "}
                      {event.organiserEmail || "organiser@college.edu"}
                    </span>
                  </div>

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
                      <strong>Registration URL:</strong>{" "}
                      <a
                        href={event.registrationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary font-medium hover:underline break-all"
                      >
                        {event.registrationUrl}
                      </a>
                    </span>
                  </div>
                </div>

                {event.adminFeedback && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-900 space-y-1">
                    <strong className="block font-bold">
                      Recorded Rejection Reason:
                    </strong>
                    <p>{event.adminFeedback}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Frame 20 Action Buttons: Approve Event (w=200, fill=#eaf9ef) & Reject Event (w=200, fill=#fff0f0) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full">
              <button
                type="button"
                onClick={() => {
                  setShowApproveDialog(true);
                  setShowRejectDialog(false);
                }}
                className="flex-1 w-full sm:w-auto min-w-0 sm:min-w-[180px] inline-flex items-center justify-center gap-2 rounded-xl border border-[#067429]/40 bg-[#eaf9ef] py-3.5 text-sm font-bold text-[#067429] shadow-xs hover:bg-[#d8f4e2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Approve Event</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowRejectDialog(true);
                  setShowApproveDialog(false);
                }}
                className="flex-1 w-full sm:w-auto min-w-0 sm:min-w-[180px] inline-flex items-center justify-center gap-2 rounded-xl border border-[#bd0a0a]/40 bg-[#fff0f0] py-3.5 text-sm font-bold text-[#bd0a0a] shadow-xs hover:bg-[#fedede] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                <XCircle className="h-4 w-4" />
                <span>Reject Event</span>
              </button>
            </div>
          </div>

          {/* Right Column: Inline Approval / Rejection Dialogs matching Frame 20 SVG */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Approve Dialog Panel (matching Frame 20 rect x=860 y=148 w=532 h=240 fill=#ffffff) */}
            <div
              className={`rounded-2xl border p-6 shadow-sm transition-all ${
                showApproveDialog
                  ? "border-emerald-500 ring-2 ring-emerald-500/20 bg-surface"
                  : "border-border bg-surface"
              }`}
            >
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-3">
                <CheckCircle2 className="h-4 w-4 text-[#067429]" />
                <h3>Approve Dialog</h3>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed mb-4">
                Approve <strong>&apos;{event.title}&apos;</strong>? It will be
                immediately published to students and visible on the Dashboard
                and Explore pages.
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleConfirmApproval}
                  className="rounded-lg bg-[#067429] px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-800 transition-colors shadow-xs"
                >
                  Confirm Approval
                </button>
                {showApproveDialog && (
                  <button
                    type="button"
                    onClick={() => setShowApproveDialog(false)}
                    className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-muted"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <p className="mt-3 text-[11px] text-text-tertiary">
                After: toast &apos;Event approved successfully.&apos; Status =
                Approved
              </p>
            </div>

            {/* 2. Reject Dialog Panel (matching Frame 20 rect x=860 y=412 w=532 h=330 fill=#ffffff) */}
            <div
              className={`rounded-2xl border p-6 shadow-sm transition-all ${
                showRejectDialog
                  ? "border-rose-500 ring-2 ring-rose-500/20 bg-surface"
                  : "border-border bg-surface"
              }`}
            >
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm mb-3">
                <XCircle className="h-4 w-4 text-[#bd0a0a]" />
                <h3>Reject Dialog</h3>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <label
                    htmlFor="rejection-reason"
                    className="block text-xs font-semibold text-text-primary mb-1"
                  >
                    Rejection Reason <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="rejection-reason"
                    rows={4}
                    required
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Venue booking not confirmed. Please attach approval from facilities office."
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus resize-y"
                  />
                  {rejectionError && (
                    <p className="text-[11px] text-rose-600 mt-1">
                      {rejectionError}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleConfirmRejection}
                  className="rounded-lg bg-[#bd0a0a] px-4 py-2.5 text-xs font-bold text-white hover:bg-rose-800 transition-colors shadow-xs"
                >
                  Submit Rejection
                </button>
                {showRejectDialog && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowRejectDialog(false);
                      setRejectionError(null);
                    }}
                    className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-muted"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <p className="mt-3 text-[11px] text-text-tertiary">
                After: Status = Rejected, reason shown to organiser on Frame 16
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function AdminReviewPage(props: AdminReviewPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface p-8 text-sm">
          Loading event details...
        </div>
      }
    >
      <AdminReviewInner {...props} />
    </Suspense>
  );
}
