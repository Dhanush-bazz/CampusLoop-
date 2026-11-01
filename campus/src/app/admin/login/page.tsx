"use client";

import {
  AlertCircle,
  Check,
  Copy,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { useAuth } from "@/context/auth-context";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@campusloop.com");
  const [password, setPassword] = useState("Admin@123");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage("Please enter your administrator email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const user = await login(email.trim(), password);
      if (user.role !== "admin") {
        setErrorMessage(
          "Access denied. This account does not possess university administrative privileges.",
        );
        setIsLoading(false);
        return;
      }
      router.push("/admin/dashboard");
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Invalid administrator credentials.",
      );
      setIsLoading(false);
    }
  };

  const handleCopyCredentials = () => {
    navigator.clipboard.writeText(
      "Email: admin@campusloop.com\nPassword: Admin@123",
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface-muted/40">
      {/* Frame 17 Header */}
      <header className="flex h-16 w-full items-center justify-between border-b border-border bg-surface px-6 sm:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-md"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-black text-sm">
            CL
          </div>
          <span className="text-lg tracking-tight">CampusLoop</span>
          <span className="text-border text-lg font-light">|</span>
          <span className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-700 ring-1 ring-inset ring-purple-600/20">
            <ShieldCheck className="h-3.5 w-3.5" />
            Admin Console
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

      {/* Frame 17 Card */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-[440px] rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
          {/* Card Title */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">
              University Admin Login
            </h1>
            <p className="mt-1 text-xs text-text-secondary">
              Campus event approval console and institutional moderation.
            </p>
          </div>

          {/* Wireframe Info Banner */}
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-blue-200 bg-[#f0f5fd] p-3.5 text-xs text-blue-900 leading-relaxed">
            <ShieldCheck className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" />
            <span>
              Restricted access for authorized faculty, deans, and campus
              administrators.
            </span>
          </div>

          {/* Error State Display */}
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
                htmlFor="admin-email"
                className="block text-xs font-semibold text-text-primary mb-1.5"
              >
                Admin Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@campusloop.com"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 pl-9 text-sm text-text-primary placeholder:text-text-disabled focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                  autoComplete="email"
                />
                <Mail className="absolute left-3 top-3 h-4 w-4 text-text-disabled" />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold text-text-primary mb-1.5"
              >
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
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
                  <span>Verifying clearance...</span>
                </>
              ) : (
                <span>Access Admin Console</span>
              )}
            </button>
          </form>

          {/* Test Credentials Card */}
          <div className="mt-6 rounded-xl border border-border bg-surface-muted/50 p-3.5 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-text-primary">
                Authorized Admin Test Credentials:
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
              <p>Email: admin@campusloop.com</p>
              <p>Password: Admin@123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
