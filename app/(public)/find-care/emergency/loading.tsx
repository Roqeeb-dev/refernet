import { Loader2 } from "lucide-react";

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-5 w-28 animate-pulse rounded-full bg-gray-100" />
        <div className="h-4 w-12 animate-pulse rounded bg-gray-100" />
      </div>
      <div className="space-y-2">
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-1/3 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100" />
      </div>
      <div className="pt-2 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="h-9 animate-pulse rounded-lg bg-gray-100" />
          <div className="h-9 animate-pulse rounded-lg bg-gray-100" />
        </div>
        <div className="h-10 w-full animate-pulse rounded-lg bg-gray-100" />
      </div>
    </div>
  );
}

export default function EmergencyResultsLoading() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-gray-200/60 bg-white/70 p-6 shadow-sm backdrop-blur-md sm:p-8">
        <div className="mb-8 text-center">
          <Loader2
            size={28}
            className="mx-auto mb-3 animate-spin text-emerald-600"
          />
          <p className="font-body text-sm font-medium text-gray-600">
            Finding available facilities near you...
          </p>
        </div>

        {/* Skeleton Grid matching the main results layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </div>
  );
}
