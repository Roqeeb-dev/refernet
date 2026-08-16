import { supabase } from "@/lib/supabaseClient";

export type ApprovalStatus = "pending_review" | "approved" | "rejected";
export type AvailabilityStatus =
  | "accepting"
  | "limited"
  | "emergency_only"
  | "unavailable";

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
    })
    .eq("id", facilityId)
    .select("*")
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as FacilityRegistration, error: null };
}
