"use client";

import { create } from "zustand";
import {
  getMyFacility,
  updateFacilityProfile,
} from "@/services/facility.service";

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  status: "active" | "inactive";
}

interface AccountStatus {
  approvalStatus: "pending" | "approved" | "rejected";
  // TODO: no columns for these yet -- left as mock per prior decision.
  medicalLicenceNumber: string;
  medicalLicenceExpiry: string;
  medicalLicenceValid: boolean;
  dataComplianceCompliant: boolean;
}

export interface FacilityBasicDetails {
  facilityName: string;
  email: string;
  facilityType: string;
  phoneNumber: string;
  /** Read-only here — set during registration, cannot be edited from this page. */
  registrationNumber: string;
  website: string;
}

export interface FacilityLocationDetails {
  streetAddress: string;
  lga: string;
  state: string;
}

export interface FacilityCapacityDetails {
  totalBeds: number;
  icuBeds: number;
  // TODO: no columns for these yet -- edits here are LOCAL ONLY and
  // will not be persisted by saveFacilityInfo() until columns exist.
  emergencyBays: number;
  operatingTheatres: number;
}

export interface FacilityContactPerson {
  fullName: string;
  phone: string;
  role: string;
  email: string;
}

export interface FacilityInfo {
  basicDetails: FacilityBasicDetails;
  location: FacilityLocationDetails;
  capacity: FacilityCapacityDetails;
  contactPerson: FacilityContactPerson;
}

const APPROVAL_STATUS_MAP: Record<string, AccountStatus["approvalStatus"]> = {
  pending_review: "pending",
  approved: "approved",
  rejected: "rejected",
};

const EMPTY_FACILITY_INFO: FacilityInfo = {
  basicDetails: {
    facilityName: "",
    email: "",
    facilityType: "",
    phoneNumber: "",
    registrationNumber: "",
    website: "",
  },
  location: { streetAddress: "", lga: "", state: "" },
  capacity: {
    totalBeds: 0,
    icuBeds: 0,
    emergencyBays: 0,
    operatingTheatres: 0,
  },
  contactPerson: { fullName: "", phone: "", role: "", email: "" },
};

interface FacilityProfileState {
  facilityId: string | null;
  isLoading: boolean;
  loadError: string | null;

  selectedServices: string[];
  staff: StaffMember[];
  accountStatus: AccountStatus;
  facilityInfo: FacilityInfo;

  /** Call once (e.g. on the profile page's mount) to hydrate from Supabase. */
  loadFacility: () => Promise<void>;

  toggleService: (service: string) => void;
  saveServices: () => Promise<{ error: string | null }>;
  addStaff: (member: Omit<StaffMember, "id" | "status">) => void;
  toggleStaffStatus: (id: string) => void;

  setBasicDetails: (data: Partial<FacilityBasicDetails>) => void;
  setLocation: (data: Partial<FacilityLocationDetails>) => void;
  setCapacity: (data: Partial<FacilityCapacityDetails>) => void;
  setContactPerson: (data: Partial<FacilityContactPerson>) => void;
  saveFacilityInfo: () => Promise<{ error: string | null }>;
}

