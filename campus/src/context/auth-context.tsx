"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { authService } from "@/lib/auth/auth-service";
import type { AuthUser, StudentRegistrationData } from "@/lib/auth/auth-types";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  registerStudent: (data: StudentRegistrationData) => Promise<AuthUser>;
  updateUserProfile: (updates: Partial<AuthUser>) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore authenticated session on client mount
  useEffect(() => {
    try {
      const activeUser = authService.resolveCurrentSessionUser();
      if (activeUser) {
        setUser(activeUser);
      }
    } catch (e) {
      console.error("Failed to restore auth session:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthUser> => {
      const authenticatedUser = await authService.authenticate(email, password);
      setUser(authenticatedUser);
      return authenticatedUser;
    },
    [],
  );

  const registerStudent = useCallback(
    async (data: StudentRegistrationData): Promise<AuthUser> => {
      const registeredUser = await authService.registerStudent(data);
      setUser(registeredUser);
      return registeredUser;
    },
    [],
  );

  const updateUserProfile = useCallback(
    async (updates: Partial<AuthUser>): Promise<AuthUser> => {
      if (!user) throw new Error("No authenticated user to update.");
      const updated = authService.updateUser(user.id, updates);
      setUser(updated);
      return updated;
    },
    [user],
  );

  const logout = useCallback(() => {
    authService.clearSession();
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        registerStudent,
        updateUserProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
