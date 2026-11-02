"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { authService } from "@/lib/auth/auth-service";
import {
  readStoredJSON,
  removeStoredValues,
  writeStoredJSON,
} from "@/lib/storage";

export type EventApprovalStatus = "Approved" | "Pending" | "Rejected" | "Draft";

export interface OrganiserEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  registrationDeadline: string;
  registrationUrl: string;
  bannerUrl: string;
  organiserName: string;
  organiserEmail?: string;
  submissionDate: string;
  approvalStatus: EventApprovalStatus;
  approvalDate?: string;
  adminFeedback?: string;
}

export interface OrganiserProfile {
  name: string;
  email: string;
  clubName: string;
  department: string;
  profileImage?: string;
}

const DEFAULT_ORGANISER_PROFILE: OrganiserProfile = {
  name: "Arun Kumar",
  email: "organiser@college.edu",
  clubName: "IEEE Student Branch & Tech Club",
  department: "School of Computing",
};

const INITIAL_ORGANISER_EVENTS: OrganiserEvent[] = [
  {
    id: "org-event-1",
    title: "Code Sprint Hackathon",
    description:
      "A 24-hour build challenge where student teams collaborate and innovate to build real-world software solutions.",
    category: "Hackathon",
    date: "2026-11-18",
    startTime: "09:00",
    endTime: "21:00",
    venue: "Main Auditorium",
    registrationDeadline: "2026-11-15",
    registrationUrl: "https://forms.example/codesprint",
    bannerUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    organiserName: "IEEE Student Branch",
    organiserEmail: "ieee@college.edu",
    submissionDate: "2026-10-20",
    approvalDate: "2026-10-22",
    approvalStatus: "Approved",
  },
  {
    id: "org-event-2",
    title: "Robotics Expo",
    description:
      "Showcase of student-built autonomous bots, drones, and industrial automation prototypes with live demonstrations.",
    category: "Technical Event",
    date: "2026-11-30",
    startTime: "10:00",
    endTime: "17:00",
    venue: "Mechanical Dept Courtyard",
    registrationDeadline: "2026-11-25",
    registrationUrl: "https://forms.example/robotics-expo",
    bannerUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    organiserName: "Robotics Club",
    organiserEmail: "robotics@college.edu",
    submissionDate: "2026-10-28",
    approvalStatus: "Pending",
  },
  {
    id: "org-event-3",
    title: "Open Mic Night",
    description:
      "An acoustic evening of student singing, spoken word poetry, stand-up comedy, and musical performances.",
    category: "Cultural Event",
    date: "2026-12-02",
    startTime: "18:00",
    endTime: "21:00",
    venue: "Open Air Theatre",
    registrationDeadline: "2026-11-28",
    registrationUrl: "https://forms.example/openmic",
    bannerUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    organiserName: "Music Club",
    organiserEmail: "music@college.edu",
    submissionDate: "2026-10-25",
    approvalStatus: "Rejected",
    adminFeedback:
      "Venue booking not confirmed. Please attach approval from the facilities office.",
  },
  {
    id: "org-event-4",
    title: "AI & Machine Learning Workshop",
    description:
      "Hands-on workshop exploring prompt engineering, LLM fine-tuning, and modern AI app deployment with PyTorch.",
    category: "Workshop",
    date: "2026-11-12",
    startTime: "10:00",
    endTime: "16:00",
    venue: "Seminar Hall B",
    registrationDeadline: "2026-11-10",
    registrationUrl: "https://forms.example/aiml-workshop",
    bannerUrl:
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
    organiserName: "Coding Club",
    organiserEmail: "codingclub@college.edu",
    submissionDate: "2026-10-18",
    approvalDate: "2026-10-20",
    approvalStatus: "Approved",
  },
  {
    id: "org-event-5",
    title: "Photography Walk",
    description:
      "Golden hour photo expedition across campus botanical garden and lake. Learn manual DSLR settings, framing, and light composition.",
    category: "Club Activity",
    date: "2026-11-25",
    startTime: "16:00",
    endTime: "18:30",
    venue: "Campus Lake & Botanical Garden",
    registrationDeadline: "2026-11-23",
    registrationUrl: "https://forms.example/photowalk",
    bannerUrl:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=80",
    organiserName: "Photo Society",
    organiserEmail: "photosoc@college.edu",
    submissionDate: "2026-10-27",
    approvalStatus: "Pending",
  },
  {
    id: "org-event-6",
    title: "Startup Pitch Day",
    description:
      "Annual collegiate startup pitch competition. Pitch to angel investors and venture capitalists with seed funding awards.",
    category: "Competition",
    date: "2026-12-05",
    startTime: "09:30",
    endTime: "17:00",
    venue: "MBA Seminar Hall",
    registrationDeadline: "2026-11-30",
    registrationUrl: "https://forms.example/pitchday",
    bannerUrl:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80",
    organiserName: "E-Cell",
    organiserEmail: "ecell@college.edu",
    submissionDate: "2026-10-26",
    approvalStatus: "Pending",
  },
  {
    id: "org-event-7",
    title: "Late Night Gaming",
    description:
      "Inter-hostel LAN gaming championship featuring Valorant, FIFA, and Rocket League tournaments.",
    category: "Technical Event",
    date: "2026-11-20",
    startTime: "21:00",
    endTime: "03:00",
    venue: "Student Activity Center",
    registrationDeadline: "2026-11-18",
    registrationUrl: "https://forms.example/gamingnight",
    bannerUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    organiserName: "Gaming Society",
    organiserEmail: "gaming@college.edu",
    submissionDate: "2026-10-21",
    approvalStatus: "Rejected",
    adminFeedback: "Timing violates campus curfew policy.",
  },
];

