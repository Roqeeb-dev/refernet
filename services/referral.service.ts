import { supabase } from "@/lib/supabaseClient";
import type { Facility } from "@/lib/facility";

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

  const { data, error } = await supabase
    .from("referrals")
    .insert({
      referral_type: "paper",
      document_path: input.documentPath,
      referring_facility_id: user.id,
      receiving_facility_id: input.receivingFacility.id,
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
      submitted_at,
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
    submittedAt: data.submitted_at,
    receivingFacility: {
      id: (data.receiving_facility as any).id,
      name: (data.receiving_facility as any).facility_name,
    },
  };
}
