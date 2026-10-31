"use client";

import Link from "next/link";
import { type ChangeEvent, type FormEvent, useState } from "react";
import Button from "@/components/common/button";
import Input from "@/components/common/input";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    collegeName: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsSubmitted(false);

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // 1. Full Name required
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "College email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Enter a valid college email address";
    }

    // 3. College Name required
    if (!formData.collegeName.trim()) {
      newErrors.collegeName = "College name is required";
    }

    // 4. Password min 8 chars
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // 5. Confirm password match
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-canvas p-4 sm:p-6 lg:p-8">
      {/* Sign-up Card matching Frame 02 (width approx 500px) */}
      <div className="w-full max-w-[500px] rounded-xl border border-border bg-surface p-6 shadow-xs sm:p-10">
        {/* Heading */}
        <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          Create your student account
        </h1>

        {/* Supporting Text */}
        <p className="mt-2 text-sm text-text-secondary">
          Use your college email to join CampusLoop
        </p>

        {/* Success Message Banner */}
        {isSubmitted && (
          <output className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm font-medium text-amber-900">
            Your details passed local validation. This preview does not create
            accounts or send email.
          </output>
        )}

        {/* Form Fields */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-5"
          noValidate
        >
          {/* Full Name */}
          <Input
            id="fullName"
            name="fullName"
            label="Full Name *"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />

          {/* College Email */}
          <Input
            id="email"
            name="email"
            type="email"
            label="College Email *"
            hint="(e.g. name@college.edu)"
            placeholder="name@college.edu"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          {/* College Name */}
          <Input
            id="collegeName"
            name="collegeName"
            label="College Name *"
            placeholder="College Name"
            value={formData.collegeName}
            onChange={handleChange}
            error={errors.collegeName}
          />

          {/* Password */}
          <Input
            id="password"
            name="password"
            type="password"
            label="Password *"
            hint="(min 8 characters)"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          {/* Confirm Password */}
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password *"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          {/* Create Account Action */}
          <div className="mt-2 pt-2">
            <Button type="submit" size="lg" className="w-full">
              Create Account
            </Button>
          </div>
        </form>

        {/* Footer Text / Login Link */}
        <p className="mt-6 text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
