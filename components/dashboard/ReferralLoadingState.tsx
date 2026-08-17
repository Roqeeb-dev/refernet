"use client";

export default function ReferralLoadingState() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white/80 shadow-2xs">
      {/* Table Header Skeleton */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/60 px-md py-sm">
        <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
      </div>

      {/* Rows Skeletons */}
      <div className="divide-y divide-gray-100">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-md py-md transition-opacity"
            style={{ opacity: 1 - i * 0.15 }} // Subtle fade gradient down rows
          >
            {/* Reference & Date */}
            <div className="flex flex-col gap-2xs">
              <div className="h-3.5 w-20 animate-pulse rounded-md bg-gray-200" />
              <div className="h-2.5 w-16 animate-pulse rounded bg-gray-100" />
            </div>

            {/* Facility */}
            <div className="flex items-center gap-xs">
              <div className="h-7 w-7 animate-pulse rounded-lg bg-emerald-100/50" />
              <div className="h-3.5 w-36 animate-pulse rounded-md bg-gray-200" />
            </div>

            {/* Patient Info */}
            <div className="flex flex-col gap-2xs">
              <div className="h-3.5 w-28 animate-pulse rounded-md bg-gray-200" />
              <div className="h-2.5 w-14 animate-pulse rounded bg-gray-100" />
            </div>

            {/* Urgency Badge Skeleton */}
            <div className="h-6 w-20 animate-pulse rounded-full bg-gray-100" />

            {/* Status Badge Skeleton */}
            <div className="h-6 w-24 animate-pulse rounded-full bg-emerald-50" />
          </div>
        ))}
      </div>
    </div>
  );
}
