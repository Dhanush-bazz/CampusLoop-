"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { getRoleDashboardPath } from "@/lib/auth/auth-service";
import type { UserRole } from "@/lib/auth/auth-types";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      // Role mismatch: redirect to their authorized role dashboard
      router.replace(getRoleDashboardPath(user.role));
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, router, pathname]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-border border-t-primary" />
        <p className="mt-4 text-xs font-semibold text-text-secondary tracking-wide uppercase">
          Verifying Campus Credentials...
        </p>
      </div>
    );
  }

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
