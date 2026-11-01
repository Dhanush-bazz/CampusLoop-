"use client";

import Link from "next/link";
import { type ChangeEvent, type FormEvent, useState } from "react";
import Button from "@/components/common/button";
import Input from "@/components/common/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsSubmitted(false);
    if (error) {
      setError(undefined);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError("This field is required");
      return;
    }

    if (!emailRegex.test(email.trim())) {
      setError("Enter a valid college email address");
      return;
    }

    // Valid submission: simulated success state matching Frame 04
    setError(undefined);
    setIsSubmitted(true);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-canvas p-4 sm:p-6 lg:p-8">
      {/* Forgot Password Card matching Frame 04 (approx 500px wide) */}
      <div className="w-full max-w-[500px] rounded-xl border border-border bg-surface p-6 shadow-xs sm:p-10">
        {/* Title */}
        <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          Forgot Password
        </h1>

        {/* Supporting Text */}
        <p className="mt-2 text-sm text-text-secondary">
          Enter your college email and we&apos;ll send you a link to reset your
          password.
        </p>

        {/* Form Fields */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-5"
          noValidate
        >
          {/* College Email */}
          <Input
            id="email"
            name="email"
            type="email"
            label="College Email *"
            placeholder="College Email"
            value={email}
            onChange={handleChange}
            error={error}
          />

          {/* Action Button: Send Reset Link */}
          <div className="pt-1">
            <Button type="submit" size="lg" className="w-full">
              Send Reset Link
            </Button>
          </div>
        </form>

        {/* Success Confirmation Banner */}
        {isSubmitted && (
          <output className="mt-6 block rounded-lg border border-blue-200 bg-blue-50 p-4 text-center text-xs font-semibold text-blue-900 leading-relaxed">
            For this campus installation, standard test credentials can be
            accessed directly on the login page:
            <br />
            <strong>Student:</strong> Student@123 &bull;{" "}
            <strong>Organiser:</strong> Organiser@123 &bull;{" "}
            <strong>Admin:</strong> Admin@123
          </output>
        )}

        {/* Back to Login Link */}
        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="text-sm font-bold text-text-primary hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
