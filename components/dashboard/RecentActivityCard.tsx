import Link from "next/link";

export interface ActivityItem {
  text: string;
  time: string;
}

interface RecentActivityCardProps {
  activities: ActivityItem[];
  viewAllHref?: string;
}

export default function RecentActivityCard({
  activities,
  viewAllHref = "/dashboard/activity",
}: RecentActivityCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-lg">
      <div className="mb-base flex items-center justify-between">
        <p className="font-body text-overline font-semibold uppercase tracking-wide text-text-secondary">
          Recent Activity
        </p>
        <Link
          href={viewAllHref}
          className="font-body text-body-sm font-medium text-green-700 hover:underline"
        >
          View All →
        </Link>
      </div>
      <ul className="flex flex-col gap-base">
        {activities.map((activity, i) => (
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
  );
}
