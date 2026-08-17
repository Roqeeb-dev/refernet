"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/shared/Button";
import { useDigitalReferralDraftStore } from "@/store/useDigitalReferralStore";
import { useFacility } from "@/hooks/useFacility";
import { submitDigitalReferral } from "@/services/digitalReferral.service";
import {
  getFacilityTypeLabel,
  getFacilityAvailabilityOption,
} from "@/lib/facility";

export default function ReviewConfirmPage() {
  const router = useRouter();
  const { facility: myFacility } = useFacility();

  const draftReferralId = useDigitalReferralDraftStore(
    (s) => s.draftReferralId,
  );
  const patientInfo = useDigitalReferralDraftStore((s) => s.patientInfo);
  const clinicalInfo = useDigitalReferralDraftStore((s) => s.clinicalInfo);
  const receivingFacility = useDigitalReferralDraftStore(
    (s) => s.receivingFacility,
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    useDigitalReferralDraftStore.persist.rehydrate();
  }, []);

  const ageSex =
    patientInfo.age && patientInfo.sex
      ? `${patientInfo.age} years · ${patientInfo.sex}`
      : "";

  const vitalsSummary = `BP ${clinicalInfo.vitals.bloodPressure} · HR ${clinicalInfo.vitals.heartRate} · T ${clinicalInfo.vitals.temperature}°C`;

  const reset = useDigitalReferralDraftStore((s) => s.reset);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!receivingFacility) {
      setSubmitError("Please select a receiving facility first.");
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    const { referralId, referenceNumber, error } = await submitDigitalReferral({
      patientInfo,
      clinicalInfo,
      receivingFacility,
    });

    setIsSubmitting(false);

    if (error || !referralId) {
      setSubmitError(error ?? "Something went wrong. Please try again.");
      return;
    }

    reset();

    // Redirect using the database UUID 'id' search parameter
    router.push(`/dashboard/new-referral/submitted?id=${referralId}`);
  };

  return (
    <div className="flex flex-col gap-lg rounded-2xl border border-gray-100 bg-white p-lg shadow-xs">
      <div className="rounded-xl bg-emerald-50/70 p-base">
        <h2 className="font-body text-heading-sm font-bold text-emerald-900">
          {draftReferralId ?? "—"}
        </h2>
        <p className="font-body text-caption text-emerald-700">
          Draft reference — a final reference number is assigned on submit
        </p>
      </div>

      {/* 1. Patient Information */}
      <div className="rounded-xl border border-gray-100 p-base">
        <div className="mb-md flex items-center justify-between border-b border-gray-100 pb-sm">
          <h3 className="font-body text-body-md font-bold text-text-primary">
            Patient Information
          </h3>
          <Link
            href="/dashboard/new-referral/digital-referral/patient-info"
            className="font-body text-caption font-semibold text-green-700 hover:underline"
          >
            Edit →
          </Link>
        </div>

        <div className="grid grid-cols-[120px_1fr] gap-y-xs font-body text-body-sm sm:grid-cols-[160px_1fr]">
          <span className="text-text-disabled">Full Name</span>
          <span className="font-medium text-text-primary">
            {patientInfo.fullName}
          </span>

          <span className="text-text-disabled">Age / Sex</span>
          <span className="font-medium text-text-primary">{ageSex}</span>

          <span className="text-text-disabled">Phone</span>
          <span className="font-medium text-text-primary">
            {patientInfo.phone}
          </span>

          <span className="text-text-disabled">Referred By</span>
          <span className="font-medium text-text-primary">
            {myFacility?.facility_name ?? ""}
          </span>
        </div>
      </div>

      {/* 2. Clinical Information */}
      <div className="rounded-xl border border-gray-100 p-base">
        <div className="mb-md flex items-center justify-between border-b border-gray-100 pb-sm">
          <h3 className="font-body text-body-md font-bold text-text-primary">
            Clinical Information
          </h3>
          <Link
            href="/dashboard/new-referral/digital-referral/clinical-info"
            className="font-body text-caption font-semibold text-green-700 hover:underline"
          >
            Edit →
          </Link>
        </div>

        <div className="mb-sm">
          <span className="inline-flex items-center gap-xs rounded-full bg-amber-50 px-sm py-[2px] font-body text-caption font-semibold text-amber-700 border border-amber-200">
            ● {clinicalInfo.urgencyLevel}
          </span>
        </div>

        <div className="grid grid-cols-[120px_1fr] gap-y-xs font-body text-body-sm sm:grid-cols-[160px_1fr]">
          <span className="text-text-disabled">Chief Complaint</span>
          <span className="font-medium text-text-primary">
            {clinicalInfo.chiefComplaint}
          </span>

          <span className="text-text-disabled">Diagnosis</span>
          <span className="font-medium text-text-primary">
            {clinicalInfo.provisionalDiagnosis}
          </span>

          <span className="text-text-disabled">BP / HR / Temp</span>
          <span className="font-medium text-text-primary">{vitalsSummary}</span>

          <span className="text-text-disabled">Reason</span>
          <span className="font-medium text-text-primary">
            {clinicalInfo.referralReason.reasonForReferral}
          </span>
        </div>
      </div>

      {/* 3. Receiving Facility */}
      <div className="rounded-xl border border-gray-100 p-base">
        <div className="mb-md flex items-center justify-between border-b border-gray-100 pb-sm">
          <h3 className="font-body text-body-md font-bold text-text-primary">
            Receiving Facility
          </h3>
          <Link
            href="/dashboard/new-referral/digital-referral/select-facility"
            className="font-body text-caption font-semibold text-green-700 hover:underline"
          >
            Edit →
          </Link>
        </div>

        <div className="grid grid-cols-[120px_1fr] gap-y-xs font-body text-body-sm sm:grid-cols-[160px_1fr]">
          <span className="text-text-disabled">Facility</span>
          <span className="font-medium text-text-primary">
            {receivingFacility?.name ?? ""}
          </span>

          <span className="text-text-disabled">Type</span>
          <span className="font-medium text-text-primary">
            {receivingFacility
              ? getFacilityTypeLabel(receivingFacility.type)
              : ""}
          </span>

          <span className="text-text-disabled">Location</span>
          <span className="font-medium text-text-primary">
            {receivingFacility?.address ?? ""}
          </span>

          <span className="text-text-disabled">Distance</span>
          <span className="font-medium text-text-primary">
            {receivingFacility ? `${receivingFacility.distanceKm} km` : ""}
          </span>

          <span className="text-text-disabled">Status</span>
          <span className="font-medium text-text-primary">
            {receivingFacility
              ? getFacilityAvailabilityOption(receivingFacility.status)
                  .longLabel
              : ""}
          </span>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-col gap-sm">
        {submitError && (
          <p role="alert" className="font-body text-body-sm text-emergency">
            {submitError}
          </p>
        )}
        <div className="mt-base flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              router.push(
                "/dashboard/new-referral/digital-referral/select-facility",
              )
            }
          >
            Back
          </Button>

          <Button
            type="button"
            variant="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-green-700 hover:bg-green-800"
          >
            {isSubmitting ? "Submitting..." : "Submit Referral"}
          </Button>
        </div>
      </div>
    </div>
  );
}
