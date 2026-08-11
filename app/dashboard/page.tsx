// app/dashboard/page.tsx
import Link from "next/link";
import { Inbox, Send, Clock, TrendingUp, RefreshCw } from "lucide-react";
import Button from "@/components/shared/Button";

const STATS = [
  {
    label: "Incoming Referrals",
    sublabel: "This month",
    value: "12",
    icon: Inbox,
    iconBg: "bg-info-light",
    iconColor: "text-info",
    valueColor: "text-info",
  },
  {
    label: "Outgoing Referrals",
    sublabel: "This month",
    value: "8",
    icon: Send,
    iconBg: "bg-green-50",
    iconColor: "text-green-700",
    valueColor: "text-green-700",
  },
  {
    label: "Pending Acceptance",
    sublabel: "Awaiting response",
    value: "3",
    icon: Clock,
    iconBg: "bg-urgent-light",
    iconColor: "text-urgent",
    valueColor: "text-urgent",
  },
  {
    label: "Acceptance Rate",
    sublabel: "Last 30 days",
    value: "87%",
    icon: TrendingUp,
    iconBg: "bg-green-50",
    iconColor: "text-green-700",
    valueColor: "text-green-700",
  },
];

// TODO: replace with real activity from Supabase
const RECENT_ACTIVITY = [
  {
    text: "New referral received from General Hospital Ikeja (REF-2026-0043)",
    time: "2 min ago",
  },
  {
    text: "Referral REF-2026-0041 accepted by Lagos Island General Hospital",
    time: "15 min ago",
  },
  {
    text: "Patient status updated for REF-2026-0038 — arrived safely",
    time: "1 hr ago",
  },
  {
    text: "New referral received from Reddington Hospital Abuja",
    time: "3 hrs ago",
  },
  {
    text: "REF-2026-0035 marked as completed successfully",
    time: "Yesterday",
  },
];

// TODO: replace with real referral records from Supabase
const RECENT_OUTGOING = [
  {
    referenceCode: "REF-2026-0043",
    facility: "Amina Okoye",
    dateSent: "Aug 9, 2026",
  },
  {
    referenceCode: "REF-2026-0041",
    facility: "Lagos Island General Hospital",
    dateSent: "Aug 8, 2026",
  },
  {
    referenceCode: "REF-2026-0038",
    facility: "Reddington Hospital Abuja",
    dateSent: "Aug 7, 2026",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-lg">
      <div>
        <h1 className="font-display text-heading-xl font-bold text-text-primary">
          Dashboard
        </h1>
        <p className="font-body text-body-sm text-text-secondary">
          Overview of your facility&apos;s referral activity
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-base sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-gray-200 bg-white p-lg"
          >
            <div
              className={`mb-base flex h-9 w-9 items-center justify-center rounded-md ${stat.iconBg}`}
            >
              <stat.icon size={18} className={stat.iconColor} />
            </div>
            <p
              className={`mb-xs font-display text-heading-lg font-bold ${stat.valueColor}`}
            >
              {stat.value}
            </p>
            <p className="font-body text-body-sm font-medium text-text-primary">
              {stat.label}
            </p>
            <p className="font-body text-caption text-text-secondary">
              {stat.sublabel}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-lg lg:grid-cols-[280px_1fr]">
        {/* Quick actions */}
        <div className="h-fit rounded-lg border border-gray-200 bg-white p-lg">
          <p className="mb-base font-body text-overline font-semibold uppercase tracking-wide text-text-secondary">
            Quick Actions
          </p>
          <div className="flex flex-col gap-sm">
            <Link href="/dashboard/referrals/new">
              <Button variant="primary" fullWidth>
                New Referral
              </Button>
            </Link>
            <Button variant="outline" fullWidth>
              <RefreshCw size={16} />
              Update Status
            </Button>
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-lg border border-gray-200 bg-white p-lg">
          <div className="mb-base flex items-center justify-between">
            <p className="font-body text-overline font-semibold uppercase tracking-wide text-text-secondary">
              Recent Activity
            </p>
            <Link
              href="/dashboard/activity"
              className="font-body text-body-sm font-medium text-green-700 hover:underline"
            >
              View All →
            </Link>
          </div>
          <ul className="flex flex-col gap-base">
            {RECENT_ACTIVITY.map((activity, i) => (
              <li key={i} className="flex items-start gap-sm">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                <div>
                  <p className="font-body text-body-sm text-text-primary">
                    {activity.text}
                  </p>
                  <p className="font-body text-caption text-text-secondary">
                    {activity.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent outgoing referrals */}
      <div className="rounded-lg border border-gray-200 bg-white p-lg">
        <div className="mb-base flex items-center justify-between">
          <p className="font-body text-overline font-semibold uppercase tracking-wide text-text-secondary">
            Recent Outgoing Referrals
          </p>
          <Link
            href="/dashboard/referrals/outgoing"
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
              {RECENT_OUTGOING.map((row) => (
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
    </div>
  );
}
