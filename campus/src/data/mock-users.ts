import type { MockUser } from "@/lib/auth/auth-types";

export const MOCK_USERS: MockUser[] = [
  {
    id: "student-001",
    name: "Rahul Sharma",
    email: "student@campusloop.com",
    password: "Student@123",
    role: "student",
    department: "Computer Science",
    collegeName: "City Engineering College",
  },
  {
    id: "organiser-001",
    name: "Priya Nair",
    email: "organiser@campusloop.com",
    password: "Organiser@123",
    role: "organiser",
    department: "Computer Science",
    collegeName: "City Engineering College",
  },
  {
    id: "admin-001",
    name: "Campus Administrator",
    email: "admin@campusloop.com",
    password: "Admin@123",
    role: "admin",
    department: "Campus Administration",
    collegeName: "City Engineering College",
  },
  // Preserved college domain aliases for existing profiles
  {
    id: "student-002",
    name: "Priya Sharma",
    email: "priya@college.edu",
    password: "Student@123",
    role: "student",
    department: "Information Technology",
    collegeName: "City Engineering College",
  },
  {
    id: "organiser-002",
    name: "Arun Kumar",
    email: "organiser@college.edu",
    password: "Organiser@123",
    role: "organiser",
    department: "School of Computing",
    collegeName: "City Engineering College",
  },
  {
    id: "admin-002",
    name: "Dr. Sunita Rao",
    email: "admin@college.edu",
    password: "Admin@123",
    role: "admin",
    department: "Student Affairs",
    collegeName: "City Engineering College",
  },
];
