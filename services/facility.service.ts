import { supabase } from "@/lib/supabaseClient";
import type {
  Facility,
  FacilityAvailabilityStatus,
  FacilityStatus,
} from "@/lib/facility";

export type ApprovalStatus = "pending_review" | "approved" | "rejected";
export type AvailabilityStatus = FacilityAvailabilityStatus;

export interface FacilityRegistration {
  id: string;
  owner_id: string;
  facility_name: string | null;
  facility_type: string | null;
  registration_number: string | null;
  official_email: string | null;
  phone_number: string | null;
  website: string | null;
  contact_name: string | null;
  contact_role: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  street_address: string | null;
  lga: string | null;
  state: string | null;
  landmark: string | null;
  latitude: number | null;
  longitude: number | null;
  operating_hours: string | null;
  total_beds: number | null;
  icu_beds: number | null;
  staff_count: number | null;
  services: string[] | null;
  cac_certificate_path: string | null;
  operation_license_path: string | null;
  practice_certificate_path: string | null;
  status: ApprovalStatus;
  rejection_reason: string | null;
  availability_status: AvailabilityStatus;
  availability_note: string | null;
  availability_updated_at: string;
  created_at: string;
  updated_at: string;
}

interface ServiceResult<T> {
  data: T | null;
  error: string | null;
}

// Helper: Format raw DB row into Facility UI interface
function mapToFacility(item: FacilityRegistration): Facility {
  const addressParts = [item.street_address, item.lga, item.state].filter(
    Boolean,
  );

  return {
    id: item.id,
    name: item.facility_name ?? "Unknown Facility",
    type: item.facility_type ?? "General Hospital",
    address: addressParts.join(", ") || "Address unavailable",
    phone: item.phone_number ?? item.contact_phone ?? "N/A",
    status: (item.availability_status as FacilityStatus) ?? "accepting",
    distanceKm: 1.2, // Replace with dynamic distance calculation when available
    lastUpdated: item.availability_updated_at
      ? new Date(item.availability_updated_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Recently",
  };
}

export async function fetchFacilities(): Promise<ServiceResult<Facility[]>> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase
    .from("facility_registrations")
    .select("*")
    .eq("status", "approved");

  // Exclude the current user's facility if signed in
  if (user) {
    query = query.neq("owner_id", user.id);
  }

  const { data, error } = await query;

  if (error) {
    return { data: null, error: error.message };
  }

  const facilities = (data as FacilityRegistration[]).map(mapToFacility);
  return { data: facilities, error: null };
}

export async function getMyFacility(): Promise<
  ServiceResult<FacilityRegistration>
> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Not signed in." };
  }

  const { data, error } = await supabase
    .from("facility_registrations")
    .select("*")
    .eq("owner_id", user.id)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as FacilityRegistration, error: null };
}

export interface FacilityProfileUpdate {
  facility_name?: string;
  official_email?: string;
  facility_type?: string;
  phone_number?: string;
  website?: string;
  street_address?: string;
  lga?: string;
  state?: string;
  total_beds?: number;
  icu_beds?: number;
  contact_name?: string;
  contact_phone?: string;
  contact_role?: string;
  contact_email?: string;
  services?: string[];
}

export async function updateFacilityProfile(
  facilityId: string,
  updates: FacilityProfileUpdate,
): Promise<ServiceResult<FacilityRegistration>> {
  const { data, error } = await supabase
    .from("facility_registrations")
    .update(updates)
    .eq("id", facilityId)
    .select("*")
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as FacilityRegistration, error: null };
}

export async function updateFacilityAvailability(
  facilityId: string,
  availabilityStatus: AvailabilityStatus,
  note?: string,
): Promise<ServiceResult<FacilityRegistration>> {
  const { data, error } = await supabase
    .from("facility_registrations")
    .update({
      availability_status: availabilityStatus,
      availability_note: note ?? null,
      availability_updated_at: new Date().toISOString(),
    })
    .eq("id", facilityId)
    .select("*")
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as FacilityRegistration, error: null };
}

// Alias to match store calls directly
export const updateFacilityStatus = updateFacilityAvailability;
