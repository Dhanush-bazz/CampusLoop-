"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "@/context/auth-context";
import {
  OrganiserContext,
  type OrganiserEvent,
} from "@/context/organiser-context";
import {
  DUMMY_EVENTS,
  EVENT_CATEGORIES,
  type Event,
  type EventCategory,
  getEventDateTimestamp,
} from "@/data/events";
import { authService } from "@/lib/auth/auth-service";
import { readStoredJSON, writeStoredJSON } from "@/lib/storage";

export interface StudentProfile {
  fullName: string;
  email: string;
  collegeName: string;
  profileImage?: string;
}

export interface RegistrationItem {
  eventId: string;
  status: "Marked as registered" | "not available";
  registeredAt?: string;
}

export interface ReminderItem {
  id: string;
  eventId: string;
  remindTiming: "1 day before" | "1 hour before" | "Custom";
  remindTarget: "Event start" | "Registration deadline";
  customDate?: string;
  customTime?: string;
  createdAt: string;
}

interface StudentContextType {
  // Profile
  profile: StudentProfile;
  updateProfile: (profile: Partial<StudentProfile>) => void;

  // Bookmarks
  bookmarkedIds: string[];
  toggleBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;

  // Registrations
  registrations: RegistrationItem[];
  markAsRegistered: (eventId: string) => void;
  removeRegistration: (eventId: string) => void;
  isRegistered: (eventId: string) => boolean;

  // Reminders
  reminders: ReminderItem[];
  addReminder: (reminder: Omit<ReminderItem, "id" | "createdAt">) => void;
  removeReminder: (id: string) => void;

  // Unified Events (Static + Approved Organiser Submissions)
  allEvents: Event[];
  getEventById: (id: string) => Event | undefined;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStudentProfile(value: unknown): value is StudentProfile {
  return (
    isRecord(value) &&
    typeof value.fullName === "string" &&
    typeof value.email === "string" &&
    typeof value.collegeName === "string" &&
    (value.profileImage === undefined || typeof value.profileImage === "string")
  );
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function isRegistrationArray(value: unknown): value is RegistrationItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        isRecord(item) &&
        typeof item.eventId === "string" &&
        (item.status === "Marked as registered" ||
          item.status === "not available") &&
        (item.registeredAt === undefined ||
          typeof item.registeredAt === "string"),
    )
  );
}

function isReminderArray(value: unknown): value is ReminderItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        isRecord(item) &&
        typeof item.id === "string" &&
        typeof item.eventId === "string" &&
        (item.remindTiming === "1 day before" ||
          item.remindTiming === "1 hour before" ||
          item.remindTiming === "Custom") &&
        (item.remindTarget === "Event start" ||
          item.remindTarget === "Registration deadline") &&
        (item.customDate === undefined ||
          typeof item.customDate === "string") &&
        (item.customTime === undefined ||
          typeof item.customTime === "string") &&
        typeof item.createdAt === "string",
    )
  );
}

// Initial demo datasets matching wireframes Frame 05, 08, 09, 10, 11
const DEFAULT_PROFILE: StudentProfile = {
  fullName: "Priya Sharma",
  email: "priya@college.edu",
  collegeName: "City Engineering College",
};

// Frame 08 specifies "3 saved events"
const INITIAL_BOOKMARKS = [
  "code-sprint-hackathon",
  "ai-ml-workshop",
  "inter-college-debate",
];

// Frame 09 demo registrations
const INITIAL_REGISTRATIONS: RegistrationItem[] = [
  { eventId: "code-sprint-hackathon", status: "Marked as registered" },
  { eventId: "inter-college-debate", status: "not available" },
];

// Frame 05 specifies "2 reminders set"
const INITIAL_REMINDERS: ReminderItem[] = [
  {
    id: "rem-1",
    eventId: "ai-ml-workshop",
    remindTiming: "1 day before",
    remindTarget: "Event start",
    createdAt: new Date().toISOString(),
  },
  {
    id: "rem-2",
    eventId: "code-sprint-hackathon",
    remindTiming: "1 hour before",
    remindTarget: "Registration deadline",
    createdAt: new Date().toISOString(),
  },
];

function mapOrganiserEventToEvent(org: OrganiserEvent): Event {
  const matchedCategory = EVENT_CATEGORIES.find(
    (c) => c.toLowerCase() === org.category.toLowerCase(),
  );

  return {
    id: org.id,
    title: org.title,
    category: (matchedCategory || "Workshop") as EventCategory,
    date: org.date,
    startTime: org.startTime,
    endTime: org.endTime,
    venue: org.venue,
    organiser: org.organiserName,
    description: org.description,
    registrationDeadline: org.registrationDeadline,
    registrationLink: org.registrationUrl,
    image: org.bannerUrl,
    featured: false,
  };
}

/**
 * Deduplication rules:
 * 1. An event is primarily identified by its unique ID.
 * 2. To prevent duplicated cards between baseline static events (DUMMY_EVENTS)
 *    and approved organiser submissions that represent the same campus event:
 *    - Compare normalized title, date, and venue.
 *    - Approved organiser events take precedence as they contain dynamic moderation metadata.
 * 3. Legitimate recurring events (different dates or different venues) produce
 *    distinct signatures and are strictly preserved.
 */
