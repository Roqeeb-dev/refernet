"use client";

import { create } from "zustand";
import type { FacilityAvailabilityStatus } from "@/lib/facility";

interface FacilityStatusState {
  status: FacilityAvailabilityStatus;
  lastUpdated: string;
  setStatus: (status: FacilityAvailabilityStatus) => void;
}

export const useFacilityStatusStore = create<FacilityStatusState>((set) => ({
  status: "accepting",
  lastUpdated: "13:08",
  setStatus: (status) =>
    set({
      status,
      lastUpdated: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }),
}));
