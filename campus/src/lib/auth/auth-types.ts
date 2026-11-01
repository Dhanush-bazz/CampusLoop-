export type UserRole = "student" | "organiser" | "admin";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department?: string;
  collegeName?: string;
  profileImage?: string;
}

export type AuthUser = Omit<MockUser, "password">;

export interface StudentRegistrationData {
  fullName: string;
  email: string;
  password: string;
  department?: string;
  collegeName?: string;
}

export interface StoredSession {
  userId: string;
  role: UserRole;
  email: string;
}