function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function isDuplicateBaselineEvent(
  base: Event,
  approvedOrgEvents: Event[],
): boolean {
  for (const org of approvedOrgEvents) {
    if (org.id === base.id) return true;

    const baseDate = getEventDateTimestamp(base.date);
    const orgDate = getEventDateTimestamp(org.date);

    if (baseDate && orgDate && baseDate === orgDate) {
      const normBaseVenue = normalizeText(base.venue);
      const normOrgVenue = normalizeText(org.venue);
      if (normBaseVenue === normOrgVenue) {
        const normBaseTitle = normalizeText(base.title);
        const normOrgTitle = normalizeText(org.title);
        if (
          normBaseTitle === normOrgTitle ||
          (normBaseTitle.includes("aiml") &&
            normOrgTitle.includes("aimachinelearning")) ||
          (normBaseTitle.includes("ai") &&
            normOrgTitle.includes("ai") &&
            normBaseTitle.includes("workshop") &&
            normOrgTitle.includes("workshop"))
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

export function StudentProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const organiserCtx = useContext(OrganiserContext);
  const organiserEvents = organiserCtx?.events ?? [];

  const allEvents = useMemo(() => {
    const approvedOrgEvents = organiserEvents
      .filter((e) => e.approvalStatus === "Approved")
      .map(mapOrganiserEventToEvent);

    const baseEvents = DUMMY_EVENTS.filter(
      (base) => !isDuplicateBaselineEvent(base, approvedOrgEvents),
    );

    return [...baseEvents, ...approvedOrgEvents];
  }, [organiserEvents]);

  const getEventById = (id: string): Event | undefined => {
    return allEvents.find((e) => e.id === id);
  };
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);

  // Sync profile when authenticated student changes
  useEffect(() => {
    if (user && user.role === "student") {
      setProfile((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
        collegeName: user.collegeName || prev.collegeName,
        profileImage: user.profileImage || prev.profileImage,
      }));
    }
  }, [user]);
  const [bookmarkedIds, setBookmarkedIds] =
    useState<string[]>(INITIAL_BOOKMARKS);
  const [registrations, setRegistrations] = useState<RegistrationItem[]>(
    INITIAL_REGISTRATIONS,
  );
  const [reminders, setReminders] = useState<ReminderItem[]>(INITIAL_REMINDERS);

  // Restore client state from localStorage
  useEffect(() => {
    const storedProfile = readStoredJSON(
      "campusloop_profile",
      isStudentProfile,
    );
    if (storedProfile) setProfile(storedProfile);

    const storedBookmarks = readStoredJSON(
      "campusloop_bookmarks",
      isStringArray,
    );
    if (storedBookmarks) setBookmarkedIds(storedBookmarks);

    const storedRegistrations = readStoredJSON(
      "campusloop_registrations",
      isRegistrationArray,
    );
    if (storedRegistrations) setRegistrations(storedRegistrations);

    const storedReminders = readStoredJSON(
      "campusloop_reminders",
      isReminderArray,
    );
    if (storedReminders) setReminders(storedReminders);
  }, []);

  // Profile operations
  const updateProfile = (updated: Partial<StudentProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updated };
      writeStoredJSON("campusloop_profile", next);
      if (user && user.role === "student") {
        try {
          authService.updateUser(user.id, {
            name: next.fullName,
            collegeName: next.collegeName,
            profileImage: next.profileImage,
          });
        } catch (e) {
          console.error("Failed to sync auth user profile", e);
        }
      }
      return next;
    });
  };

  // Bookmark operations
  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      writeStoredJSON("campusloop_bookmarks", next);
      return next;
    });
  };

  const removeBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = prev.filter((item) => item !== id);
      writeStoredJSON("campusloop_bookmarks", next);
      return next;
    });
  };

  const isBookmarked = (id: string) => bookmarkedIds.includes(id);

  // Registration operations
  const markAsRegistered = (eventId: string) => {
    setRegistrations((prev) => {
      const registeredAt = new Date().toISOString();
      const existing = prev.some((item) => item.eventId === eventId);
      const next: RegistrationItem[] = existing
        ? prev.map((item) =>
            item.eventId === eventId
              ? { ...item, status: "Marked as registered", registeredAt }
              : item,
          )
        : [
            ...prev,
            {
              eventId,
              status: "Marked as registered",
              registeredAt,
            },
          ];
      writeStoredJSON("campusloop_registrations", next);
      return next;
    });
  };

  const removeRegistration = (eventId: string) => {
    setRegistrations((prev) => {
      const next = prev.filter((r) => r.eventId !== eventId);
      writeStoredJSON("campusloop_registrations", next);
      return next;
    });
  };

  const isRegistered = (eventId: string) =>
    registrations.some(
      (item) =>
        item.eventId === eventId && item.status === "Marked as registered",
    );

  // Reminder operations
  const addReminder = (reminder: Omit<ReminderItem, "id" | "createdAt">) => {
    const newItem: ReminderItem = {
      ...reminder,
      id: `rem-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setReminders((prev) => {
      const next = [...prev, newItem];
      writeStoredJSON("campusloop_reminders", next);
      return next;
    });
  };

  const removeReminder = (id: string) => {
    setReminders((prev) => {
      const next = prev.filter((rem) => rem.id !== id);
      writeStoredJSON("campusloop_reminders", next);
      return next;
    });
  };

  return (
    <StudentContext.Provider
      value={{
        profile,
        updateProfile,
        bookmarkedIds,
        toggleBookmark,
        removeBookmark,
        isBookmarked,
        registrations,
        markAsRegistered,
        removeRegistration,
        isRegistered,
        reminders,
        addReminder,
        removeReminder,
        allEvents,
        getEventById,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
}
