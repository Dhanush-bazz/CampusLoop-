/**
 * CampusLoop Authentication Service Interface
 *
 * This file acts as the abstraction layer separating UI authentication calls
 * from the underlying mock auth implementation. In future development phases,
 * a real OAuth/JWT backend provider can implement this interface without
 * modifying UI components or context consumers.
 */

import type {
  AuthUser,
  StudentRegistrationData,
  UserRole,
} from "@/lib/auth/auth-types";
import { mockAuthService } from "@/lib/auth/mock-auth-service";

export interface IAuthService {
  authenticate(email: string, password: string): Promise<AuthUser>;
  registerStudent(data: StudentRegistrationData): Promise<AuthUser>;
  resolveCurrentSessionUser(): AuthUser | null;
  clearSession(): void;
}

// Current MVP uses mockAuthService
export const authService: IAuthService = mockAuthService;

export function getRoleDashboardPath(role: UserRole): string {
  switch (role) {
    case "student":
      return "/dashboard";
    case "organiser":
      return "/organiser/dashboard";
    case "admin":
      return "/admin/dashboard";
  }
}

