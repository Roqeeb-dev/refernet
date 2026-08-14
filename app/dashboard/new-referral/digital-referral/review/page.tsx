"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/shared/Button";

// Object interface mirroring full referral payload
export interface ReviewReferralData {
  referenceNumber: string;
  patientInfo: {
    fullName: string;
    ageSex: string;
    phone: string;
    referredBy: string;
  };
  clinicalInfo: {
    urgencyLevel: "Emergency" | "Critical" | "Urgent" | "Routine";
    chiefComplaint: string;
    diagnosis: string;
    vitalsSummary: string;
    reason: string;
  };
  receivingFacility: {
    facility: string;
    type: string;
    location: string;
    distance: string;
    status: string;
  };
}

const INITIAL_REVIEW_DATA: ReviewReferralData = {
  referenceNumber: "RN-4864",
  patientInfo: {
    fullName: "Babalola Zainab",
    ageSex: "46 years · Female",
    phone: "09122084459",
    referredBy: "Lagos University Teaching Hospital",
  },
  clinicalInfo: {
    urgencyLevel: "Urgent",
    chiefComplaint: "Chest Pain",
    diagnosis: "Myocardial Infarction",
    vitalsSummary: "BP 120/80 · HR 88 · T 36.8°C",
    reason: "Surgical Intervention",
  },
  receivingFacility: {
    facility: "Lagos Island General Hospital",
    type: "General Hospital",
    location: "Lagos Island, Lagos",
    distance: "2.3 km",
    status: "Accepting",
  },
};

export default function ReviewConfirmPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data] = useState<ReviewReferralData>(INITIAL_REVIEW_DATA);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Wire up API call here using `data`
      console.log("Submitting referral payload:", data);

      // Navigate on success
      router.push("/dashboard/referrals");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-lg rounded-2xl border border-gray-100 bg-white p-lg shadow-xs">
      {/* Auto-generated Reference Banner */}
      <div className="rounded-xl bg-emerald-50/70 p-base">
        <h2 className="font-body text-heading-sm font-bold text-emerald-900">
          {data.referenceNumber}
        </h2>
        <p className="font-body text-caption text-emerald-700">
          Auto-generated reference number
        </p>
      </div>

      {/* 1. Patient Information */}
      <div className="rounded-xl border border-gray-100 p-base">
        <div className="mb-md flex items-center justify-between border-b border-gray-100 pb-sm">
          <h3 className="font-body text-body-md font-bold text-text-primary">
            Patient Information
          </h3>
          <Link
            href="/new-referral/digital/patient-info"
            className="font-body text-caption font-semibold text-green-700 hover:underline"
          >
            Edit →
          </Link>
        </div>

        <div className="grid grid-cols-[120px_1fr] gap-y-xs font-body text-body-sm sm:grid-cols-[160px_1fr]">
          <span className="text-text-disabled">Full Name</span>
          <span className="font-medium text-text-primary">
            {data.patientInfo.fullName}
          </span>

          <span className="text-text-disabled">Age / Sex</span>
          <span className="font-medium text-text-primary">
            {data.patientInfo.ageSex}
          </span>

          <span className="text-text-disabled">Phone</span>
          <span className="font-medium text-text-primary">
            {data.patientInfo.phone}
          </span>

          <span className="text-text-disabled">Referred By</span>
          <span className="font-medium text-text-primary">
            {data.patientInfo.referredBy}
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
            href="/new-referral/digital/clinical-info"
            className="font-body text-caption font-semibold text-green-700 hover:underline"
          >
            Edit →
          </Link>
        </div>

        {/* Urgency Badge */}
        <div className="mb-sm">
          <span className="inline-flex items-center gap-xs rounded-full bg-amber-50 px-sm py-[2px] font-body text-caption font-semibold text-amber-700 border border-amber-200">
            ● {data.clinicalInfo.urgencyLevel}
          </span>
        </div>

        <div className="grid grid-cols-[120px_1fr] gap-y-xs font-body text-body-sm sm:grid-cols-[160px_1fr]">
          <span className="text-text-disabled">Chief Complaint</span>
          <span className="font-medium text-text-primary">
            {data.clinicalInfo.chiefComplaint}
          </span>

          <span className="text-text-disabled">Diagnosis</span>
          <span className="font-medium text-text-primary">
            {data.clinicalInfo.diagnosis}
          </span>

          <span className="text-text-disabled">BP / HR / Temp</span>
          <span className="font-medium text-text-primary">
            {data.clinicalInfo.vitalsSummary}
          </span>

          <span className="text-text-disabled">Reason</span>
          <span className="font-medium text-text-primary">
            {data.clinicalInfo.reason}
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
            href="/new-referral/digital/select-facility"
            className="font-body text-caption font-semibold text-green-700 hover:underline"
          >
            Edit →
          </Link>
        </div>

        <div className="grid grid-cols-[120px_1fr] gap-y-xs font-body text-body-sm sm:grid-cols-[160px_1fr]">
          <span className="text-text-disabled">Facility</span>
          <span className="font-medium text-text-primary">
            {data.receivingFacility.facility}
          </span>

          <span className="text-text-disabled">Type</span>
          <span className="font-medium text-text-primary">
            {data.receivingFacility.type}
          </span>

          <span className="text-text-disabled">Location</span>
          <span className="font-medium text-text-primary">
            {data.receivingFacility.location}
          </span>

          <span className="text-text-disabled">Distance</span>
          <span className="font-medium text-text-primary">
            {data.receivingFacility.distance}
          </span>

          <span className="text-text-disabled">Status</span>
          <span className="font-medium text-text-primary">
            {data.receivingFacility.status}
          </span>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-base flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/new-referral/digital/select-facility")}
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
  );
}
