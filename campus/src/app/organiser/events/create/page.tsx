"use client";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Link as LinkIcon,
  UploadCloud,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import OrganiserLayout from "@/components/layout/organiser-layout";
import { useAuth } from "@/context/auth-context";
import { useOrganiser } from "@/context/organiser-context";
import { EVENT_CATEGORIES, type EventCategory } from "@/data/events";
import { isValidHttpUrl } from "@/lib/urls";

export default function CreateEventPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { createEvent, profile } = useOrganiser();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<EventCategory>("Hackathon");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [venue, setVenue] = useState("");
  const [deadline, setDeadline] = useState("");
  const [registrationUrl, setRegistrationUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState(
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
  );
  const [clubName, setClubName] = useState(
    profile.clubName || "IEEE Student Branch",
  );

  const [errors, setErrors] = useState<string[]>([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraftSaving, setIsDraftSaving] = useState(false);

  const validate = (): boolean => {
    const errs: string[] = [];

    if (!title.trim()) {
      errs.push("Event Title is required");
    }
    if (!description.trim()) {
      errs.push("Event Description is required");
    }
    if (!date) {
      errs.push("Event Date is required");
    }
    if (startTime && endTime && endTime <= startTime) {
      errs.push("End time must be after the start time");
    }
    if (!venue.trim()) {
      errs.push("Venue is required");
    }
    if (!deadline) {
      errs.push("Registration Deadline is required");
    } else if (date && deadline >= date) {
      errs.push("Registration deadline must be before the event date");
    }
    if (!isValidHttpUrl(registrationUrl.trim())) {
      errs.push("Registration URL must be a valid http:// or https:// link");
    }
    if (!clubName.trim()) {
      errs.push("Organiser / Club Name is required");
    }

    setErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = (e: FormEvent, isDraft = false) => {
    e.preventDefault();
    if (isDraft) {
      setErrors([]);
    } else if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const activeEmail =
      user?.email || profile.email || "organiser@campusloop.com";
    const activeName = clubName || profile.clubName || "Campus Club";

    const newEvent = createEvent(
      {
        title: title || "Untitled Draft Event",
        description: description || "No description provided.",
        category,
        date: date || new Date().toISOString().split("T")[0],
        startTime,
        endTime,
        venue: venue || "TBD",
        registrationDeadline:
          deadline || date || new Date().toISOString().split("T")[0],
        registrationUrl,
        bannerUrl,
        organiserName: activeName,
        organiserEmail: activeEmail,
      },
      isDraft,
    );

    setIsSubmitting(false);
    setIsDraftSaving(isDraft);
    setShowSuccessToast(true);

    setTimeout(() => {
      router.push(`/organiser/events/${newEvent.id}`);
    }, 1200);
  };

  return (
    <OrganiserLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back Link */}
        <div>
          <Link
            href="/organiser/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Dashboard
          </Link>
        </div>

        {/* Heading */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Create Event
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-text-secondary">
              Submit your campus event proposal for administrative review and
              publication.
            </p>
          </div>
        </div>

        {/* Success Toast banner (matching Frame 14 SVG #eaf9ef) */}
        {showSuccessToast && (
          <output
            aria-live="polite"
            className="flex items-start justify-between rounded-xl border border-[#067429] bg-[#eaf9ef] p-4 text-[#067429] shadow-sm animate-in fade-in"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">
                  {isDraftSaving
                    ? "Draft saved"
                    : "Submission saved in preview"}
                </p>
                <p className="text-xs mt-0.5">
                  {isDraftSaving
                    ? "Your draft has been saved in this browser preview."
                    : "Your event is saved locally and marked pending. Admin review is not implemented."}
                </p>
                <p className="text-xs font-semibold mt-1">
                  Status: {isDraftSaving ? "Draft" : "Pending Approval"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowSuccessToast(false)}
              className="text-[#067429] hover:opacity-75"
              aria-label="Dismiss banner"
            >
              <X className="h-4 w-4" />
            </button>
          </output>
        )}

        {/* Error Validation Banner (matching System States in SVG #fff0f0) */}
        {errors.length > 0 && (
          <div
            role="alert"
            className="rounded-xl border border-rose-300 bg-[#fff0f0] p-4 text-xs text-[#bd0a0a] space-y-1.5 shadow-sm"
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>Please fix {errors.length} errors before submitting:</span>
            </div>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              {errors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Create Form */}
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Core Fields (7 cols) */}
            <div className="lg:col-span-7 space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h2 className="text-sm font-bold text-text-primary border-b border-border pb-3">
                Event Information
              </h2>

              {/* 1. Title */}
              <div>
                <label
                  htmlFor="event-title"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  1. Event Title <span className="text-rose-500">*</span>
                </label>
                <input
                  id="event-title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Code Sprint Hackathon"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                />
              </div>

              {/* 2. Description */}
              <div>
                <label
                  htmlFor="event-description"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  2. Event Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="event-description"
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide an overview of the event, guidelines, eligibility, and what participants can expect..."
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus resize-y"
                />
              </div>

              {/* 3. Category */}
              <div>
                <label
                  htmlFor="event-category"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  3. Event Category <span className="text-rose-500">*</span>
                </label>
                <select
                  id="event-category"
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

              {/* 4, 5, 6. Date & Times (3-col row) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label
                    htmlFor="event-date"
                    className="block text-xs font-semibold text-text-primary mb-1.5"
                  >
                    4. Event Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="event-date"
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                  />
                </div>

                <div>
                  <label
                    htmlFor="start-time"
                    className="block text-xs font-semibold text-text-primary mb-1.5"
                  >
                    5. Start Time <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="start-time"
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                  />
                </div>

                <div>
                  <label
                    htmlFor="end-time"
                    className="block text-xs font-semibold text-text-primary mb-1.5"
                  >
                    6. End Time <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="end-time"
                    type="time"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                  />
                </div>
              </div>

              {/* 7. Venue */}
              <div>
                <label
                  htmlFor="event-venue"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  7. Venue <span className="text-rose-500">*</span>
                </label>
                <input
                  id="event-venue"
                  type="text"
                  required
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. Main Auditorium / Seminar Hall B"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                />
              </div>

              {/* 8. Registration Deadline */}
              <div>
                <label
                  htmlFor="reg-deadline"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  8. Registration Deadline{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  id="reg-deadline"
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                />
                <p className="mt-1 text-xs text-text-tertiary">
                  Deadline must be before the event date
                </p>
              </div>

              {/* 9. External Registration URL */}
              <div>
                <label
                  htmlFor="reg-url"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  9. External Registration URL{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="reg-url"
                    type="url"
                    required
                    value={registrationUrl}
                    onChange={(e) => setRegistrationUrl(e.target.value)}
                    placeholder="https://forms.google.com/..."
                    className="w-full rounded-lg border border-border bg-surface pl-3 pr-9 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                  />
                  <LinkIcon className="absolute right-3 top-2.5 h-4 w-4 text-text-tertiary pointer-events-none" />
                </div>
                <p className="mt-1 text-xs text-text-tertiary">
                  Enter a valid URL (Google Forms, Unstop, Devpost, etc.)
                </p>
              </div>
            </div>

            {/* Right Column: Media & Organiser (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* 10. Event Banner Upload (matches Frame 14 SVG drag & drop box) */}
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-3">
                <label
                  htmlFor="banner-upload"
                  className="block text-xs font-semibold text-text-primary"
                >
                  10. Event Banner Upload
                </label>

                <div className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface-muted/50 p-6 text-center hover:bg-surface-muted transition-colors">
                  <UploadCloud className="h-10 w-10 text-text-tertiary mb-2" />
                  <p className="text-xs font-semibold text-text-primary">
                    Drag an image here or{" "}
                    <span className="text-primary underline cursor-pointer">
                      Browse
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-text-tertiary">
                    JPG / PNG, max 5 MB
                  </p>
                  <input
                    id="banner-upload"
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        // Demo preview banner
                        setBannerUrl(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                </div>

                {bannerUrl && (
                  <div className="rounded-lg border border-border overflow-hidden">
                    <Image
                      src={bannerUrl}
                      alt="Banner Preview"
                      width={600}
                      height={200}
                      unoptimized
                      className="h-36 w-full object-cover"
                    />
                    <div className="bg-surface p-2 text-center text-xs text-text-tertiary">
                      Banner Preview
                    </div>
                  </div>
                )}
              </div>

              {/* 11. Organiser / Club Name */}
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-3">
                <label
                  htmlFor="club-name"
                  className="block text-xs font-semibold text-text-primary"
                >
                  11. Organiser / Club Name{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  id="club-name"
                  type="text"
                  required
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  placeholder="e.g. IEEE Student Branch"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                />
              </div>
            </div>
          </div>

          {/* Form Action Buttons (matching Frame 14 SVG) */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
            {/* Submit for Approval (#313131 in SVG) */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-lg bg-[#313131] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit for Approval"}
            </button>

            {/* Save as Draft (#ffffff in SVG) */}
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-text-primary shadow-xs hover:bg-surface-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              Save as Draft
            </button>

            {/* Cancel (#ffffff in SVG) */}
            <Link
              href="/organiser/dashboard"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-4 py-3 text-sm font-semibold text-text-secondary hover:bg-surface-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </OrganiserLayout>
  );
}
