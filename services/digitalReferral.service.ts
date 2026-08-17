import { supabase } from "@/lib/supabaseClient";
import type { Facility } from "@/lib/facility";
import { createPatient, type PatientSex } from "@/services/patient.service";
import { getMyFacilityId } from "@/lib/getMyFacilityId";
import type {
  PatientInfoDraft,
  ClinicalInfoDraft,
} from "@/store/useDigitalReferralStore";

export interface SubmitDigitalReferralInput {
  patientInfo: PatientInfoDraft;
  clinicalInfo: ClinicalInfoDraft;
  receivingFacility: Facility;
}

export interface SubmitDigitalReferralResult {
  referralId: string | null;
  referenceNumber: string | null;
  error: string | null;
}

const SEX_MAP: Record<string, PatientSex> = {
  Male: "male",
  Female: "female",
};

export async function submitDigitalReferral(
  input: SubmitDigitalReferralInput,
): Promise<SubmitDigitalReferralResult> {
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

  const { patientInfo, clinicalInfo, receivingFacility } = input;

  const { patientId, error: patientError } = await createPatient({
    fullName: patientInfo.fullName,
    age: patientInfo.age ? Number(patientInfo.age) : undefined,
    sex: patientInfo.sex ? SEX_MAP[patientInfo.sex] : undefined,
    phone: patientInfo.phone,
    email: patientInfo.email,
    insuranceStatus: patientInfo.insuranceStatus,
    enrolleeNumber: patientInfo.enrolleeNumber,
    registeredFacilityId: facilityId,
  });

  if (!patientId) {
    return {
      referralId: null,
      referenceNumber: null,
      error: patientError ?? "Could not create patient record.",
    };
  }

  const { data, error } = await supabase
    .from("referrals")
    .insert({
      referral_type: "digital",
      patient_id: patientId,
      referring_facility_id: facilityId,
      receiving_facility_id: receivingFacility.id,
      referred_by: user.id,
      status: "pending",
      reason: clinicalInfo.referralReason.reasonForReferral,
      urgency_level: clinicalInfo.urgencyLevel || null,
      chief_complaint: clinicalInfo.chiefComplaint || null,
      provisional_diagnosis: clinicalInfo.provisionalDiagnosis || null,
      clinical_history: clinicalInfo.clinicalHistory || null,
      vitals: clinicalInfo.vitals,
      current_medications: clinicalInfo.management.currentMedications || null,
      previously_administered_medications:
        clinicalInfo.management.previouslyAdministeredMedications || null,
      previous_interventions:
        clinicalInfo.management.previousInterventions || null,
      additional_notes: clinicalInfo.referralReason.additionalNotes || null,
      supporting_document_path: clinicalInfo.supportingDocumentPath || null,
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
