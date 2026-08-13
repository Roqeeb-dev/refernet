"use client";

import { create } from "zustand";

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  status: "active" | "inactive";
}

interface AccountStatus {
  approvalStatus: "pending" | "approved" | "rejected";
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

interface FacilityProfileState {
  selectedServices: string[];
  staff: StaffMember[];
  accountStatus: AccountStatus;
  facilityInfo: FacilityInfo;

  toggleService: (service: string) => void;
  saveServices: () => Promise<void>;
  addStaff: (member: Omit<StaffMember, "id" | "status">) => void;
  toggleStaffStatus: (id: string) => void;

  setBasicDetails: (data: Partial<FacilityBasicDetails>) => void;
  setLocation: (data: Partial<FacilityLocationDetails>) => void;
  setCapacity: (data: Partial<FacilityCapacityDetails>) => void;
  setContactPerson: (data: Partial<FacilityContactPerson>) => void;
  saveFacilityInfo: () => Promise<void>;
}

// TODO: this entire store is a placeholder. Once the `facilities` table
// exists in Supabase (see the earlier backend plan), replace this with a
// real fetch-on-mount + mutation hook. Consider whether this should
// eventually merge with useFacilityStatusStore into one
// useFacilityProfile() hook backed by a single facilities row, rather
// than two separate stores for different slices of the same record.
export const useFacilityProfileStore = create<FacilityProfileState>(
  (set, get) => ({
    selectedServices: [
      "Emergency Medicine",
      "Cardiology",
      "Neurology",
      "Neurosurgery",
      "Orthopaedics",
      "General Surgery",
      "Obstetrics & Gynaecology",
      "Paediatrics",
      "Neonatology",
      "Internal Medicine",
      "Nephrology",
      "Ophthalmology",
      "Oncology",
      "Haematology",
      "Radiology / Imaging",
      "Pathology / Lab",
      "Blood Bank",
      "ICU / Critical Care",
    ],

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
      {
        id: "3",
        name: "Nurse Folake Adeyemi",
        role: "Referral Coordinator",
        email: "f.adeyemi@luth.gov.ng",
        status: "active",
      },
      {
        id: "4",
        name: "Dr Ibrahim Musa",
        role: "Registrar",
        email: "i.musa@luth.gov.ng",
        status: "active",
      },
      {
        id: "5",
        name: "Mrs Grace Eze",
        role: "Administrative Officer",
        email: "g.eze@luth.gov.ng",
        status: "inactive",
      },
    ],

    accountStatus: {
      approvalStatus: "approved",
      medicalLicenceNumber: "MDCN/NG/LAG/2019/04427",
      medicalLicenceExpiry: "Dec 2026",
      medicalLicenceValid: true,
      dataComplianceCompliant: true,
    },

    facilityInfo: {
      basicDetails: {
        facilityName: "Lagos University Teaching Hospital",
        email: "info@luth.gov.ng",
        facilityType: "Teaching Hospital",
        phoneNumber: "+234 1 774 0001",
        registrationNumber: "MDC/NG/LAG/2019/04427",
        website: "www.luth.gov.ng",
      },
      location: {
        streetAddress: "1 Idi-Araba, Mushin",
        lga: "Mushin",
        state: "Lagos",
      },
      capacity: {
        totalBeds: 761,
        icuBeds: 24,
        emergencyBays: 16,
        operatingTheatres: 8,
      },
      contactPerson: {
        fullName: "Dr Chukwuemeka Obi",
        phone: "+234 803 456 7890",
        role: "Medical Director",
        email: "c.obi@luth.gov.ng",
      },
    },

    toggleService: (service) =>
      set((state) => ({
        selectedServices: state.selectedServices.includes(service)
          ? state.selectedServices.filter((s) => s !== service)
          : [...state.selectedServices, service],
      })),

    // TODO: replace with a real Supabase update once facilities exists.
    saveServices: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Saved services:", get().selectedServices);
    },

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

    // TODO: replace with a real Supabase update once facilities exists.
    saveFacilityInfo: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Saved facility info:", get().facilityInfo);
    },
  }),
);
