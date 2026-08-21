import { supabase } from "@/lib/supabaseClient";
export interface AdminFacility {
  id: string;
  name: string;
  type: string;
  state: string;
  lga: string;
  tier: "Tier 1" | "Tier 2 — Verified" | "Tier 3 — MoH";
  registeredAt: string;
  status: "Active" | "Pending" | "Suspended";
  lastActive: string | null;
  declineRate: number | null;
  phone?: string;
}

export interface FacilityFilters {
  searchQuery?: string;
  tier?: string;
  type?: string;
  status?: string;
}

export async function fetchAllFacilities(filters: FacilityFilters = {}) {
  try {
    let query = supabase.from("facilities").select("*");

    if (filters.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }
    if (filters.tier && filters.tier !== "all") {
      query = query.eq("tier", filters.tier);
    }
    if (filters.type && filters.type !== "all") {
      query = query.eq("type", filters.type);
    }

    const { data, error } = await query;
    if (error) throw error;

    let results: AdminFacility[] = data || [];

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      results = results.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.lga.toLowerCase().includes(q) ||
          f.state.toLowerCase().includes(q) ||
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

export async function toggleFacilitySuspension(
  facilityId: string,
  currentStatus: string,
) {
  try {
    const nextStatus = currentStatus === "Suspended" ? "Active" : "Suspended";
    const { error } = await supabase
      .from("facilities")
      .update({ status: nextStatus })
      .eq("id", facilityId);

    if (error) throw error;
    return { success: true, nextStatus, error: null };
  } catch (err: any) {
    return { success: false, nextStatus: currentStatus, error: err.message };
  }
}
