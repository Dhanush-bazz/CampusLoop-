import type { InputHTMLAttributes } from "react";
import { useId } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export default function Input({
  label,
  error,
  hint,
  id,
  type = "text",
  className = "",
  disabled,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  const ariaDescribedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className={`text-sm font-medium ${
            disabled ? "text-text-disabled" : "text-text-primary"
          }`}
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={ariaDescribedBy}
        className={`w-full rounded-lg border bg-surface px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-text-disabled focus:border-focus focus:ring-2 focus:ring-focus/20 disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-text-disabled ${
          error
            ? "border-danger focus:border-danger focus:ring-danger/20"
            : "border-border"
        } ${className}`}
        {...props}
      />

      {error && (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      )}

      {hint && (
        <p id={hintId} className="text-sm text-text-secondary">
          {hint}
        </p>
      )}
    </div>
  );
}
