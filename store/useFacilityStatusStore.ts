"use client";

import { create } from "zustand";
import type { FacilityAvailabilityStatus } from "@/lib/facility";
import { updateFacilityStatus } from "@/services/facility.service";

interface FacilityStatusState {
  status: FacilityAvailabilityStatus;
  lastUpdated: string;
  isUpdating: boolean;
  error: string | null;
  // Synchronous local state setters
  setStatus: (status: FacilityAvailabilityStatus) => void;
  initializeStatus: (
    status: FacilityAvailabilityStatus,
    updatedAt?: string,
  ) => void;
  // Asynchronous Supabase updater
  saveStatus: (
    facilityId: string,
    newStatus: FacilityAvailabilityStatus,
  ) => Promise<{ error: string | null }>;
}

export const useFacilityStatusStore = create<FacilityStatusState>((set) => ({
  status: "accepting",
  lastUpdated: "Just now",
  isUpdating: false,
  error: null,

  setStatus: (status) =>
    set({
      status,
      lastUpdated: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }),

  initializeStatus: (status, updatedAt) =>
    set({
      status,
      lastUpdated: updatedAt
        ? new Date(updatedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
    }),

  saveStatus: async (facilityId, newStatus) => {
    set({ isUpdating: true, error: null });

    const { error } = await updateFacilityStatus(facilityId, newStatus);

    if (error) {
      set({ isUpdating: false, error });
      return { error };
    }

    const nowFormatted = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    set({
      status: newStatus,
      lastUpdated: nowFormatted,
      isUpdating: false,
      error: null,
    });

    return { error: null };
  },
}));
