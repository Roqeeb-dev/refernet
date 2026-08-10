import { Loader2 } from "lucide-react";

function SkeletonCard() {
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-base">
      <div className="mb-sm flex items-center justify-between">
        <div className="h-4 w-24 animate-pulse rounded-full bg-gray-100" />
        <div className="h-4 w-10 animate-pulse rounded bg-gray-100" />
      </div>
      <div className="mb-base h-4 w-3/4 animate-pulse rounded bg-gray-200" />
      <div className="flex gap-sm">
        <div className="h-8 flex-1 animate-pulse rounded-md bg-gray-100" />
        <div className="h-8 flex-1 animate-pulse rounded-md bg-gray-100" />
      </div>
    </div>
  );
}

export default function EmergencyResultsLoading() {
  return (
    <div className="mx-auto w-full max-w-2xl px-base py-xl sm:px-xl">
      <div className="rounded-lg border border-gray-100 bg-white p-xl text-center">
        <Loader2
          size={20}
          className="mx-auto mb-sm animate-spin text-green-700"
        />
        <p className="font-body text-body-sm text-text-secondary">
          Finding available facilities near you…
        </p>
      </div>

      <div className="mt-lg flex flex-col gap-base">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}
