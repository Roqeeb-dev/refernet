import Link from "next/link";

export interface OutgoingReferralRow {
  referenceCode: string;
  facility: string;
  dateSent: string;
}

interface RecentOutgoingReferralsCardProps {
  referrals: OutgoingReferralRow[];
  viewAllHref?: string;
}

export default function RecentOutgoingReferralsCard({
  referrals,
  viewAllHref = "/dashboard/referrals/outgoing",
}: RecentOutgoingReferralsCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-lg">
      <div className="mb-base flex items-center justify-between">
        <p className="font-body text-overline font-semibold uppercase tracking-wide text-text-secondary">
          Recent Outgoing Referrals
        </p>
        <Link
          href={viewAllHref}
          className="font-body text-body-sm font-medium text-green-700 hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="whitespace-nowrap py-xs pr-lg font-body text-caption font-semibold uppercase tracking-wide text-text-secondary">
                Reference Code
              </th>
              <th className="whitespace-nowrap py-xs pr-lg font-body text-caption font-semibold uppercase tracking-wide text-text-secondary">
                Facility
              </th>
              <th className="whitespace-nowrap py-xs font-body text-caption font-semibold uppercase tracking-wide text-text-secondary">
                Date Sent
              </th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((row) => (
              <tr
                key={row.referenceCode}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="whitespace-nowrap py-sm pr-lg font-body text-body-sm font-medium text-text-primary">
                  {row.referenceCode}
                </td>
                <td className="whitespace-nowrap py-sm pr-lg font-body text-body-sm text-text-secondary">
                  {row.facility}
                </td>
                <td className="whitespace-nowrap py-sm font-body text-body-sm text-text-secondary">
                  {row.dateSent}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
