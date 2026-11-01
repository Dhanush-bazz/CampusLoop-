"use client";

import {
  AlertCircle,
  Check,
  Copy,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { useAuth } from "@/context/auth-context";

export default function OrganiserLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("organiser@campusloop.com");
  const [password, setPassword] = useState("Organiser@123");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both organiser email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const user = await login(email.trim(), password);
      if (user.role !== "organiser" && user.role !== "admin") {
        setErrorMessage(
          "This account does not have organiser permissions. Please sign in through the student login.",
        );
        setIsLoading(false);
        return;
      }
      router.push("/organiser/dashboard");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Invalid organiser credentials.",
      );
      setIsLoading(false);
    }
  };

  const handleCopyCredentials = () => {
    navigator.clipboard.writeText(
      "Email: organiser@campusloop.com\nPassword: Organiser@123",
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface-muted/40">
      {/* Top Header */}
      <header className="flex h-16 w-full items-center justify-between border-b border-border bg-surface px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-md"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-black text-sm">
            CL
          </div>
          <span className="text-lg tracking-tight">CampusLoop</span>
          <span className="hidden sm:inline text-border text-lg font-light">
            |
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-md bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800 ring-1 ring-inset ring-amber-600/20">
            <Users className="h-3.5 w-3.5" />
            Organiser Portal
          </span>
        </Link>

        <div>
          <Link
            href="/login"
            className="text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors"
          >
            Student Login &rarr;
          </Link>
        </div>
      </header>

      {/* Login Card */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-[440px] rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
          {/* Card Title */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">
              Club Organiser Login
            </h1>
            <p className="mt-1 text-xs text-text-secondary">
              Authorized access for university club leads, society heads, and
              event chairs.
            </p>
          </div>

          {/* Error State Display */}
          {errorMessage && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-2.5 rounded-lg border border-rose-200 bg-rose-50/80 p-3 text-xs font-medium text-rose-900"
            >
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="organiser-email"
                className="block text-xs font-semibold text-text-primary mb-1.5"
              >
                Organiser Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="organiser-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. organiser@campusloop.com"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 pl-9 text-sm text-text-primary placeholder:text-text-disabled focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                  autoComplete="email"
                />
                <Mail className="absolute left-3 top-3 h-4 w-4 text-text-disabled" />
              </div>
            </div>

            <div>
              <label
                htmlFor="organiser-password"
                className="block text-xs font-semibold text-text-primary mb-1.5"
              >
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="organiser-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 pl-9 pr-9 text-sm text-text-primary placeholder:text-text-disabled focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                  autoComplete="current-password"
                />
                <Lock className="absolute left-3 top-3 h-4 w-4 text-text-disabled" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-text-disabled hover:text-text-primary"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-text-secondary hover:text-primary transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Access Organiser Console</span>
              )}
            </button>
          </form>

          {/* Test Credentials Card */}
          <div className="mt-6 rounded-xl border border-border bg-surface-muted/50 p-3.5 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-text-primary">
                Official Organiser Test Credentials:
              </span>
              <button
                type="button"
                onClick={handleCopyCredentials}
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-600" />
                    <span className="text-emerald-700">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="font-mono text-[11px] text-text-secondary space-y-0.5">
              <p>Email: organiser@campusloop.com</p>
              <p>Password: Organiser@123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
