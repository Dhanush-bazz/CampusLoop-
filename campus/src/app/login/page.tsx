"use client";

import {
  AlertCircle,
  Check,
  Compass,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  Shield,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type ChangeEvent, type FormEvent, Suspense, useState } from "react";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import { useAuth } from "@/context/auth-context";
import { getRoleDashboardPath } from "@/lib/auth/auth-service";

const SAMPLE_CREDENTIALS = [
  {
    roleLabel: "Student Account",
    roleIcon: User,
    email: "student@campusloop.com",
    pass: "Student@123",
    badge: "Student Portal",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    roleLabel: "Organiser Account",
    roleIcon: Users,
    email: "organiser@campusloop.com",
    pass: "Organiser@123",
    badge: "Club & Society",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    roleLabel: "Administrator Account",
    roleIcon: Shield,
    email: "admin@campusloop.com",
    pass: "Admin@123",
    badge: "University Moderation",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
];

function LoginFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect");
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (generalError) {
      setGeneralError(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors: { email?: string; password?: string } = {};

    const emailTrimmed = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailTrimmed) {
      errors.email = "Please enter your campus email address";
    } else if (!emailRegex.test(emailTrimmed)) {
      errors.email = "Please enter a valid email format";
    }

    if (!formData.password) {
      errors.password = "Please enter your password";
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    setGeneralError(null);

    try {
      const user = await login(emailTrimmed, formData.password);
      if (redirectTarget?.startsWith("/") && !redirectTarget.startsWith("//")) {
        router.push(redirectTarget);
      } else {
        router.push(getRoleDashboardPath(user.role));
      }
    } catch (err) {
      setGeneralError(
        err instanceof Error
          ? err.message
          : "Invalid email or password. Please try again.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-canvas p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-[520px] rounded-2xl border border-border bg-surface p-6 sm:p-10 shadow-sm">
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-xs mb-3">
            <Compass className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Sign in to CampusLoop
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Access your campus events, club activities, and moderation console.
          </p>
        </div>

        {/* General Error Banner */}
        {generalError && (
          <div
            role="alert"
            className="mt-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50/80 p-3.5 text-xs font-medium text-rose-900"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
            <p className="leading-relaxed">{generalError}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          {/* Email Field */}
          <div>
            <Input
              id="email"
              name="email"
              type="email"
              label="Campus Email Address *"
              placeholder="e.g. student@campusloop.com"
              value={formData.email}
              onChange={handleChange}
              error={fieldErrors.email}
              autoComplete="email"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password *"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                error={fieldErrors.password}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-text-tertiary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus rounded-sm"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="flex justify-end pt-1">
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-text-secondary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus rounded"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-3">
            <Button
              type="submit"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </Button>

            <Link
              href="/signup"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text-primary hover:bg-surface-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              Create Student Account
            </Link>
          </div>
        </form>

        {/* Test Accounts Reference Card (Requirement 2) */}
        <div className="mt-8 rounded-xl border border-border bg-surface-muted/50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <KeyRound className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Predefined Test Accounts
            </span>
          </div>

          <p className="text-xs text-text-secondary mb-3 leading-relaxed">
            Copy credentials below to sign in as Student, Organiser, or Admin:
          </p>

          <div className="space-y-2.5">
            {SAMPLE_CREDENTIALS.map((acc, index) => {
              const Icon = acc.roleIcon;
              const isEmailCopied = copiedKey === `${index}-email`;
              const isPassCopied = copiedKey === `${index}-pass`;

              return (
                <div
                  key={acc.email}
                  className="rounded-lg border border-border/80 bg-surface p-2.5 text-xs shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-text-primary">
                      <Icon className="h-3.5 w-3.5 text-text-secondary" />
                      <span>{acc.roleLabel}</span>
                    </div>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-semibold border ${acc.badgeColor}`}
                    >
                      {acc.badge}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-[11px] text-text-secondary">
                    <button
                      type="button"
                      onClick={() => handleCopy(acc.email, `${index}-email`)}
                      className="flex items-center justify-between rounded bg-surface-muted px-2 py-1 hover:bg-surface-hover text-left transition-colors"
                      title="Click to copy email"
                    >
                      <span className="truncate mr-1">{acc.email}</span>
                      {isEmailCopied ? (
                        <Check className="h-3 w-3 text-emerald-600 shrink-0" />
                      ) : (
                        <Copy className="h-3 w-3 text-text-disabled shrink-0" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopy(acc.pass, `${index}-pass`)}
                      className="flex items-center justify-between rounded bg-surface-muted px-2 py-1 hover:bg-surface-hover text-left transition-colors"
                      title="Click to copy password"
                    >
                      <span className="truncate mr-1">{acc.pass}</span>
                      {isPassCopied ? (
                        <Check className="h-3 w-3 text-emerald-600 shrink-0" />
                      ) : (
                        <Copy className="h-3 w-3 text-text-disabled shrink-0" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dedicated Portal Links */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-text-secondary">
          <Link
            href="/organiser/login"
            className="hover:text-primary transition-colors"
          >
            Organiser Portal Login &rarr;
          </Link>
          <span className="text-border">|</span>
          <Link
            href="/admin/login"
            className="hover:text-primary transition-colors"
          >
            Admin Console Login &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-border border-t-primary" />
        </div>
      }
    >
      <LoginFormInner />
    </Suspense>
  );
}
