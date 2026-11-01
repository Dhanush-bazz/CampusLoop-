"use client";

import { AlertCircle, CheckCircle2, Compass, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ChangeEvent, type FormEvent, useState } from "react";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import { useAuth } from "@/context/auth-context";

export default function SignUpPage() {
  const router = useRouter();
  const { registerStudent } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    collegeName: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (generalError) setGeneralError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "College email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Enter a valid college email address";
    }

    if (!formData.collegeName.trim()) {
      newErrors.collegeName = "College or university name is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    setGeneralError(null);

    try {
      await registerStudent({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        collegeName: formData.collegeName,
        department: formData.department || "Computer Science",
      });

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    } catch (err) {
      setGeneralError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please check your information.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-canvas p-4 sm:p-6 lg:p-8">
      {/* Sign-up Card matching Frame 02 (width approx 500px) */}
      <div className="w-full max-w-[500px] rounded-2xl border border-border bg-surface p-6 sm:p-10 shadow-sm">
        {/* Brand & Heading */}
        <div className="text-center mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-3 text-primary font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-md"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
              <Compass className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-text-primary">
              Campus<span className="text-primary">Loop</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Create Student Account
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary">
            Join your university hub to explore, bookmark, and register for
            campus events.
          </p>
        </div>

        {/* General Error Banner */}
        {generalError && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50/80 p-3.5 text-xs font-medium text-rose-900"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
            <p className="leading-relaxed">{generalError}</p>
          </div>
        )}

        {/* Success Banner */}
        {isSuccess && (
          <output className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-900 animate-in fade-in">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
            <span>
              Student account created successfully! Taking you to your
              dashboard...
            </span>
          </output>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            label="Full Name *"
            placeholder="e.g. Rahul Sharma"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            autoComplete="name"
          />

          <Input
            id="email"
            name="email"
            type="email"
            label="College Email *"
            placeholder="e.g. rahul@college.edu"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="collegeName"
              name="collegeName"
              type="text"
              label="College Name *"
              placeholder="e.g. City Engineering College"
              value={formData.collegeName}
              onChange={handleChange}
              error={errors.collegeName}
            />

            <Input
              id="department"
              name="department"
              type="text"
              label="Department (Optional)"
              placeholder="e.g. Computer Science"
              value={formData.department}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password (min 8 chars) *"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="new-password"
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

          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password *"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-text-tertiary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus rounded-sm"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-3">
            <Button
              type="submit"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
              disabled={isSubmitting || isSuccess}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Creating your account...</span>
                </>
              ) : (
                <span>Register</span>
              )}
            </Button>

            <p className="text-center text-xs text-text-secondary">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus rounded"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
