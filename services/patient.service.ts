import { supabase } from "@/lib/supabaseClient";

export type PatientSex = "male" | "female";

export interface CreatePatientInput {
  fullName: string;
  age?: number;
  sex?: PatientSex;
  phone?: string;
  email?: string;
  insuranceStatus?: string;
  enrolleeNumber?: string;
  registeredFacilityId: string;
}

interface CreatePatientResult {
  patientId: string | null;
  error: string | null;
}

export async function createPatient(
  input: CreatePatientInput,
): Promise<CreatePatientResult> {
  const { data, error } = await supabase
    .from("patients")
    .insert({
      full_name: input.fullName,
      age: input.age ?? null,
      sex: input.sex ?? null,
      phone: input.phone || null,
      email: input.email || null,
      insurance_status: input.insuranceStatus || null,
      enrollee_number: input.enrolleeNumber || null,
      registered_facility_id: input.registeredFacilityId,
    })
    .select("id")
    .single();

  if (error || !data) {
    return {
      patientId: null,
      error: error?.message ?? "Could not create patient record.",
    };
  }

  return { patientId: data.id, error: null };
}
