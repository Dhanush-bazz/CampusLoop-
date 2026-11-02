"use client";

import {
  ArrowLeft,
  Building2,
  Camera,
  CheckCircle2,
  Mail,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import OrganiserLayout from "@/components/layout/organiser-layout";
import ProfileImageModal from "@/components/profile/profile-image-modal";
import UserAvatar from "@/components/profile/user-avatar";
import { useOrganiser } from "@/context/organiser-context";

export default function OrganiserProfilePage() {
  const { profile, updateProfile, resetDemoData } = useOrganiser();

  const [name, setName] = useState(profile.name);
  const [clubName, setClubName] = useState(profile.clubName);
  const [department, setDepartment] = useState(profile.department);
  const [isEditing, setIsEditing] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      clubName,
      department,
    });
    setIsEditing(false);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  const handleCancel = () => {
    setName(profile.name);
    setClubName(profile.clubName);
    setDepartment(profile.department);
    setIsEditing(false);
  };

  return (
    <OrganiserLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <Link
            href="/organiser/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Dashboard
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Organiser Profile
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Manage your club lead contact information and verification
              credentials.
            </p>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-primary-hover transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>

        {showSavedToast && (
          <output
            aria-live="polite"
            className="flex items-center gap-2 rounded-xl border border-[#067429] bg-[#eaf9ef] p-4 text-xs font-bold text-[#067429]"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Profile details updated successfully!</span>
          </output>
        )}

        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-5 border-b border-border pb-6">
            <div className="relative group shrink-0">
              <div className="relative flex h-18 w-18 items-center justify-center rounded-full bg-primary text-xl font-bold text-white ring-4 ring-primary/10 overflow-hidden shadow-xs">
                <UserAvatar
                  src={profile.profileImage}
                  alt={profile.name}
                  fallback={initials}
                  className="flex items-center justify-center text-xl font-bold text-white"
                />
              </div>

              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(true)}
                className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-md hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus transition-all group-hover:scale-110"
                aria-label="Change organiser photo"
                title="Change photo"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h2 className="text-lg font-bold text-text-primary">
                  {profile.name}
                </h2>
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="text-xs font-semibold text-primary hover:underline self-start sm:self-auto"
                >
                  Change Photo
                </button>
              </div>
              <p className="text-xs text-text-secondary">{profile.clubName}</p>
              <div className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/20">
                <Shield className="h-3 w-3" />
                <span>Verified Club Lead</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="org-name"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Lead Coordinator Name
                </label>
                <div className="relative">
                  <input
                    id="org-name"
                    type="text"
                    required
                    disabled={!isEditing}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary disabled:bg-surface-muted disabled:text-text-secondary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                  />
                  <User className="absolute right-3 top-2.5 h-4 w-4 text-text-tertiary pointer-events-none" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="org-email"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Organiser Email (Read-only)
                </label>
                <div className="relative">
                  <input
                    id="org-email"
                    type="email"
                    disabled
                    value={profile.email}
                    className="w-full rounded-lg border border-border bg-surface-muted px-3 py-2 text-sm text-text-secondary cursor-not-allowed"
                  />
                  <Mail className="absolute right-3 top-2.5 h-4 w-4 text-text-tertiary pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="club-name"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Club / Student Organization
                </label>
                <div className="relative">
                  <input
                    id="club-name"
                    type="text"
                    required
                    disabled={!isEditing}
                    value={clubName}
                    onChange={(e) => setClubName(e.target.value)}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary disabled:bg-surface-muted disabled:text-text-secondary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                  />
                  <Building2 className="absolute right-3 top-2.5 h-4 w-4 text-text-tertiary pointer-events-none" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="org-dept"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Department / School
                </label>
                <input
                  id="org-dept"
                  type="text"
                  required
                  disabled={!isEditing}
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary disabled:bg-surface-muted disabled:text-text-secondary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-primary-hover transition-colors"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-muted transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>

          {/* Reset Sample Data */}
          <div className="border-t border-border pt-6 mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-text-secondary">
            <span>Restore default sample events and club profile settings</span>
            <button
              type="button"
              onClick={resetDemoData}
              className="rounded-md border border-border px-3 py-1.5 font-medium hover:bg-surface-muted transition-colors w-fit"
            >
              Reset Sample Data
            </button>
          </div>
        </div>

        <ProfileImageModal
          isOpen={isPhotoModalOpen}
          onClose={() => setIsPhotoModalOpen(false)}
          currentImage={profile.profileImage}
          fallbackInitials={initials}
          onSave={(newImage) => {
            updateProfile({ profileImage: newImage });
            setShowSavedToast(true);
            setTimeout(() => setShowSavedToast(false), 3000);
          }}
          title="Update Organiser Photo"
        />
      </div>
    </OrganiserLayout>
  );
}
