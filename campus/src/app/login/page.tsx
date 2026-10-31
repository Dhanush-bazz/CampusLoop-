"use client";

import Link from "next/link";
import { type ChangeEvent, type FormEvent, useState } from "react";
import Button from "@/components/common/button";
import Input from "@/components/common/input";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [authError, setAuthError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-level error as user edits
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Clear top error banner when user edits any field
    if (authError) {
      setAuthError("");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors: { email?: string; password?: string } = {};

    // Validate College Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "This field is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Enter a valid college email address";
    }

    // Validate Password
    if (!formData.password) {
      errors.password = "This field is required";
    }

    setFieldErrors(errors);

    // If there are validation errors, clear the top banner
    if (Object.keys(errors).length > 0) {
      setAuthError("");
      return;
    }

    // Prototype behavior: Since there is no backend authentication yet,
    // valid format inputs simulate the wireframe error banner.
    setAuthError("Invalid email or password.");
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-canvas p-4 sm:p-6 lg:p-8">
      {/* Login Card matching Frame 03 (approx 500px wide) */}
      <div className="w-full max-w-[500px] rounded-xl border border-border bg-surface p-6 shadow-xs sm:p-10">
        {/* Title */}
        <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          Student Login
        </h1>

        {/* Error Banner matching Frame 03 */}
        {authError && (
          <div
            role="alert"
            className="mt-6 flex items-center justify-center rounded-lg border border-danger/30 bg-rose-50 px-4 py-3 text-center text-sm font-medium text-danger"
          >
            {authError}
          </div>
        )}

        {/* Form Fields */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-5"
          noValidate
        >
          {/* 1. College Email */}
          <Input
            id="email"
            name="email"
            type="email"
            label="College Email *"
            placeholder="College Email"
            value={formData.email}
            onChange={handleChange}
            error={fieldErrors.email}
          />

          {/* 2. Password with Forgot Password row below */}
          <div className="flex flex-col gap-1.5">
            <Input
              id="password"
              name="password"
              type="password"
              label="Password *"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              error={fieldErrors.password}
            />

            {/* Row below password: field error on left (handled by Input), Forgot Password on right */}
            <div className="flex justify-end pt-0.5">
              <Link
                href="/forgot-password"
                className="text-sm font-bold text-text-primary hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col gap-3">
            {/* Primary Action: Login */}
            <Button type="submit" size="lg" className="w-full">
              Login
            </Button>

            {/* Secondary Action: Create an Account */}
            <Link href="/signup" className="w-full">
              <Button variant="outline" size="lg" className="w-full">
                Create an Account
              </Button>
            </Link>
          </div>
        </form>

        {/* Bottom Text from Frame 03 */}
        <p className="mt-8 text-center text-xs text-text-secondary sm:text-sm">
          Organiser or Admin? Use the separate portal login
        </p>
      </div>
    </div>
  );
}
