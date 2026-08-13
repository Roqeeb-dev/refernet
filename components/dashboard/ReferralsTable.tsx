import Link from "next/link";
import Button from "@/components/shared/Button";
import DotBadge from "./DotBadge";
import type {
  ReferralStatusOption,
  ReferralStatusValue,
  UrgencyValue,
} from "@/lib/referral-meta";
import { getUrgencyOption, getReferralStatusOption } from "@/lib/referral-meta";

export interface ReferralRow {
  id: string;
  reference: string;
  facilityName: string;
  patientName: string;
  patientAge: number;
  patientGender: "Male" | "Female";
  urgency: UrgencyValue;
  status: ReferralStatusValue;
  receivedAt: string;
}

export default function ReferralsTable({
  referrals,
  facilityColumnLabel,
}: {
  referrals: ReferralRow[];
  facilityColumnLabel: string;
}) {
  if (referrals.length === 0) {
    return (
      <div className="rounded-lg border border-gray-100 bg-white p-2xl text-center">
        <p className="font-body text-body-sm text-text-secondary">
          No referrals match this filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100 bg-white">
      <table className="w-full min-w-[720px] border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            {[
              "Reference",
              facilityColumnLabel,
              "Patient",
              "Urgency",
              "Status",
              "Received",
              "",
            ].map((heading) => (
              <th
                key={heading}
                className="px-base py-sm text-left font-body text-caption font-semibold uppercase tracking-wide text-text-secondary"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {referrals.map((referral) => {
            const urgency = getUrgencyOption(referral.urgency);
            const status = getReferralStatusOption(referral.status);

            return (
              <tr
                key={referral.id}
                className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50"
              >
                <td className="px-base py-sm font-body text-body-sm font-semibold text-text-primary">
                  {referral.reference}
                </td>
                <td className="px-base py-sm font-body text-body-sm text-text-primary">
                  {referral.facilityName}
                </td>
                <td className="px-base py-sm">
                  <p className="font-body text-body-sm font-medium text-text-primary">
                    {referral.patientName}
                  </p>
                  <p className="font-body text-caption text-text-secondary">
                    {referral.patientAge}y · {referral.patientGender}
                  </p>
                </td>
                <td className="px-base py-sm">
                  <DotBadge
                    dotColor={urgency.dotColor}
                    textColor={urgency.textColor}
                    label={urgency.label}
                  />
                </td>
                <td className="px-base py-sm">
                  <DotBadge
                    dotColor={status.dotColor}
                    textColor={status.textColor}
                    label={status.label}
                  />
                </td>
                <td className="px-base py-sm font-body text-body-sm text-text-secondary">
                  {referral.receivedAt}
                </td>
                <td className="px-base py-sm text-right">
                  <Link href={`/dashboard/referrals/${referral.id}`}>
                    <Button variant="primary" size="sm">
                      View
                    </Button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
