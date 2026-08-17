import { supabase } from "@/lib/supabaseClient";
import type { Facility } from "@/lib/facility";
import { getMyFacilityId } from "@/lib/getMyFacilityId";
import type { ReferralRow } from "@/components/dashboard/ReferralsTable";

export interface SubmitPaperReferralInput {
  documentPath: string;
  receivingFacility: Facility;
}

export interface SubmitPaperReferralResult {
  referralId: string | null;
  referenceNumber: string | null;
  error: string | null;
}

export async function submitPaperReferral(
  input: SubmitPaperReferralInput,
): Promise<SubmitPaperReferralResult> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      referralId: null,
      referenceNumber: null,
      error: "You must be signed in to submit a referral.",
    };
  }

  const { facilityId, error: facilityError } = await getMyFacilityId();
  if (!facilityId) {
    return {
      referralId: null,
      referenceNumber: null,
      error: facilityError ?? "Could not determine your facility.",
    };
  }

  const { data, error } = await supabase
    .from("referrals")
    .insert({
      referral_type: "paper",
      document_path: input.documentPath,
      referring_facility_id: facilityId,
      receiving_facility_id: input.receivingFacility.id,
      referred_by: user.id,
      status: "pending",
    })
    .select("id, reference_number")
    .single();

  if (error || !data) {
    return {
      referralId: null,
      referenceNumber: null,
      error: error?.message ?? "Something went wrong. Please try again.",
    };
  }

  return {
    referralId: data.id,
    referenceNumber: data.reference_number,
    error: null,
  };
}

export interface ReferralDetail {
  id: string;
  referenceNumber: string;
  documentPath: string | null;
  status: string;
  submittedAt: string;
  receivingFacility: {
    id: string;
    name: string;
  };
}

export async function getReferralById(
  id: string,
): Promise<ReferralDetail | null> {
  const { data, error } = await supabase
    .from("referrals")
    .select(
      `
      id,
      reference_number,
      document_path,
      status,
      created_at,
      receiving_facility:facility_registrations!receiving_facility_id (
        id,
        facility_name
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    referenceNumber: data.reference_number,
    documentPath: data.document_path,
    status: data.status,
    submittedAt: data.created_at,
    receivingFacility: {
      id: (data.receiving_facility as any).id,
      name: (data.receiving_facility as any).facility_name,
    },
  };
}

// Map database status to table display status
function mapStatus(status: string): ReferralRow["status"] {
  switch (status?.toLowerCase()) {
    case "pending":
      return "new";
    case "accepted":
      return "accepted";
    case "completed":
      return "arrived";
    case "declined":
      return "declined";
    default:
      return (status as ReferralRow["status"]) || "new";
  }
}

// Map DB urgency strings to table urgency
function mapUrgency(urgency: string | null): ReferralRow["urgency"] {
  if (!urgency) return "routine";
  const lower = urgency.toLowerCase();
  if (lower === "emergency") return "emergency";
  if (lower === "critical") return "critical";
  if (lower === "urgent") return "urgent";
  return "routine";
}

// Helper to format timestamps relative to today
function formatReceivedAt(createdAt: string): string {
  const date = new Date(createdAt);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 3600 * 24),
  );

  const timeStr = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (diffDays === 0) return `Today, ${timeStr}`;
  if (diffDays === 1) return `Yesterday, ${timeStr}`;
  return `${diffDays} days ago`;
}

// Helper to format gender/sex field to match ReferralRow patientGender type
function formatGender(sex: string | null): "Male" | "Female" {
  if (!sex) return "Male"; // Or set your default preferred fallback
  const normalized = sex.toLowerCase();
  if (normalized === "female") return "Female";
  return "Male";
}

// Fetch Incoming Referrals where receiving_facility_id matches user's facility
export async function getIncomingReferrals(): Promise<{
  data: ReferralRow[];
  error: string | null;
}> {
  const { facilityId, error: facilityError } = await getMyFacilityId();
  if (!facilityId) {
    return {
      data: [],
      error: facilityError ?? "Could not resolve facility ID.",
    };
  }

  const { data, error } = await supabase
    .from("referrals")
    .select(
      `
      id,
      reference_number,
      status,
      urgency_level,
      created_at,
      patients!patient_id (
        full_name,
        age,
        sex
      ),
      referring_facility:facility_registrations!referring_facility_id (
        facility_name
      )
    `,
    )
    .eq("receiving_facility_id", facilityId)
    .order("created_at", { ascending: false });

  if (error) return { data: [], error: error.message };

  const rows: ReferralRow[] = (data || []).map((item: any) => ({
    id: item.id,
    reference: item.reference_number ?? `RN-${item.id.slice(0, 4)}`,
    facilityName: item.referring_facility?.facility_name ?? "Unknown Facility",
    patientName: item.patients?.full_name ?? "Unknown Patient",
    patientAge: item.patients?.age ?? 0,
    patientGender: formatGender(item.patients?.sex),
    urgency: mapUrgency(item.urgency_level),
    status: mapStatus(item.status),
    receivedAt: formatReceivedAt(item.created_at),
  }));

  return { data: rows, error: null };
}

// Fetch Outgoing Referrals where referring_facility_id matches user's facility
export async function getOutgoingReferrals(): Promise<{
  data: ReferralRow[];
  error: string | null;
}> {
  const { facilityId, error: facilityError } = await getMyFacilityId();
  if (!facilityId) {
    return {
      data: [],
      error: facilityError ?? "Could not resolve facility ID.",
    };
  }

  const { data, error } = await supabase
    .from("referrals")
    .select(
      `
      id,
      reference_number,
      status,
      urgency_level,
      created_at,
      patients!patient_id (
        full_name,
        age,
        sex
      ),
      receiving_facility:facility_registrations!receiving_facility_id (
        facility_name
      )
    `,
    )
    .eq("referring_facility_id", facilityId)
    .order("created_at", { ascending: false });

  if (error) return { data: [], error: error.message };

  const rows: ReferralRow[] = (data || []).map((item: any) => ({
    id: item.id,
    reference: item.reference_number ?? `RN-${item.id.slice(0, 4)}`,
    facilityName: item.receiving_facility?.facility_name ?? "Unknown Facility",
    patientName: item.patients?.full_name ?? "Unknown Patient",
    patientAge: item.patients?.age ?? 0,
    patientGender: formatGender(item.patients?.sex),
    urgency: mapUrgency(item.urgency_level),
    status: mapStatus(item.status),
    receivedAt: formatReceivedAt(item.created_at),
  }));

  return { data: rows, error: null };
}
