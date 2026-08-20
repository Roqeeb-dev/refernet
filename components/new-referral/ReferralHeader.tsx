"use client";

import Button from "@/components/shared/Button";
import { ReferralDirection, ReferralStatus } from "@/lib/referral-types";

interface ReferralHeaderProps {
  referenceNumber: string;
  direction: ReferralDirection;
  status: ReferralStatus;
  urgency: string;
  facilityName: string;
  receivedTime: string;
  isReceiver?: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
}

export default function ReferralHeader({
  referenceNumber,
  direction,
  status,
  urgency,
  facilityName,
  receivedTime,
  isReceiver,
  onAccept,
  onDecline,
}: ReferralHeaderProps) {
  const showActionButtons = isReceiver && status?.toLowerCase() === "pending";

  return (
    <div className="flex flex-wrap items-center justify-between gap-base rounded-2xl border border-gray-100 bg-white p-lg shadow-xs">
      <div className="flex flex-col gap-xs">
        <div className="flex items-center gap-xs font-heading text-heading-md font-bold text-text-primary">
          <span>{referenceNumber}</span>
        </div>

        <div className="flex flex-wrap items-center gap-xs">
          <span className="rounded-full border border-blue-200 bg-blue-50 px-sm py-[2px] font-body text-caption font-semibold capitalize text-blue-700">
            ● {status}
          </span>
          <span className="rounded-full border border-red-200 bg-red-50 px-sm py-[2px] font-body text-caption font-semibold capitalize text-red-700">
            ● {urgency}
          </span>
        </div>

        <p className="mt-xs font-body text-body-sm text-text-secondary">
          <strong className="font-semibold text-text-primary">
            {direction === "incoming" ? "From:" : "To:"}
          </strong>{" "}
          {facilityName}
        </p>
        <p className="font-body text-caption text-text-disabled">
          Received: {receivedTime}
        </p>
      </div>

      {/* Renders ONLY if user is receiver AND status is pending */}
      {showActionButtons && (
        <div className="flex items-center gap-sm sm:flex-row">
          <Button
            variant="outline"
            onClick={onDecline}
            className="border-red-200 bg-red-50/50 text-red-700 hover:bg-red-100"
          >
            ✕ Decline
          </Button>
          <Button
            variant="primary"
            onClick={onAccept}
            className="bg-emerald-700 text-white hover:bg-emerald-800"
          >
            ✓ Accept Referral
          </Button>
        </div>
      )}
    </div>
  );
}
