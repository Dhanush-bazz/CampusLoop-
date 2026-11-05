"use client";

import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Link as LinkIcon,
  UploadCloud,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, Suspense, use, useState } from "react";
import EventBanner from "@/components/events/event-banner";
import OrganiserLayout from "@/components/layout/organiser-layout";
import {
  type EventApprovalStatus,
  useOrganiser,
} from "@/context/organiser-context";
import {
  EVENT_CATEGORIES,
  type EventCategory,
  getFallbackBanner,
} from "@/data/events";
import { fileToOptimizedDataUrl } from "@/lib/image-upload";
import { isValidHttpUrl } from "@/lib/urls";

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

function EditEventInner({ params }: EditEventPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { getEventById, updateEvent, deleteEvent } = useOrganiser();

  const event = getEventById(id);

  const [title, setTitle] = useState(event?.title ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [category, setCategory] = useState<EventCategory>(
    (event?.category as EventCategory) ?? "Hackathon",
  );
  const [date, setDate] = useState(event?.date ?? "");
  const [startTime, setStartTime] = useState(event?.startTime ?? "09:00");
  const [endTime, setEndTime] = useState(event?.endTime ?? "21:00");
  const [venue, setVenue] = useState(event?.venue ?? "");
  const [deadline, setDeadline] = useState(event?.registrationDeadline ?? "");
  const [registrationUrl, setRegistrationUrl] = useState(
    event?.registrationUrl || event?.registrationLink || "",
  );
  const [bannerUrl, setBannerUrl] = useState(
    event?.bannerUrl ||
      event?.image ||
      getFallbackBanner(event?.id, event?.category),
  );
  const [clubName, setClubName] = useState(
    event?.organiserName || event?.organiser || "",
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  if (!event) {
    return (
      <OrganiserLayout>
        <div className="max-w-3xl mx-auto p-12 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-rose-500" />
          <h2 className="mt-4 text-xl font-bold text-text-primary">
            Event Not Found
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            The event with ID &quot;{id}&quot; does not exist or may have been
            deleted.
          </p>
          <div className="mt-6">
            <Link
              href="/organiser/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-xs"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Dashboard
            </Link>
          </div>
        </div>
      </OrganiserLayout>
    );
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await fileToOptimizedDataUrl(file);
      setBannerUrl(dataUrl);
    } catch (err) {
      console.error("Failed to process banner image:", err);
      setErrors((prev) => [
        ...prev,
        "Failed to load image. Please select a JPG or PNG file under 5MB.",
      ]);
    }
  };

  const validate = (): boolean => {
    const errs: string[] = [];
    if (!title.trim()) errs.push("Event Title is required");
    if (!description.trim()) errs.push("Event Description is required");
    if (!date) {
      errs.push("Event Date is required");
    }
    if (!venue.trim()) errs.push("Venue is required");
    if (!deadline) {
      errs.push("Registration Deadline is required");
    } else if (date && deadline >= date) {
      errs.push("Registration deadline must be before the event date");
    }
    if (startTime && endTime && endTime <= startTime) {
      errs.push("End time must be after the start time");
    }
    if (!isValidHttpUrl(registrationUrl.trim())) {
      errs.push("Registration URL must be a valid http:// or https:// link");
    }
    if (!clubName.trim()) errs.push("Organiser / Club Name is required");
    setErrors(errs);
    return errs.length === 0;
  };

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newStatus: EventApprovalStatus =
      event.approvalStatus === "Draft" ? "Pending" : "Pending";

    updateEvent(event.id, {
      title,
      description,
      category,
      date,
      startTime,
      endTime,
      venue,
      registrationDeadline: deadline,
      registrationUrl,
      registrationLink: registrationUrl,
      bannerUrl,
      image: bannerUrl,
      organiserName: clubName,
      organiser: clubName,
      approvalStatus: newStatus,
      adminFeedback: undefined,
    });

    setIsSaved(true);
    setTimeout(() => {
      router.push(`/organiser/events/${event.id}`);
    }, 800);
  };

  const handleDelete = () => {
    deleteEvent(event.id);
    router.push("/organiser/dashboard");
  };

  const getStatusBadge = (status: EventApprovalStatus) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#067429]/40 bg-[#eaf9ef] px-3 py-1 text-xs font-bold text-[#067429]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Status: Approved
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#9b4a08]/40 bg-[#fff5ed] px-3 py-1 text-xs font-bold text-[#9b4a08]">
            <Clock className="h-3.5 w-3.5" />
            Status: Pending Approval
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bd0a0a]/40 bg-[#fff0f0] px-3 py-1 text-xs font-bold text-[#bd0a0a]">
            <XCircle className="h-3.5 w-3.5" />
            Status: Rejected
          </span>
        );
      case "Draft":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-bold text-text-secondary">
            Status: Draft
          </span>
        );
    }
  };

  return (
    <OrganiserLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <Link
            href={`/organiser/events/${event.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Event Details
          </Link>
        </div>

        {/* Header matching Frame 15: "Edit Event" + Status badge */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            Edit Event
          </h1>
          <div>{getStatusBadge(event.approvalStatus)}</div>
        </div>

        {/* Frame 15 Alert Banner */}
        {event.approvalStatus === "Approved" && (
          <div className="flex items-center gap-3 rounded-xl border border-amber-300 bg-[#fff5ed] p-4 text-xs font-medium text-[#9b4a08] shadow-xs">
            <AlertTriangle className="h-4 w-4 shrink-0 text-[#9b4a08]" />
            <span>
              This event is approved. Changes will submit it for admin
              re-approval before being republished to students.
            </span>
          </div>
        )}

        {isSaved && (
          <div className="flex items-center gap-2 rounded-xl border border-[#067429] bg-[#eaf9ef] p-4 text-xs font-bold text-[#067429] shadow-xs animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Event changes saved successfully! Redirecting...</span>
          </div>
        )}

        {errors.length > 0 && (
          <div className="rounded-xl border border-rose-300 bg-[#fff0f0] p-4 text-xs text-[#bd0a0a] space-y-1">
            <div className="font-bold">Please fix the following:</div>
            <ul className="list-disc pl-5">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 cols */}
            <div className="lg:col-span-7 space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <div>
                <label
                  htmlFor="edit-title"
                  className="block text-xs font-semibold text-text-primary mb-1"
                >
                  Title:
                </label>
                <input
                  id="edit-title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-desc"
                  className="block text-xs font-semibold text-text-primary mb-1"
                >
                  Description:
                </label>
                <textarea
                  id="edit-desc"
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus resize-y"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-cat"
                  className="block text-xs font-semibold text-text-primary mb-1"
                >
                  Category:
                </label>
                <select
                  id="edit-cat"
                  value={category}
                  onChange={(e) => {
                    const selectedCategory = EVENT_CATEGORIES.find(
                      (item) => item === e.target.value,
                    );
                    if (selectedCategory) setCategory(selectedCategory);
                  }}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                >
                  {EVENT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label
                    htmlFor="edit-date"
                    className="block text-xs font-semibold text-text-primary mb-1"
                  >
                    Date:
                  </label>
                  <input
                    id="edit-date"
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                  />
                </div>
                <div>
                  <label
                    htmlFor="edit-start"
                    className="block text-xs font-semibold text-text-primary mb-1"
                  >
                    Start Time:
                  </label>
                  <input
                    id="edit-start"
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                  />
                </div>
                <div>
                  <label
                    htmlFor="edit-end"
                    className="block text-xs font-semibold text-text-primary mb-1"
                  >
                    End Time:
                  </label>
                  <input
                    id="edit-end"
                    type="time"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="edit-venue"
                  className="block text-xs font-semibold text-text-primary mb-1"
                >
                  Venue:
                </label>
                <input
                  id="edit-venue"
                  type="text"
                  required
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-deadline"
                  className="block text-xs font-semibold text-text-primary mb-1"
                >
                  Registration Deadline:
                </label>
                <input
                  id="edit-deadline"
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-url"
                  className="block text-xs font-semibold text-text-primary mb-1"
                >
                  Registration URL:
                </label>
                <div className="relative">
                  <input
                    id="edit-url"
                    type="url"
                    required
                    value={registrationUrl}
                    onChange={(e) => setRegistrationUrl(e.target.value)}
                    className="w-full rounded-lg border border-border bg-surface pl-3 pr-9 py-2 text-sm text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                  />
                  <LinkIcon className="absolute right-3 top-2.5 h-4 w-4 text-text-tertiary pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Right 5 cols: Banner & Club Name */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-3">
                <span className="block text-xs font-semibold text-text-primary">
                  Current event banner
                </span>
                <div className="overflow-hidden rounded-xl border border-border">
                  <EventBanner
                    src={bannerUrl}
                    alt={title}
                    className="h-44 w-full"
                    showGradient={false}
                  />
                </div>
                <div className="relative flex items-center justify-center rounded-lg border border-border bg-surface-muted py-2.5 hover:bg-border transition-colors cursor-pointer">
                  <UploadCloud className="h-4 w-4 text-text-secondary mr-2" />
                  <span className="text-xs font-semibold text-text-primary">
                    [ Replace image ]
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-2">
                <label
                  htmlFor="edit-club"
                  className="block text-xs font-semibold text-text-primary"
                >
                  Organiser / Club Name:
                </label>
                <input
                  id="edit-club"
                  type="text"
                  required
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                />
              </div>
            </div>
          </div>

          {/* Action buttons (matching Frame 15 SVG: Update Event, Cancel, Delete Event) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-border">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <button
                type="submit"
                className="w-full sm:w-auto rounded-lg bg-[#313131] px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus text-center"
              >
                {event.approvalStatus === "Draft"
                  ? "Submit for Approval"
                  : "Update Event"}
              </button>
              <Link
                href={`/organiser/events/${event.id}`}
                className="w-full sm:w-auto rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-text-secondary hover:bg-surface-muted transition-colors text-center"
              >
                Cancel
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="w-full sm:w-auto rounded-lg border border-rose-200 bg-[#fff0f0] px-5 py-2.5 text-sm font-semibold text-[#bd0a0a] hover:bg-rose-100 transition-colors text-center"
            >
              Delete Event
            </button>
          </div>
        </form>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-surface p-6 shadow-xl space-y-4">
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

export default function EditEventPage(props: EditEventPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface p-8 text-sm">
          Loading event...
        </div>
      }
    >
      <EditEventInner {...props} />
    </Suspense>
  );
}
