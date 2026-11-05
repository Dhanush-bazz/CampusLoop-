"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import {
  type EventApprovalStatus,
  INITIAL_EVENTS,
  normalizeEvent,
  type OrganiserEvent,
} from "@/data/events";
import { authService } from "@/lib/auth/auth-service";
import {
  readStoredJSON,
  removeStoredValues,
  writeStoredJSON,
} from "@/lib/storage";

export type { EventApprovalStatus, OrganiserEvent };

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

const LOCAL_STORAGE_KEY_EVENTS = "campusloop_events_v1";
const LEGACY_STORAGE_KEY_EVENTS = "campusloop_organiser_events_v1";
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

function isEvent(value: unknown): value is OrganiserEvent {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.category === "string" &&
    typeof value.date === "string" &&
    (value.approvalStatus === "Approved" ||
      value.approvalStatus === "Pending" ||
      value.approvalStatus === "Rejected" ||
      value.approvalStatus === "Draft")
  );
}

function isEventArray(value: unknown): value is OrganiserEvent[] {
  return Array.isArray(value) && value.every(isEvent);
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
  const [events, setEvents] = useState<OrganiserEvent[]>(INITIAL_EVENTS);
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

  // Hydrate events and profile from localStorage (with legacy migration fallback)
  useEffect(() => {
    const savedEvents = readStoredJSON(LOCAL_STORAGE_KEY_EVENTS, isEventArray);

    if (savedEvents && savedEvents.length > 0) {
      // Normalize any older records that might be missing aliases
      const normalized = savedEvents.map((e) => normalizeEvent(e));
      setEvents(normalized);
    } else {
      // Check if there was an older legacy store
      const legacyEvents = readStoredJSON(
        LEGACY_STORAGE_KEY_EVENTS,
        isEventArray,
      );
      if (legacyEvents && legacyEvents.length > 0) {
        // Merge legacy user-created events with INITIAL_EVENTS
        const customCreated = legacyEvents.filter(
          (e) =>
            e.id.startsWith("org-event-") &&
            !INITIAL_EVENTS.some((init) => init.id === e.id),
        );
        const merged = [
          ...customCreated.map((e) => normalizeEvent(e)),
          ...INITIAL_EVENTS,
        ];
        setEvents(merged);
        writeStoredJSON(LOCAL_STORAGE_KEY_EVENTS, merged);
      } else {
        setEvents(INITIAL_EVENTS);
      }
    }

    const savedProfile = readStoredJSON(
      LOCAL_STORAGE_KEY_PROFILE,
      isOrganiserProfile,
    );
    if (savedProfile) setProfile(savedProfile);

    setIsHydrated(true);
  }, []);

  // Persist events whenever they change after initial hydration
  useEffect(() => {
    if (!isHydrated) return;
    writeStoredJSON(LOCAL_STORAGE_KEY_EVENTS, events);
  }, [events, isHydrated]);

  // Persist profile
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

    const newEvent = normalizeEvent({
      ...eventData,
      id: `org-event-${Date.now()}`,
      organiserEmail: eventData.organiserEmail || defaultEmail,
      submissionDate: today,
      approvalStatus: isDraft ? "Draft" : "Pending",
      adminFeedback: undefined,
      approvalDate: undefined,
    });

    setEvents((prev) => [newEvent, ...prev]);
    return newEvent;
  };

  const updateEvent = (id: string, updates: Partial<OrganiserEvent>) => {
    setEvents((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return normalizeEvent({
          ...item,
          ...updates,
          id: item.id, // strictly preserve ID
        });
      }),
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
    setEvents(INITIAL_EVENTS);
    setProfile(DEFAULT_ORGANISER_PROFILE);
    removeStoredValues([
      LOCAL_STORAGE_KEY_EVENTS,
      LEGACY_STORAGE_KEY_EVENTS,
      LOCAL_STORAGE_KEY_PROFILE,
    ]);
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
