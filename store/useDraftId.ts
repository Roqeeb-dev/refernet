"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PaperReferralDraftState {
  draftReferralId: string | null;
  documentPath: string;

  ensureDraftId: () => void;
  setDocumentPath: (path: string) => void;
  reset: () => void;
}

export const usePaperReferralDraftStore = create<PaperReferralDraftState>()(
  persist(
    (set, get) => ({
      draftReferralId: null,
      documentPath: "",

      ensureDraftId: () => {
        if (!get().draftReferralId) {
          set({ draftReferralId: crypto.randomUUID() });
        }
      },

      setDocumentPath: (path) => set({ documentPath: path }),

      reset: () => set({ draftReferralId: null, documentPath: "" }),
    }),
    {
      name: "refernet-paper-referral-draft",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    },
  ),
);
