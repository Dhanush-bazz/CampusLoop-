"use client";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Mail,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export default function OrganiserLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("organiser@college.edu");
  const [password, setPassword] = useState("password123");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage("Invalid email or password.");
      return;
    }

    setIsLoading(true);
    // Simulate login verification
    setTimeout(() => {
      setIsLoading(false);
      router.push("/organiser/dashboard");
    }, 400);
  };

  const handleDemoLogin = () => {
    setEmail("organiser@college.edu");
    setPassword("password123");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/organiser/dashboard");
    }, 200);
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface-muted/40">
      {/* Frame 12 Header: LOGO CampusLoop | Organiser Portal */}
      <header className="flex h-18 w-full items-center justify-between border-b border-border bg-surface px-6 sm:px-10 py-4">
        <Link
          href="/demo"
          className="flex items-center gap-2 font-bold text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-md"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-black text-sm">
            CL
          </div>
          <span className="text-lg tracking-tight">CampusLoop</span>
          <span className="text-border text-lg font-light">|</span>
          <span className="hidden items-center rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800 ring-1 ring-inset ring-amber-600/20 sm:inline-flex">
            Organiser Portal
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/demo"
            className="text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors"
          >
            Switch Role
          </Link>
        </div>
      </header>

      {/* Frame 12 Card (width 420px centred) */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-[440px] rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
          {/* Card Title */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">
              Organiser Login
            </h1>
            <p className="mt-1 text-xs text-text-secondary">
              CampusLoop Club & Society Management
            </p>
          </div>

          {/* Wireframe Info Banner (#f0f5fd fill) */}
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-blue-200 bg-[#f0f5fd] p-3.5 text-xs text-blue-900 leading-relaxed">
            <ShieldAlert className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" />
            <span>
              Development preview only. Credentials are not verified; no real
              organiser authentication is connected.
            </span>
          </div>

          {/* Wireframe Error State Display (#fff0f0 fill) */}
          {errorMessage && (
            <div
              role="alert"
              className="mb-5 flex items-center gap-2.5 rounded-lg border border-rose-200 bg-[#fff0f0] p-3 text-xs font-medium text-[#bd0a0a]"
            >
              <AlertCircle className="h-4 w-4 shrink-0 text-[#bd0a0a]" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="org-email"
                className="block text-xs font-semibold text-text-primary mb-1.5"
              >
                Organiser Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="org-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="organiser@college.edu"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                />
                <Mail className="absolute right-3 top-2.5 h-4 w-4 text-text-tertiary pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="org-password"
                  className="block text-xs font-semibold text-text-primary"
                >
                  Password <span className="text-rose-500">*</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-text-secondary hover:text-text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="org-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                />
                <Lock className="absolute right-3 top-2.5 h-4 w-4 text-text-tertiary pointer-events-none" />
              </div>
            </div>

            {/* Login Button (matches #313131 fill in SVG) */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#313131] py-3 text-sm font-semibold text-white shadow hover:bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Login"}
            </button>
          </form>

          {/* Quick Demo Access Helper */}
          <div className="mt-6 border-t border-border pt-4">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-amber-300 bg-amber-50/70 py-2.5 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition-colors"
            >
              <CheckCircle2 className="h-4 w-4 text-amber-600" />
              <span>1-Click Demo Login (IEEE Student Branch)</span>
            </button>
            <div className="mt-3 text-center">
              <Link
                href="/demo"
                className="inline-flex items-center gap-1 text-xs text-text-tertiary hover:text-text-primary"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to Demo Portals
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
