"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/shared/Button";
import { usePaperReferralDraftStore } from "@/store/useDraftId";
import { submitPaperReferral } from "@/services/referral.service";
import {
  getFacilityTypeLabel,
  getFacilityAvailabilityOption,
} from "@/lib/facility";

function extractFileName(path: string): string {
  if (!path) return "No file uploaded";
  const withoutFolder = path.split("/").pop() ?? path;
  const parts = withoutFolder.split("-");
  return parts.length > 1 ? parts.slice(1).join("-") : withoutFolder;
}

function getReferenceNumber(draftId: string | null): string {
  if (!draftId) return "RN-PAPER-0000";
  return `RN-PAPER-${draftId.slice(0, 4).toUpperCase()}`;
}

export default function ReviewPage() {
  const router = useRouter();
  const draftReferralId = usePaperReferralDraftStore((s) => s.draftReferralId);
  const documentPath = usePaperReferralDraftStore((s) => s.documentPath);
  const receivingFacility = usePaperReferralDraftStore(
    (s) => s.receivingFacility,
  );
  const reset = usePaperReferralDraftStore((s) => s.reset);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isMissingDraftData = !documentPath || !receivingFacility;

  useEffect(() => {
    if (isMissingDraftData) {
      router.replace("/dashboard/new-referral/paper-bridge/upload");
    }
  }, [isMissingDraftData, router]);

  if (isMissingDraftData || !receivingFacility || !documentPath) {
    return null;
  }

  const referenceNumber = getReferenceNumber(draftReferralId);
  const fileName = extractFileName(documentPath);
  const statusOption = getFacilityAvailabilityOption(receivingFacility.status);

  async function handleSubmit() {
    if (!receivingFacility || !documentPath) return;

    setSubmitError("");
    setSubmitting(true);

    const cleanPath = documentPath.replace(/^paper-referrals\//, "");

    const { referralId, error } = await submitPaperReferral({
      documentPath: cleanPath,
      receivingFacility,
    });

    setSubmitting(false);

    if (error || !referralId) {
      setSubmitError(error ?? "Something went wrong. Please try again.");
      return;
    }

    router.push(`/dashboard/new-referral/submitted?id=${referralId}`);
    reset();
  }

  const facilityRows = [
    { label: "Facility", value: receivingFacility.name },
    { label: "Type", value: getFacilityTypeLabel(receivingFacility.type) },
    { label: "Location", value: receivingFacility.address },
    {
      label: "Distance",
      value: receivingFacility.distanceKm
        ? `${receivingFacility.distanceKm} km`
        : "—",
    },
    { label: "Status", value: statusOption.label },
  ];

  return (
    <div className="rounded-xl border border-gray-200/80 bg-white p-lg shadow-sm">
      <div className="flex flex-col gap-lg">
        {/* Reference Banner */}
        <div className="rounded-lg bg-green-50/70 p-base">
          <p className="font-display text-heading-sm font-bold text-green-950">
            {referenceNumber}
          </p>
          <p className="mt-0.5 font-body text-caption text-text-secondary">
            Auto-generated reference number
          </p>
        </div>

        {/* Paper Referral Section */}
        <div className="rounded-lg border border-gray-200/80 bg-white overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-base py-md">
            <h2 className="font-body text-body-sm font-bold text-text-primary">
              Paper Referral
            </h2>
            <Link
              href="/dashboard/new-referral/paper-bridge/upload"
              className="font-body text-caption font-semibold text-green-700 hover:underline"
            >
              Edit →
            </Link>
          </div>

          <div className="p-base">
            <div className="flex items-center gap-xl">
              <span className="w-28 shrink-0 font-body text-body-sm text-text-secondary">
                Uploaded File
              </span>
              <span className="font-body text-body-sm font-bold text-text-primary">
                {fileName}
              </span>
            </div>
            <p className="mt-base font-body text-caption text-text-secondary">
              Patient details and clinical information are contained in the
              uploaded paper referral form.
            </p>
          </div>
        </div>

        {/* Receiving Facility Section */}
        <div className="rounded-lg border border-gray-200/80 bg-white overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-base py-md">
            <h2 className="font-body text-body-sm font-bold text-text-primary">
              Receiving Facility
            </h2>
            <Link
              href="/dashboard/new-referral/paper-bridge/select-facility"
              className="font-body text-caption font-semibold text-green-700 hover:underline"
            >
              Edit →
            </Link>
          </div>

          <div className="flex flex-col gap-md p-base">
            {facilityRows.map((row) => (
              <div key={row.label} className="flex items-center gap-xl">
                <span className="w-28 shrink-0 font-body text-body-sm text-text-secondary">
                  {row.label}
                </span>
                <span className="font-body text-body-sm font-bold text-text-primary">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Error notification */}
        {submitError && (
          <p
            role="alert"
            className="font-body text-body-sm text-emergency font-medium"
          >
            {submitError}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-xs">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.back()}
            disabled={submitting}
            className="px-xl"
          >
            Back
          </Button>
          <Button
            variant="primary"
            type="button"
            disabled={submitting}
            isLoading={submitting}
            onClick={handleSubmit}
            className="px-xl bg-green-800 hover:bg-green-900"
          >
            Submit Referral
          </Button>
        </div>
      </div>
    </div>
  );
}
