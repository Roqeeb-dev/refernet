import { supabase } from "@/lib/supabaseClient";
import type {
  BasicDetails,
  LocationDetails,
  CapacityDetails,
  ServicesDetails,
  DocumentsDetails,
} from "@/store/useRegistrationStore";

interface SubmitRegistrationInput {
  basicDetails: BasicDetails;
  location: LocationDetails;
  capacity: CapacityDetails;
  services: ServicesDetails;
  documents: DocumentsDetails;
}

interface SubmitRegistrationResult {
  error: string | null;
}

export async function submitFacilityRegistration(
  data: SubmitRegistrationInput,
): Promise<SubmitRegistrationResult> {
  const { basicDetails, location, capacity, services, documents } = data;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to submit a registration." };
  }

  const { password, confirmPassword, ...basicDetailsWithoutPassword } =
    basicDetails;

  const { error } = await supabase.from("facility_registrations").insert({
    owner_id: user.id,

    facility_name: basicDetailsWithoutPassword.facilityName,
    facility_type: basicDetailsWithoutPassword.facilityType,
    registration_number: basicDetailsWithoutPassword.registrationNumber,
    official_email: basicDetailsWithoutPassword.officialEmail,
    phone_number: basicDetailsWithoutPassword.phoneNumber,
    website: basicDetailsWithoutPassword.website,
    contact_name: basicDetailsWithoutPassword.contactName,
    contact_role: basicDetailsWithoutPassword.contactRole,
    contact_phone: basicDetailsWithoutPassword.contactPhone,
    contact_email: basicDetailsWithoutPassword.contactEmail,

    street_address: location.streetAddress,
    lga: location.lga,
    state: location.state,
    landmark: location.landmark,
    latitude: location.latitude,
    longitude: location.longitude,

    operating_hours: capacity.operatingHours,
    total_beds: capacity.totalBeds,
    icu_beds: capacity.icuBeds,
    staff_count: capacity.staffCount,

    services: services.services ?? [],

    cac_certificate_path: documents.cacCertificateUrl,
    operation_license_path: documents.operationLicenseUrl,
    practice_certificate_path: documents.practiceCertificateUrl,

    status: "pending_review",
  });

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}