export const useFacilityProfileStore = create<FacilityProfileState>(
  (set, get) => ({
    facilityId: null,
    isLoading: false,
    loadError: null,

    // Staff stays mock -- no facility_staff table yet (deferred by design).
    selectedServices: [],
    staff: [
      {
        id: "1",
        name: "Dr Chukwuemeka Obi",
        role: "Medical Director",
        email: "c.obi@luth.gov.ng",
        status: "active",
      },
      {
        id: "2",
        name: "Dr Amaka Nwosu",
        role: "Head of Emergency",
        email: "a.nwosu@luth.gov.ng",
        status: "active",
      },
    ],

    accountStatus: {
      approvalStatus: "pending",
      // Mock -- no columns for these yet.
      medicalLicenceNumber: "",
      medicalLicenceExpiry: "",
      medicalLicenceValid: true,
      dataComplianceCompliant: true,
    },

    facilityInfo: EMPTY_FACILITY_INFO,

    loadFacility: async () => {
      set({ isLoading: true, loadError: null });
      const { data, error } = await getMyFacility();

      if (error || !data) {
        set({ isLoading: false, loadError: error ?? "Facility not found." });
        return;
      }

      set({
        isLoading: false,
        facilityId: data.id,
        selectedServices: data.services ?? [],
        accountStatus: {
          ...get().accountStatus,
          approvalStatus: APPROVAL_STATUS_MAP[data.status] ?? "pending",
        },
        facilityInfo: {
          basicDetails: {
            facilityName: data.facility_name ?? "",
            email: data.official_email ?? "",
            facilityType: data.facility_type ?? "",
            phoneNumber: data.phone_number ?? "",
            registrationNumber: data.registration_number ?? "",
            website: data.website ?? "",
          },
          location: {
            streetAddress: data.street_address ?? "",
            lga: data.lga ?? "",
            state: data.state ?? "",
          },
          capacity: {
            totalBeds: data.total_beds ?? 0,
            icuBeds: data.icu_beds ?? 0,
            emergencyBays: get().facilityInfo.capacity.emergencyBays,
            operatingTheatres: get().facilityInfo.capacity.operatingTheatres,
          },
          contactPerson: {
            fullName: data.contact_name ?? "",
            phone: data.contact_phone ?? "",
            role: data.contact_role ?? "",
            email: data.contact_email ?? "",
          },
        },
      });
    },

    toggleService: (service) =>
      set((state) => ({
        selectedServices: state.selectedServices.includes(service)
          ? state.selectedServices.filter((s) => s !== service)
          : [...state.selectedServices, service],
      })),

    saveServices: async () => {
      const { facilityId, selectedServices } = get();
      if (!facilityId) return { error: "Facility not loaded yet." };

      const { error } = await updateFacilityProfile(facilityId, {
        services: selectedServices,
      });
      return { error };
    },

    // Staff stays local-only/mock -- deferred by design.
    addStaff: (member) =>
      set((state) => ({
        staff: [
          ...state.staff,
          { ...member, id: crypto.randomUUID(), status: "active" },
        ],
      })),

    toggleStaffStatus: (id) =>
      set((state) => ({
        staff: state.staff.map((member) =>
          member.id === id
            ? {
                ...member,
                status: member.status === "active" ? "inactive" : "active",
              }
            : member,
        ),
      })),

    setBasicDetails: (data) =>
      set((state) => ({
        facilityInfo: {
          ...state.facilityInfo,
          basicDetails: { ...state.facilityInfo.basicDetails, ...data },
        },
      })),

    setLocation: (data) =>
      set((state) => ({
        facilityInfo: {
          ...state.facilityInfo,
          location: { ...state.facilityInfo.location, ...data },
        },
      })),

    setCapacity: (data) =>
      set((state) => ({
        facilityInfo: {
          ...state.facilityInfo,
          capacity: { ...state.facilityInfo.capacity, ...data },
        },
      })),

    setContactPerson: (data) =>
      set((state) => ({
        facilityInfo: {
          ...state.facilityInfo,
          contactPerson: { ...state.facilityInfo.contactPerson, ...data },
        },
      })),

    saveFacilityInfo: async () => {
      const { facilityId, facilityInfo } = get();
      if (!facilityId) return { error: "Facility not loaded yet." };

      const { basicDetails, location, capacity, contactPerson } = facilityInfo;

      const { error } = await updateFacilityProfile(facilityId, {
        facility_name: basicDetails.facilityName,
        official_email: basicDetails.email,
        facility_type: basicDetails.facilityType,
        phone_number: basicDetails.phoneNumber,
        website: basicDetails.website,
        street_address: location.streetAddress,
        lga: location.lga,
        state: location.state,
        total_beds: capacity.totalBeds,
        icu_beds: capacity.icuBeds,
        contact_name: contactPerson.fullName,
        contact_phone: contactPerson.phone,
        contact_role: contactPerson.role,
        contact_email: contactPerson.email,
      });

      return { error };
    },
  }),
);
