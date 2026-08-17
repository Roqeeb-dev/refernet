import { supabase } from "@/lib/supabaseClient";

export async function getMyFacilityId(): Promise<{
  facilityId: string | null;
  error: string | null;
}> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { facilityId: null, error: "You must be signed in." };
  }

  const { data, error } = await supabase
    .from("facility_registrations")
    .select("id")
    .eq("owner_id", user.id)
    .single();

  if (error || !data) {
    return { facilityId: null, error: error?.message ?? "Facility not found." };
  }

  return { facilityId: data.id, error: null };
}
