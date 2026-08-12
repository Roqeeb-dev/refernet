"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Facility } from "@/lib/facility";

interface PaperReferralDraftState {
  draftReferralId: string | null;
  documentPath: string;
  receivingFacility: Facility | null;

  ensureDraftId: () => void;
  setDocumentPath: (path: string) => void;
  setReceivingFacility: (facility: Facility) => void;
  reset: () => void;
}

export const usePaperReferralDraftStore = create<PaperReferralDraftState>()(
  persist(
    (set, get) => ({
      draftReferralId: null,
      documentPath: "",
      receivingFacility: null,

      ensureDraftId: () => {
        if (!get().draftReferralId) {
          set({ draftReferralId: crypto.randomUUID() });
        }
      },

      setDocumentPath: (path) => set({ documentPath: path }),
      setReceivingFacility: (facility) => set({ receivingFacility: facility }),

      reset: () =>
        set({
          draftReferralId: null,
          documentPath: "",
          receivingFacility: null,
        }),
    }),
    {
      name: "refernet-paper-referral-draft",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    },
  ),
);