const LOCAL_STORAGE_KEY_EVENTS = "campusloop_organiser_events_v1";
const LOCAL_STORAGE_KEY_PROFILE = "campusloop_organiser_profile_v1";

interface OrganiserContextType {
  events: OrganiserEvent[];
  profile: OrganiserProfile;
  createEvent: (
    event: Omit<OrganiserEvent, "id" | "submissionDate" | "approvalStatus">,
    isDraft?: boolean,
  ) => OrganiserEvent;
  updateEvent: (id: string, updates: Partial<OrganiserEvent>) => void;
  deleteEvent: (id: string) => void;
  getEventById: (id: string) => OrganiserEvent | undefined;
  updateProfile: (updates: Partial<OrganiserProfile>) => void;
  resetDemoData: () => void;
}

export const OrganiserContext = createContext<OrganiserContextType | undefined>(
  undefined,
);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isOrganiserEvent(value: unknown): value is OrganiserEvent {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    typeof value.category === "string" &&
    typeof value.date === "string" &&
    typeof value.startTime === "string" &&
    typeof value.endTime === "string" &&
    typeof value.venue === "string" &&
    typeof value.registrationDeadline === "string" &&
    typeof value.registrationUrl === "string" &&
    typeof value.bannerUrl === "string" &&
    typeof value.organiserName === "string" &&
    typeof value.submissionDate === "string" &&
    (value.approvalStatus === "Approved" ||
      value.approvalStatus === "Pending" ||
      value.approvalStatus === "Rejected" ||
      value.approvalStatus === "Draft") &&
    (value.adminFeedback === undefined ||
      typeof value.adminFeedback === "string")
  );
}

function isOrganiserEventArray(value: unknown): value is OrganiserEvent[] {
  return Array.isArray(value) && value.every(isOrganiserEvent);
}

function isOrganiserProfile(value: unknown): value is OrganiserProfile {
  return (
    isRecord(value) &&
    typeof value.name === "string" &&
    typeof value.email === "string" &&
    typeof value.clubName === "string" &&
    typeof value.department === "string" &&
    (value.profileImage === undefined || typeof value.profileImage === "string")
  );
}

export function OrganiserProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [events, setEvents] = useState<OrganiserEvent[]>(
    INITIAL_ORGANISER_EVENTS,
  );
  const [profile, setProfile] = useState<OrganiserProfile>(
    DEFAULT_ORGANISER_PROFILE,
  );
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (user && user.role === "organiser") {
      setProfile((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        department: user.department || prev.department,
        profileImage: user.profileImage || prev.profileImage,
      }));
    }
  }, [user]);

  useEffect(() => {
    const savedEvents = readStoredJSON(
      LOCAL_STORAGE_KEY_EVENTS,
      isOrganiserEventArray,
    );
    if (savedEvents) setEvents(savedEvents);

    const savedProfile = readStoredJSON(
      LOCAL_STORAGE_KEY_PROFILE,
      isOrganiserProfile,
    );
    if (savedProfile) setProfile(savedProfile);

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    writeStoredJSON(LOCAL_STORAGE_KEY_EVENTS, events);
  }, [events, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    writeStoredJSON(LOCAL_STORAGE_KEY_PROFILE, profile);
  }, [profile, isHydrated]);

  const createEvent = (
    eventData: Omit<OrganiserEvent, "id" | "submissionDate" | "approvalStatus">,
    isDraft = false,
  ): OrganiserEvent => {
    const today = new Date().toISOString().split("T")[0];
    const defaultEmail =
      user && user.role === "organiser" ? user.email : profile.email;
    const newEvent: OrganiserEvent = {
      organiserEmail: eventData.organiserEmail || defaultEmail,
      ...eventData,
      id: `org-event-${Date.now()}`,
      submissionDate: today,
      approvalStatus: isDraft ? "Draft" : "Pending",
    };
    setEvents((prev) => [newEvent, ...prev]);
    return newEvent;
  };

  const updateEvent = (id: string, updates: Partial<OrganiserEvent>) => {
    setEvents((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((item) => item.id !== id));
  };

  const getEventById = (id: string): OrganiserEvent | undefined => {
    return events.find((item) => item.id === id);
  };

  const updateProfile = (updates: Partial<OrganiserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      if (user && user.role === "organiser") {
        try {
          authService.updateUser(user.id, {
            name: next.name,
            department: next.department,
            profileImage: next.profileImage,
          });
        } catch (e) {
          console.error("Failed to sync auth user profile", e);
        }
      }
      return next;
    });
  };

  const resetDemoData = () => {
    setEvents(INITIAL_ORGANISER_EVENTS);
    setProfile(DEFAULT_ORGANISER_PROFILE);
    removeStoredValues([LOCAL_STORAGE_KEY_EVENTS, LOCAL_STORAGE_KEY_PROFILE]);
  };

  return (
    <OrganiserContext.Provider
      value={{
        events,
        profile,
        createEvent,
        updateEvent,
        deleteEvent,
        getEventById,
        updateProfile,
        resetDemoData,
      }}
    >
      {children}
    </OrganiserContext.Provider>
  );
}

export function useOrganiser() {
  const context = useContext(OrganiserContext);
  if (!context) {
    throw new Error("useOrganiser must be used within an OrganiserProvider");
  }
  return context;
}
