import { MOCK_USERS } from "@/data/mock-users";
import type {
  AuthUser,
  MockUser,
  StoredSession,
  StudentRegistrationData,
} from "@/lib/auth/auth-types";
import { readStoredJSON, writeStoredJSON } from "@/lib/storage";

const LOCAL_STORAGE_KEY_REGISTERED_USERS = "campusloop_registered_users_v1";
const LOCAL_STORAGE_KEY_SESSION = "campusloop_session_v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isMockUser(value: unknown): value is MockUser {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.email === "string" &&
    typeof value.password === "string" &&
    (value.role === "student" ||
      value.role === "organiser" ||
      value.role === "admin")
  );
}

function isMockUserArray(value: unknown): value is MockUser[] {
  return Array.isArray(value) && value.every(isMockUser);
}

function isStoredSession(value: unknown): value is StoredSession {
  return (
    isRecord(value) &&
    typeof value.userId === "string" &&
    typeof value.email === "string" &&
    (value.role === "student" ||
      value.role === "organiser" ||
      value.role === "admin")
  );
}

function sanitizeUser(user: MockUser): AuthUser {
  const { password: _password, ...authUser } = user;
  return authUser;
}

export class MockAuthService {
  private getRegisteredUsers(): MockUser[] {
    if (typeof window === "undefined") return [];
    return (
      readStoredJSON(LOCAL_STORAGE_KEY_REGISTERED_USERS, isMockUserArray) ?? []
    );
  }

  private saveRegisteredUsers(users: MockUser[]): void {
    if (typeof window === "undefined") return;
    writeStoredJSON(LOCAL_STORAGE_KEY_REGISTERED_USERS, users);
  }

  public getAllUsers(): MockUser[] {
    const registered = this.getRegisteredUsers();
    const registeredIds = new Set(registered.map((u) => u.id));
    const baseline = MOCK_USERS.filter((u) => !registeredIds.has(u.id));
    return [...baseline, ...registered];
  }

  public updateUser(userId: string, updates: Partial<MockUser>): AuthUser {
    const registered = this.getRegisteredUsers();
    const existingIndex = registered.findIndex((u) => u.id === userId);

    let updatedUser: MockUser;
    if (existingIndex >= 0) {
      updatedUser = {
        ...registered[existingIndex],
        ...updates,
      };
      registered[existingIndex] = updatedUser;
      this.saveRegisteredUsers(registered);
    } else {
      const mockUser = MOCK_USERS.find((u) => u.id === userId);
      if (!mockUser) {
        throw new Error(`User with ID ${userId} not found.`);
      }
      updatedUser = {
        ...mockUser,
        ...updates,
      };
      this.saveRegisteredUsers([...registered, updatedUser]);
    }

    // If this is the active session user, update session as well
    const activeSession = this.getStoredSession();
    if (activeSession && activeSession.userId === userId) {
      this.saveSession({
        ...activeSession,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    }

    return sanitizeUser(updatedUser);
  }

  public findUserByEmail(email: string): MockUser | undefined {
    const normalized = email.trim().toLowerCase();
    return this.getAllUsers().find(
      (u) => u.email.trim().toLowerCase() === normalized,
    );
  }

  public findUserById(id: string): MockUser | undefined {
    return this.getAllUsers().find((u) => u.id === id);
  }

  public async authenticate(
    email: string,
    password: string,
  ): Promise<AuthUser> {
    // Artificial small delay for realistic UX feedback
    await new Promise((resolve) => setTimeout(resolve, 350));

    const user = this.findUserByEmail(email);
    if (!user) {
      throw new Error("No account found with this email address.");
    }

    if (user.password !== password) {
      throw new Error("Invalid password. Please check your credentials.");
    }

    const authUser = sanitizeUser(user);
    this.saveSession({
      userId: authUser.id,
      email: authUser.email,
      role: authUser.role,
    });

    return authUser;
  }

  public async registerStudent(
    data: StudentRegistrationData,
  ): Promise<AuthUser> {
    await new Promise((resolve) => setTimeout(resolve, 350));

    const existing = this.findUserByEmail(data.email);
    if (existing) {
      throw new Error("An account with this email address already exists.");
    }

    const newUser: MockUser = {
      id: `student-${Date.now()}`,
      name: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
      role: "student",
      department: data.department?.trim() || "General Engineering",
      collegeName: data.collegeName?.trim() || "Campus University",
    };

    const currentRegistered = this.getRegisteredUsers();
    this.saveRegisteredUsers([...currentRegistered, newUser]);

    const authUser = sanitizeUser(newUser);
    this.saveSession({
      userId: authUser.id,
      email: authUser.email,
      role: authUser.role,
    });

    return authUser;
  }

  public getStoredSession(): StoredSession | null {
    if (typeof window === "undefined") return null;
    return readStoredJSON(LOCAL_STORAGE_KEY_SESSION, isStoredSession) ?? null;
  }

  public saveSession(session: StoredSession): void {
    if (typeof window === "undefined") return;
    writeStoredJSON(LOCAL_STORAGE_KEY_SESSION, session);
  }

  public clearSession(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY_SESSION);
    } catch (e) {
      console.error("Unable to clear session storage", e);
    }
  }

  public resolveCurrentSessionUser(): AuthUser | null {
    const session = this.getStoredSession();
    if (!session) return null;

    const user = this.findUserById(session.userId);
    if (!user) {
      this.clearSession();
      return null;
    }

    return sanitizeUser(user);
  }
}

export const mockAuthService = new MockAuthService();
