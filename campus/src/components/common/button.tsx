import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-hover active:bg-primary-hover",
    secondary: "bg-accent text-white hover:opacity-90 active:opacity-100",
    outline:
      "border border-border bg-surface text-text-primary hover:bg-surface-muted active:bg-surface-muted",
    danger: "bg-danger text-white hover:opacity-90 active:opacity-100",
  };

  const sizes = {
    sm: "min-h-9 px-3 py-1.5 text-sm",
    md: "min-h-11 px-4 py-2 text-sm",
    lg: "min-h-12 px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
