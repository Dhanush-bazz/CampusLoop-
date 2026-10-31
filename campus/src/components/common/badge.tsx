import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "success" | "warning" | "danger" | "info";
};

export default function Badge({
  children,
  variant = "default",
  className = "",
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-surface-muted text-text-secondary border-border/40",
    success: "bg-emerald-50 text-success border-emerald-200",
    warning: "bg-amber-50 text-warning border-amber-200",
    danger: "bg-rose-50 text-danger border-rose-200",
    info: "bg-blue-50 text-primary border-blue-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
