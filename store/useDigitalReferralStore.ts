"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Facility } from "@/lib/facility";

export type Sex = "Male" | "Female" | "Other" | "";

export interface PatientInfoDraft {
  fullName: string;
  age: string;
  sex: Sex;
  phone: string;
  email: string;
  insuranceStatus: string;
  enrolleeNumber: string;
}

export type UrgencyLevel = "Emergency" | "Critical" | "Urgent" | "Routine" | "";

export interface VitalsDraft {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  respiratoryRate: string;
  spO2: string;
  bloodSugar: string;
}

export interface ManagementDraft {
  currentMedications: string;
  previouslyAdministeredMedications: string;
  previousInterventions: string;
}

export interface ReferralReasonDraft {
  reasonForReferral: string;
  additionalNotes: string;
}

export interface ClinicalInfoDraft {
  urgencyLevel: UrgencyLevel;
  chiefComplaint: string;
  provisionalDiagnosis: string;
  clinicalHistory: string;
  vitals: VitalsDraft;
  management: ManagementDraft;
  referralReason: ReferralReasonDraft;
  supportingDocumentPath: string;
}

const INITIAL_PATIENT_INFO: PatientInfoDraft = {
  fullName: "",
  age: "",
  sex: "",
  phone: "",
  email: "",
  insuranceStatus: "",
  enrolleeNumber: "",
};

const INITIAL_CLINICAL_INFO: ClinicalInfoDraft = {
  urgencyLevel: "Emergency",
  chiefComplaint: "",
  provisionalDiagnosis: "",
  clinicalHistory: "",
  vitals: {
    bloodPressure: "120/80",
    heartRate: "72",
    temperature: "37.0",
    respiratoryRate: "16",
    spO2: "98",
    bloodSugar: "5.5",
  },
  management: {
    currentMedications: "",
    previouslyAdministeredMedications: "",
    previousInterventions: "",
  },
  referralReason: {
    reasonForReferral: "",
    additionalNotes: "",
  },
  supportingDocumentPath: "",
};

interface DigitalReferralDraftState {
  draftReferralId: string | null;
  patientInfo: PatientInfoDraft;
  clinicalInfo: ClinicalInfoDraft;
  receivingFacility: Facility | null;

  ensureDraftId: () => void;

  setPatientInfo: (data: Partial<PatientInfoDraft>) => void;

  setClinicalInfoField: (
    data: Partial<
      Omit<ClinicalInfoDraft, "vitals" | "management" | "referralReason">
    >,
  ) => void;
  setVitals: (data: Partial<VitalsDraft>) => void;
  setManagement: (data: Partial<ManagementDraft>) => void;
  setReferralReason: (data: Partial<ReferralReasonDraft>) => void;
  setSupportingDocumentPath: (path: string) => void;

  setReceivingFacility: (facility: Facility) => void;

  reset: () => void;
}

export const useDigitalReferralDraftStore = create<DigitalReferralDraftState>()(
  persist(
    (set, get) => ({
      draftReferralId: null,
      patientInfo: INITIAL_PATIENT_INFO,
      clinicalInfo: INITIAL_CLINICAL_INFO,
      receivingFacility: null,

      ensureDraftId: () => {
        if (!get().draftReferralId) {
          set({ draftReferralId: crypto.randomUUID() });
        }
      },

      setPatientInfo: (data) =>
        set((state) => ({
          patientInfo: { ...state.patientInfo, ...data },
        })),

      setClinicalInfoField: (data) =>
        set((state) => ({
          clinicalInfo: { ...state.clinicalInfo, ...data },
        })),

      setVitals: (data) =>
        set((state) => ({
          clinicalInfo: {
            ...state.clinicalInfo,
            vitals: { ...state.clinicalInfo.vitals, ...data },
          },
        })),

      setManagement: (data) =>
        set((state) => ({
          clinicalInfo: {
            ...state.clinicalInfo,
            management: { ...state.clinicalInfo.management, ...data },
          },
        })),

      setReferralReason: (data) =>
        set((state) => ({
          clinicalInfo: {
            ...state.clinicalInfo,
            referralReason: {
              ...state.clinicalInfo.referralReason,
              ...data,
            },
          },
        })),

      setSupportingDocumentPath: (path) =>
        set((state) => ({
          clinicalInfo: { ...state.clinicalInfo, supportingDocumentPath: path },
        })),

      setReceivingFacility: (facility) => set({ receivingFacility: facility }),

      reset: () =>
        set({
          draftReferralId: null,
          patientInfo: INITIAL_PATIENT_INFO,
          clinicalInfo: INITIAL_CLINICAL_INFO,
          receivingFacility: null,
        }),
    }),
    {
      name: "refernet-digital-referral-draft",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    },
  ),
);
