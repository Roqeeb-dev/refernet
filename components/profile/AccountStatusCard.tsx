"use client";

import { LifeBuoy } from "lucide-react";
import Button from "@/components/shared/Button";
import { useFacilityProfileStore } from "@/store/useFacilityProfileStore";
import ProfileSectionCard from "./ProfileSectionCard";

function StatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-xs rounded-full bg-green-50 px-sm py-[2px] font-body text-caption font-semibold text-green-700">
      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
      {label}
    </span>
  );
}

function StatusRow({
  title,
  description,
  badgeLabel,
}: {
  title: string;
  description: string;
  badgeLabel: string;
}) {
  return (
    <div className="flex items-start justify-between gap-base border-b border-gray-100 py-base last:border-0">
      <div>
        <p className="font-body text-body-sm font-semibold text-text-primary">
          {title}
        </p>
        <p className="font-body text-caption text-text-secondary">
          {description}
        </p>
      </div>
      <StatusBadge label={badgeLabel} />
    </div>
  );
}

export default function AccountStatusCard() {
  const accountStatus = useFacilityProfileStore((s) => s.accountStatus);

  return (
    <ProfileSectionCard title="Account Status">
      <div className="flex flex-col">
        <StatusRow
          title="Approval Status"
          description="Your facility has been verified and approved by the ReferNet review team."
          badgeLabel="Approved"
        />
        <StatusRow
          title="Medical Licence"
          description={`Registration No. ${accountStatus.medicalLicenceNumber} · Expires ${accountStatus.medicalLicenceExpiry}`}
          badgeLabel="Valid"
        />
        <StatusRow
          title="Data Compliance"
          description="NDPA 2023 data-sharing agreement signed and in force."
          badgeLabel="Compliant"
        />
      </div>

      <div className="mt-base flex flex-col items-start gap-base rounded-lg border border-info/20 bg-info-light p-base sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-xs">
          <LifeBuoy size={16} className="mt-[2px] shrink-0 text-info" />
          <div>
            <p className="font-body text-body-sm font-semibold text-info">
              Need help with your account?
            </p>
            <p className="font-body text-caption text-info">
              Contact the ReferNet support team for licence issues, disputes, or
              account recovery.
            </p>
          </div>
        </div>
        <Button variant="primary" size="sm" type="button">
          Contact Support
        </Button>
      </div>
    </ProfileSectionCard>
  );
}
