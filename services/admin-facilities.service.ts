import { supabase } from "@/lib/supabaseClient";

export type FacilityStatus =
  | "pending_review"
  | "approved"
  | "rejected"
  | "suspended";

export interface AdminFacility {
  id: string;
  name: string;
  type: string | null;
  state: string | null;
  lga: string | null;
  status: FacilityStatus;
  registeredAt: string;
  phone?: string | null;

  tier?: string | null;
  lastActive?: string | null;
  declineRate?: number | null;
}

export interface FacilityFilters {
  searchQuery?: string;
  tier?: string;
  type?: string;
  status?: string;
}

interface FacilityRegistrationRow {
  id: string;
  facility_name: string | null;
  facility_type: string | null;
  state: string | null;
  lga: string | null;
  status: string | null;
  created_at: string | null;
  phone_number: string | null;
}

function mapRow(row: FacilityRegistrationRow): AdminFacility {
  return {
    id: row.id,
    name: row.facility_name ?? "Unnamed Facility",
    type: row.facility_type,
    state: row.state,
    lga: row.lga,
    status: (row.status as FacilityStatus) ?? "pending_review",
    registeredAt: row.created_at ?? "",
    phone: row.phone_number,
    tier: null,
    lastActive: null,
    declineRate: null,
  };
}

export async function fetchAllFacilities(filters: FacilityFilters = {}) {
  try {
    let query = supabase
      .from("facility_registrations")
      .select(
        "id, facility_name, facility_type, state, lga, status, created_at, phone_number",
      );

    if (filters.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }
    if (filters.type && filters.type !== "all") {
      query = query.eq("facility_type", filters.type);
    }

    const { data, error } = await query;
    if (error) throw error;

    let results: AdminFacility[] = (data || []).map((row) =>
      mapRow(row as FacilityRegistrationRow),
    );

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      results = results.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          (f.lga ?? "").toLowerCase().includes(q) ||
          (f.state ?? "").toLowerCase().includes(q) ||
          (f.phone && f.phone.includes(q)),
      );
    }

    return { facilities: results, error: null };
  } catch (err: any) {
    return {
      facilities: [],
      error: err.message || "Failed to fetch facilities.",
    };
  }
}

export async function fetchPendingFacilities() {
  return fetchAllFacilities({ status: "pending_review" });
}

export async function toggleFacilitySuspension(
  facilityId: string,
  currentStatus: FacilityStatus,
) {
  try {
    const nextStatus: FacilityStatus =
      currentStatus === "suspended" ? "approved" : "suspended";

    const { error } = await supabase
      .from("facility_registrations")
      .update({ status: nextStatus, updated_at: new Date().toISOString() })
      .eq("id", facilityId);

    if (error) throw error;
    return { success: true, nextStatus, error: null };
  } catch (err: any) {
    return { success: false, nextStatus: currentStatus, error: err.message };
  }
}

export async function reviewFacility(
  facilityId: string,
  decision: "approved" | "rejected",
  reviewerId?: string,
  rejectionReason?: string,
) {
  try {
    const { error } = await supabase
      .from("facility_registrations")
      .update({
        status: decision,
        reviewed_at: new Date().toISOString(),
        ...(reviewerId ? { reviewed_by: reviewerId } : {}),
        ...(decision === "rejected" && rejectionReason
          ? { rejection_reason: rejectionReason }
          : {}),
      })
      .eq("id", facilityId);

    if (error) throw error;
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
