"use client";

import {
  AlertCircle,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  GraduationCap,
  Info,
  ShieldCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface PortalOption {
  id: "student" | "organiser" | "admin";
  name: string;
  role: string;
  description: string;
  icon: typeof GraduationCap;
  status: "available" | "in_development";
  statusText: string;
  targetHref: string;
  screens: string[];
  underDevNote?: string;
}

const PORTALS: PortalOption[] = [
  {
    id: "student",
    name: "Student Demo",
    role: "Priya Sharma (Student)",
    description:
      "Explore campus events, browse categories, bookmark activities, manage registrations, set event reminders, and view profile.",
    icon: GraduationCap,
    status: "available",
    statusText: "Ready for Preview • 7 Screens",
    targetHref: "/dashboard",
    screens: [
      "Student Dashboard (/dashboard)",
      "Explore Events (/explore)",
      "Event Details (/events/[id])",
      "Bookmarked Events (/bookmarks)",
      "My Registrations (/registrations)",
      "My Reminders (/reminders)",
      "Student Profile (/profile)",
    ],
  },
  {
    id: "organiser",
    name: "Organiser Demo",
    role: "Arun Kumar (IEEE Club Lead)",
    description:
      "Submit and manage campus events, track review status (pending, approved, rejected), and manage event details.",
    icon: Briefcase,
    status: "available",
    statusText: "Ready for Preview • 7 Screens",
    targetHref: "/organiser/dashboard",
    screens: [
      "Organiser Login (/organiser/login)",
      "Organiser Dashboard (/organiser/dashboard)",
      "My Events (/organiser/events)",
      "Create Event Form (/organiser/events/create)",
      "Edit Event Form (/organiser/events/[id]/edit)",
      "Event Status & Details (/organiser/events/[id])",
      "Organiser Profile (/organiser/profile)",
    ],
  },
  {
    id: "admin",
    name: "Admin Demo",
    role: "Faculty / University Administrator",
    description:
      "Review pending event submissions from student clubs, approve or reject events with feedback, and manage campus approvals.",
    icon: ShieldCheck,
    status: "in_development",
    statusText: "Not Implemented",
    targetHref: "/admin/dashboard",
    screens: [
      "Admin Login (Frame 17)",
      "Admin Dashboard (Frame 18)",
      "Pending Events Queue (Frame 19)",
      "Event Approval Review (Frame 20)",
      "Approved Events Directory (Frame 21)",
      "Rejected Events Audit (Frame 22)",
    ],
    underDevNote:
      "Admin screens are present in the wireframe but are not implemented yet. This preview does not include admin routes or event moderation.",
  },
];

export default function DemoPortalPage() {
  const [activeModal, setActiveModal] = useState<PortalOption | null>(null);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-canvas py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl w-full space-y-10">
        {/* 1. Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-800">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Development Preview</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            CampusLoop Demo Portals
          </h1>

          <p className="mx-auto max-w-2xl text-base text-text-secondary sm:text-lg">
            Preview and inspect the role-based interfaces of CampusLoop without
            requiring backend authentication. Select a portal below to enter.
          </p>
        </div>

        {/* 2. Three Portals Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PORTALS.map((portal) => {
            const Icon = portal.icon;
            const isAvailable = portal.status === "available";

            return (
              <div
                key={portal.id}
                className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 sm:p-7 shadow-xs transition-shadow hover:shadow-md"
              >
                <div className="space-y-5">
                  {/* Icon & Status Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-muted text-primary">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        isAvailable
                          ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border border-border bg-surface-muted text-text-secondary"
                      }`}
                    >
                      {isAvailable ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Clock className="h-3.5 w-3.5 text-text-disabled" />
                      )}
                      <span>{portal.statusText}</span>
                    </span>
                  </div>

                  {/* Portal Title & Role */}
                  <div>
                    <h2 className="text-xl font-bold text-text-primary">
                      {portal.name}
                    </h2>
                    <p className="text-xs font-medium text-text-secondary">
                      Preview Role: {portal.role}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {portal.description}
                  </p>

                  {/* Implemented/Planned Screens */}
                  <div className="space-y-2 border-t border-border pt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                      {isAvailable
                        ? "Implemented Screens:"
                        : "Planned Screens:"}
                    </span>
                    <ul className="space-y-1 text-xs text-text-secondary">
                      {portal.screens.map((screen) => (
                        <li key={screen} className="flex items-center gap-1.5">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isAvailable
                                ? "bg-emerald-500"
                                : "bg-text-disabled"
                            }`}
                          />
                          <span>{screen}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Enter Demo Action Button */}
                <div className="pt-6 border-t border-border mt-6">
                  {isAvailable ? (
                    <Link
                      href={portal.targetHref}
                      className="inline-flex w-full h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-hover shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                    >
                      <span>Enter {portal.name}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveModal(portal)}
                      className="inline-flex w-full h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface-muted px-4 text-sm font-semibold text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                    >
                      <span>Under Development</span>
                      <Info className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Quick Links & Safety Notice */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 shrink-0 text-text-secondary mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-text-primary">
                Demo Mode Notice & Quick Access
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                This selector allows fast navigation between frontend interfaces
                during development. Local storage preserves dummy data changes
                (bookmarks, registrations, reminders, profile) without requiring
                backend credentials.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-border text-xs">
            <span className="font-semibold text-text-primary">
              Public Pages:
            </span>
            <Link href="/" className="text-primary hover:underline font-medium">
              Landing Page (/)
            </Link>
            <span className="text-border">•</span>
            <Link
              href="/signup"
              className="text-primary hover:underline font-medium"
            >
              Student Sign-up (/signup)
            </Link>
            <span className="text-border">•</span>
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Student Login (/login)
            </Link>
            <span className="text-border">•</span>
            <Link
              href="/forgot-password"
              className="text-primary hover:underline font-medium"
            >
              Forgot Password (/forgot-password)
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Under Development Modal for Organiser & Admin */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dev-modal-title"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <h3
                  id="dev-modal-title"
                  className="text-lg font-bold text-text-primary"
                >
                  {activeModal.name} Under Development
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="rounded-lg p-1 text-text-secondary hover:bg-surface-muted"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm leading-relaxed text-text-secondary">
              {activeModal.underDevNote}
            </p>

            <div className="rounded-xl border border-border bg-surface-muted p-4 space-y-2">
              <span className="text-xs font-bold text-text-primary uppercase tracking-wider">
                Planned Screens for this Portal:
              </span>
              <ul className="space-y-1 text-xs text-text-secondary">
                {activeModal.screens.map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover shadow-xs"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
