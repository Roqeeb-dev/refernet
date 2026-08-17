"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/shared/Button";
import { usePaperReferralDraftStore } from "@/store/useDraftId";
import { submitPaperReferral } from "@/services/referral.service";
import type { Facility } from "@/lib/facility";

const isDev = process.env.NODE_ENV === "development";

// Ensure this UUID exists in your development facility_registrations table if testing with fallbacks
const FALLBACK_FACILITY: Facility = {
  id: "00000000-0000-0000-0000-000000000004",
  name: "Lagos Island General Hospital",
  type: "general_hospital",
  address: "Lagos Island, Lagos",
  distanceKm: 2.3,
  status: "accepting",
  updatedMinutesAgo: 2,
};

const FALLBACK_DOCUMENT_PATH =
  "dev/00000000-0000-0000-0000-000000000000-sample-referral.pdf";

function extractFileName(path: string): string {
  if (!path) return "No file uploaded";
  const withoutFolder = path.split("/").pop() ?? path;
  const parts = withoutFolder.split("-");
  return parts.length > 1 ? parts.slice(1).join("-") : withoutFolder;
}

function getReferenceNumber(draftId: string | null): string {
  if (!draftId) return isDev ? "RN-PAPER-DEV1" : "—";
  return `RN-PAPER-${draftId.slice(0, 4).toUpperCase()}`;
}

export default function ReviewPage() {
  const router = useRouter();
  const draftReferralId = usePaperReferralDraftStore((s) => s.draftReferralId);
  const storeDocumentPath = usePaperReferralDraftStore((s) => s.documentPath);
  const storeReceivingFacility = usePaperReferralDraftStore(
    (s) => s.receivingFacility,
  );
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const reset = usePaperReferralDraftStore((s) => s.reset);

  const isMissingDraftData = !storeDocumentPath || !storeReceivingFacility;
  const usingFallback = isDev && isMissingDraftData;

  useEffect(() => {
    if (!isDev && isMissingDraftData) {
      router.replace("/dashboard/new-referral/paper-bridge/upload");
    }
  }, [isMissingDraftData, router]);

  const documentPath =
    storeDocumentPath || (isDev ? FALLBACK_DOCUMENT_PATH : "");

  const receivingFacility: Facility | null =
    storeReceivingFacility || (isDev ? FALLBACK_FACILITY : null);

  if (!documentPath || !receivingFacility) return null;

  const referenceNumber = getReferenceNumber(draftReferralId);
  const fileName = extractFileName(documentPath);

  async function handleSubmit() {
    if (!receivingFacility) return;

    setSubmitError("");
    setSubmitting(true);

    // Strip leading bucket name if accidentally present in store
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

    reset();
    router.push(`/dashboard/new-referral/submitted?id=${referralId}`);
  }

  const facilityRows = [
    { label: "Facility", value: receivingFacility.name },
    { label: "Type", value: receivingFacility.type },
    { label: "Location", value: receivingFacility.address },
    {
      label: "Distance",
      value: receivingFacility.distanceKm
        ? `${receivingFacility.distanceKm} km`
        : "—",
    },
    { label: "Status", value: receivingFacility.status ?? "—" },
  ];

  return (
    <div className="flex flex-col gap-base">
      {usingFallback && (
        <div className="rounded-lg border border-paper/30 bg-paper-light p-sm">
          <p className="font-body text-caption font-semibold text-paper">
            Dev mode: showing fallback data — the draft store is empty. Complete
            Upload + Select Facility to see real data here.
          </p>
        </div>
      )}

      {/* Reference number */}
      <div className="rounded-lg border border-green-100 bg-green-50 p-base">
        <p className="font-display text-heading-md font-bold text-green-900">
          {referenceNumber}
        </p>
        <p className="font-body text-caption text-text-secondary">
          Auto-generated reference number
        </p>
      </div>

      {/* Paper Referral */}
      <div className="rounded-lg border border-gray-100 bg-white p-base">
        <div className="mb-base flex items-center justify-between">
          <h2 className="font-body text-body-sm font-semibold text-text-primary">
            Paper Referral
          </h2>
          <Link
            href="/dashboard/new-referral/paper-bridge/upload"
            className="font-body text-caption font-semibold text-green-700 hover:underline"
          >
            Edit →
          </Link>
        </div>

        <div className="flex items-center justify-between gap-base">
          <span className="font-body text-body-sm text-text-secondary">
            Uploaded File
          </span>
          <span className="font-body text-body-sm font-medium text-text-primary">
            {fileName}
          </span>
        </div>
        <p className="mt-sm font-body text-caption text-text-secondary">
          Patient details and clinical information are contained in the uploaded
          paper referral form.
        </p>
      </div>

      {/* Receiving Facility */}
      <div className="rounded-lg border border-gray-100 bg-white p-base">
        <div className="mb-base flex items-center justify-between">
          <h2 className="font-body text-body-sm font-semibold text-text-primary">
            Receiving Facility
          </h2>
          <Link
            href="/dashboard/new-referral/paper-bridge/select-facility"
            className="font-body text-caption font-semibold text-green-700 hover:underline"
          >
            Edit →
          </Link>
        </div>

        <div className="flex flex-col gap-xs">
          {facilityRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <span className="font-body text-body-sm text-text-secondary">
                {row.label}
              </span>
              <span className="font-body text-body-sm font-medium text-text-primary">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation checkbox */}
      <label className="flex items-start gap-sm rounded-lg border border-gray-100 bg-white p-base cursor-pointer">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="mt-[2px] h-4 w-4 shrink-0 rounded border-gray-300 text-green-700 focus:ring-green-500"
        />
        <span className="font-body text-body-sm text-text-secondary select-none">
          I confirm the receiving facility and uploaded document are correct.
        </span>
      </label>

      {/* Error display */}
      {submitError && (
        <p
          role="alert"
          className="font-body text-body-sm text-emergency font-medium"
        >
          {submitError}
        </p>
      )}

      {/* Footer actions */}
      <div className="mt-base flex flex-wrap items-center justify-between gap-sm">
        <Button
          variant="outline"
          type="button"
          onClick={() => router.back()}
          disabled={submitting}
        >
          Back
        </Button>
        <Button
          variant="primary"
          type="button"
          disabled={!confirmed || submitting}
          isLoading={submitting}
          onClick={handleSubmit}
        >
          Submit Referral
        </Button>
      </div>
    </div>
  );
}
