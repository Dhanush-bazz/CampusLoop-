"use client";

import type React from "react";
import { createContext, useContext, useMemo } from "react";
import { useAuth } from "@/context/auth-context";
import { type OrganiserEvent, useOrganiser } from "@/context/organiser-context";
import { authService } from "@/lib/auth/auth-service";

export interface AdminProfile {
  name: string;
  email: string;
  role: string;
  profileImage?: string;
}

const DEFAULT_ADMIN_PROFILE: AdminProfile = {
  name: "Dr. Sunita Rao",
  email: "admin@college.edu",
  role: "Dean of Student Affairs / Campus Administrator",
};

interface AdminContextType {
  events: OrganiserEvent[];
  pendingEvents: OrganiserEvent[];
  approvedEvents: OrganiserEvent[];
  rejectedEvents: OrganiserEvent[];
  stats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  profile: AdminProfile;
  getEventById: (id: string) => OrganiserEvent | undefined;
  approveEvent: (id: string) => void;
  rejectEvent: (id: string, reason: string) => void;
  updateProfile: (updated: Partial<AdminProfile>) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { events, updateEvent } = useOrganiser();

  const profile = useMemo<AdminProfile>(() => {
    if (user && user.role === "admin") {
      return {
        name: user.name || DEFAULT_ADMIN_PROFILE.name,
        email: user.email || DEFAULT_ADMIN_PROFILE.email,
        role: "Campus Administrator",
        profileImage: user.profileImage || DEFAULT_ADMIN_PROFILE.profileImage,
      };
    }
    return DEFAULT_ADMIN_PROFILE;
  }, [user]);

  const updateProfile = (updated: Partial<AdminProfile>) => {
    if (user && user.role === "admin") {
      try {
        authService.updateUser(user.id, {
          name: updated.name ?? user.name,
          profileImage: updated.profileImage,
        });
      } catch (e) {
        console.error("Failed to sync admin profile", e);
      }
    }
  };

  const pendingEvents = useMemo(
    () => events.filter((e) => e.approvalStatus === "Pending"),
    [events],
  );

  const approvedEvents = useMemo(
    () => events.filter((e) => e.approvalStatus === "Approved"),
    [events],
  );

  const rejectedEvents = useMemo(
    () => events.filter((e) => e.approvalStatus === "Rejected"),
    [events],
  );

  const stats = useMemo(
    () => ({
      total: events.length,
      pending: pendingEvents.length,
      approved: approvedEvents.length,
      rejected: rejectedEvents.length,
    }),
    [
      events.length,
      pendingEvents.length,
      approvedEvents.length,
      rejectedEvents.length,
    ],
  );

  const getEventById = (id: string) => {
    return events.find((e) => e.id === id);
  };

  const approveEvent = (id: string) => {
    const today = new Date().toISOString().split("T")[0];
    updateEvent(id, {
      approvalStatus: "Approved",
      approvalDate: today,
      adminFeedback: undefined,
    });
  };

  const rejectEvent = (id: string, reason: string) => {
    updateEvent(id, {
      approvalStatus: "Rejected",
      adminFeedback: reason,
    });
  };

  return (
    <AdminContext.Provider
      value={{
        events,
        pendingEvents,
        approvedEvents,
        rejectedEvents,
        stats,
        profile,
        getEventById,
        approveEvent,
        rejectEvent,
        updateProfile,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
