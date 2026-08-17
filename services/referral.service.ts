import { supabase } from "@/lib/supabaseClient";
import type { Facility } from "@/lib/facility";
import { getMyFacilityId } from "@/lib/getMyFacilityId";
import type { ReferralRow } from "@/components/dashboard/ReferralsTable";
import type { DetailedReferral } from "@/lib/referral-types";

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

export interface GetReferralByIdResult {
  data: DetailedReferral | null;
  error: string | null;
}

export async function getReferralById(
  id: string,
): Promise<GetReferralByIdResult> {
  const { data, error } = await supabase
    .from("referrals")
    .select(
      `
      id,
      reference_number,
      document_path,
      status,
      urgency_level,
      created_at,
      chief_complaint,
      diagnosis,
      clinical_history,
      current_medications,
      previous_medications,
      interventions,
      reason_for_referral,
      additional_notes,
      bp,
      hr,
      temp,
      rr,
      spo2,
      patients!patient_id (
        full_name,
        age,
        sex,
        phone,
        nhia_number
      ),
      referring_facility:facility_registrations!referring_facility_id (
        facility_name,
        phone_number
      ),
      receiving_facility:facility_registrations!receiving_facility_id (
        facility_name,
        phone_number
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    return {
      data: null,
      error: error?.message ?? "Referral not found.",
    };
  }

  const patient = Array.isArray(data.patients)
    ? data.patients[0]
    : data.patients;
  const refFacility = Array.isArray(data.referring_facility)
    ? data.referring_facility[0]
    : data.referring_facility;
  const recFacility = Array.isArray(data.receiving_facility)
    ? data.receiving_facility[0]
    : data.receiving_facility;

  const formattedData: DetailedReferral = {
    id: data.id,
    referenceNumber: data.reference_number ?? `RN-${data.id.slice(0, 4)}`,
    direction: "incoming",
    status: data.status ?? "New",
    urgency: data.urgency_level ?? "Routine",
    receivedTime: formatReceivedAt(data.created_at),

    referringFacility: {
      name: refFacility?.facility_name ?? "Unknown Facility",
      phone: refFacility?.phone_number ?? "N/A",
    },
    receivingFacility: {
      name: recFacility?.facility_name ?? "Unknown Facility",
      phone: recFacility?.phone_number ?? "N/A",
    },

    patient: {
      fullName: patient?.full_name ?? "Unknown Patient",
      age: `${patient?.age ?? 0} years`,
      sex: formatGender(patient?.sex),
      phone: patient?.phone ?? "N/A",
      nhiaNumber: patient?.nhia_number ?? "N/A",
    },

    clinical: {
      chiefComplaint: data.chief_complaint ?? "",
      diagnosis: data.diagnosis ?? "",
      clinicalHistory: data.clinical_history ?? "",
      vitals: {
        bp: data.bp ?? "--",
        hr: data.hr ?? "--",
        temp: data.temp ?? "--",
        rr: data.rr ?? "--",
        spO2: data.spo2 ?? "--",
      },
      currentMeds: data.current_medications ?? "",
      previousMeds: data.previous_medications ?? "",
      interventions: data.interventions ?? "",
      reasonForReferral: data.reason_for_referral ?? "",
      additionalNotes: data.additional_notes ?? "",
    },

    attachments: data.document_path
      ? [{ name: "Document Attachment", url: data.document_path }]
      : [],

    timeline: [
      {
        title: "Sent by referring facility",
        time: formatReceivedAt(data.created_at),
        status: "completed",
      },
    ],
  };

  return { data: formattedData, error: null };
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
  if (!sex) return "Male";
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

export interface AcceptReferralResult {
  data: DetailedReferral | null;
  error: string | null;
}

export async function acceptReferral(
  referralId: string,
): Promise<AcceptReferralResult> {
  const { error } = await supabase
    .from("referrals")
    .update({ status: "accepted" })
    .eq("id", referralId);

  if (error) {
    return { data: null, error: error.message };
  }

  // Refetch and return updated detailed referral object
  return getReferralById(referralId);
}

export interface DeclineReferralResult {
  data: DetailedReferral | null;
  error: string | null;
}

export async function declineReferral(
  referralId: string,
  reason: string,
  actionType: "return" | "re-refer",
  targetFacilityId?: string,
): Promise<DeclineReferralResult> {
  const updatePayload: Record<string, any> = {
    status: "declined",
    decline_reason: reason,
    decline_action_type: actionType,
  };

  // If re-referring to a new facility, update the receiving facility pointer
  if (actionType === "re-refer" && targetFacilityId) {
    updatePayload.receiving_facility_id = targetFacilityId;
    updatePayload.status = "pending"; // Reset status to pending for the new facility
  }

  const { error } = await supabase
    .from("referrals")
    .update(updatePayload)
    .eq("id", referralId);

  if (error) {
    return { data: null, error: error.message };
  }

  // Refetch and return updated detailed referral object
  return getReferralById(referralId);
}
