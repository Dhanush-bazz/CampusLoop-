"use client";

import { Check, Edit3, LogOut, X } from "lucide-react";
import { useState } from "react";
import StudentLayout from "@/components/layout/student-layout";
import { useAuth } from "@/context/auth-context";
import { useStudent } from "@/context/student-context";

export default function StudentProfilePage() {
  const { logout } = useAuth();
  const { profile, updateProfile } = useStudent();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(profile.fullName);
  const [collegeName, setCollegeName] = useState(profile.collegeName);
  const [errorName, setErrorName] = useState("");
  const [errorCollege, setErrorCollege] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const initials = profile.fullName
    ? profile.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "PS";

  const handleStartEdit = () => {
    setFullName(profile.fullName);
    setCollegeName(profile.collegeName);
    setErrorName("");
    setErrorCollege("");
    setIsEditing(true);
    setSaveSuccess(false);
  };

  const handleCancel = () => {
    setFullName(profile.fullName);
    setCollegeName(profile.collegeName);
    setErrorName("");
    setErrorCollege("");
    setIsEditing(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!fullName.trim()) {
      setErrorName("Full Name is required.");
      hasError = true;
    } else {
      setErrorName("");
    }

    if (!collegeName.trim()) {
      setErrorCollege("College Name is required.");
      hasError = true;
    } else {
      setErrorCollege("");
    }

    if (hasError) return;

    updateProfile({
      fullName: fullName.trim(),
      collegeName: collegeName.trim(),
    });

    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  return (
    <StudentLayout>
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Title matching Frame 11 */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            My Profile
          </h1>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <output
            className="flex items-center justify-between rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-success"
            aria-live="polite"
          >
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0" />
              <span>Profile updated successfully!</span>
            </div>
            <button
              type="button"
              onClick={() => setSaveSuccess(false)}
              className="text-success hover:opacity-75"
              aria-label="Dismiss message"
            >
              <X className="h-4 w-4" />
            </button>
          </output>
        )}

        {/* Profile Card matching Frame 11 */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            {/* Student Photo Circle matching Frame 11 */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-border bg-surface-muted text-xl font-bold text-text-primary shadow-xs">
                <span>{initials}</span>
              </div>
              <span className="text-xs font-medium text-text-secondary">
                Photo
              </span>
            </div>

            {/* Profile Fields matching Frame 11 */}
            <form onSubmit={handleSave} className="flex-1 space-y-5">
              {/* 1. Full Name */}
              <div>
                <label
                  htmlFor="profile-fullname"
                  className="block text-sm font-semibold text-text-primary mb-1.5"
                >
                  Full Name
                </label>
                {isEditing ? (
                  <div>
                    <input
                      id="profile-fullname"
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errorName) setErrorName("");
                      }}
                      className="h-12 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-text-primary focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus"
                    />
                    {errorName && (
                      <p className="mt-1 text-xs text-danger">{errorName}</p>
                    )}
                  </div>
                ) : (
                  <div className="flex h-12 items-center rounded-lg border border-border bg-surface px-4 text-sm font-medium text-text-primary">
                    {profile.fullName}
                  </div>
                )}
              </div>

              {/* 2. College Email: not editable */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    id="profile-email-label"
                    className="block text-sm font-semibold text-text-primary"
                  >
                    College Email
                  </span>
                  <span className="text-xs text-text-secondary">
                    (not editable)
                  </span>
                </div>
                <input
                  id="profile-email"
                  type="email"
                  readOnly
                  aria-labelledby="profile-email-label"
                  className="flex h-12 items-center rounded-lg border border-border bg-surface-muted px-4 text-sm text-text-secondary select-all"
                  value={profile.email}
                />
              </div>

              {/* 3. College Name */}
              <div>
                <label
                  htmlFor="profile-collegename"
                  className="block text-sm font-semibold text-text-primary mb-1.5"
                >
                  College Name
                </label>
                {isEditing ? (
                  <div>
                    <input
                      id="profile-collegename"
                      type="text"
                      value={collegeName}
                      onChange={(e) => {
                        setCollegeName(e.target.value);
                        if (errorCollege) setErrorCollege("");
                      }}
                      className="h-12 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-text-primary focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus"
                    />
                    {errorCollege && (
                      <p className="mt-1 text-xs text-danger">{errorCollege}</p>
                    )}
                  </div>
                ) : (
                  <div className="flex h-12 items-center rounded-lg border border-border bg-surface px-4 text-sm font-medium text-text-primary">
                    {profile.collegeName}
                  </div>
                )}
              </div>

              {/* Action Buttons matching Frame 11: [ Edit Profile ] [ Save Changes ] [ Cancel ] */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3 border-t border-border">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={handleStartEdit}
                    className="inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  >
                    <Edit3 className="h-4 w-4" aria-hidden="true" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>

              {/* Logout Button matching Frame 11 fill="#fff0f0" */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-danger/30 bg-[#fff0f0] px-5 text-sm font-medium text-danger transition-colors hover:bg-danger hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  <span>Sign Out</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
