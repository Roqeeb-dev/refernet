import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface BasicDetails {
  facilityName?: string;
  facilityType?: string;
  email?: string;
  phone?: string;
}

export interface LocationDetails {
  streetAddress?: string;
  lga?: string;
  state?: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
}

export interface CapacityDetails {
  operatingHours?: string;
  totalBeds?: number;
  icuBeds?: number;
  staffCount?: number;
}

export interface ServicesDetails {
  services?: string[];
}

export interface DocumentsDetails {
  cacCertificateUrl?: string;
  operationLicenseUrl?: string;
  practiceCertificateUrl?: string;
}

interface RegistrationState {
  basicDetails: BasicDetails;
  location: LocationDetails;
  capacity: CapacityDetails;
  services: ServicesDetails;
  documents: DocumentsDetails;

  highestStepCompleted: number;

  setBasicDetails: (data: Partial<BasicDetails>) => void;
  setLocation: (data: Partial<LocationDetails>) => void;
  setCapacity: (data: Partial<CapacityDetails>) => void;
  setServices: (data: Partial<ServicesDetails>) => void;
  setDocuments: (data: Partial<DocumentsDetails>) => void;
  completeStep: (step: number) => void;
  reset: () => void;
}

const initialState = {
  basicDetails: {},
  location: {},
  capacity: {},
  services: {},
  documents: {},
  highestStepCompleted: 0,
};

export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set) => ({
      ...initialState,

      setBasicDetails: (data) =>
        set((state) => ({
          basicDetails: { ...state.basicDetails, ...data },
        })),

      setLocation: (data) =>
        set((state) => ({
          location: { ...state.location, ...data },
        })),

      setCapacity: (data) =>
        set((state) => ({
          capacity: { ...state.capacity, ...data },
        })),

      setServices: (data) =>
        set((state) => ({
          services: { ...state.services, ...data },
        })),

      setDocuments: (data) =>
        set((state) => ({
          documents: { ...state.documents, ...data },
        })),

      completeStep: (step) =>
        set((state) => ({
          highestStepCompleted: Math.max(state.highestStepCompleted, step),
        })),

      reset: () => set(initialState),
    }),
    {
      name: "refernet-registration",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    },
  ),
);
