import { supabase } from "@/lib/supabaseClient";
import type { Facility } from "@/lib/facility";
import { getMyFacilityId } from "@/lib/getMyFacilityId";

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
      reason: "See attached referral document.",
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

export interface DetailedReferral {
  id: string;
  referenceNumber: string;
  referralType: "digital" | "paper";
  status: string;
  submittedAt: string;
  documentPath: string | null;
  declineReason?: string | null;
  declineActionType?: string | null;
  patient?: {
    id: string;
    fullName: string;
    age?: number;
    sex?: string;
  };
  referringFacility: {
    id: string;
    name: string;
  };
  receivingFacility: {
    id: string;
    name: string;
  };
  urgencyLevel?: string;
}

export async function getReferralById(
  id: string,
): Promise<DetailedReferral | null> {
  const { data, error } = await supabase
    .from("referrals")
    .select(
      `
      id,
      reference_number,
      referral_type,
      status,
      created_at,
      document_path,
      decline_reason,
      decline_action_type,
      urgency_level,
      patient:patients (
        id,
        full_name,
        age,
        sex
      ),
      referring_facility:facility_registrations!referring_facility_id (
        id,
        facility_name
      ),
      receiving_facility:facility_registrations!receiving_facility_id (
        id,
        facility_name
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error || !data) return null;

  // Safe relation normalization to handle array or object returns
  const receiving = Array.isArray(data.receiving_facility)
    ? data.receiving_facility[0]
    : data.receiving_facility;

  const referring = Array.isArray(data.referring_facility)
    ? data.referring_facility[0]
    : data.referring_facility;

  const patient = Array.isArray(data.patient) ? data.patient[0] : data.patient;

  return {
    id: data.id,
    referenceNumber: data.reference_number,
    referralType: data.referral_type,
    status: data.status,
    submittedAt: data.created_at,
    documentPath: data.document_path,
    declineReason: data.decline_reason,
    declineActionType: data.decline_action_type,
    urgencyLevel: data.urgency_level,
    patient: patient
      ? {
          id: patient.id,
          fullName: patient.full_name,
          age: patient.age,
          sex: patient.sex,
        }
      : undefined,
    referringFacility: {
      id: referring?.id ?? "",
      name: referring?.facility_name ?? "Unknown Facility",
    },
    receivingFacility: {
      id: receiving?.id ?? "",
      name: receiving?.facility_name ?? "Unknown Facility",
    },
  };
}
