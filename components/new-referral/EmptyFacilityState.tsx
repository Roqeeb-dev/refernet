import { SearchX } from "lucide-react";

interface EmptyFacilityStateProps {
  onClearFilters?: () => void;
}

export default function EmptyFacilityState({
  onClearFilters,
}: EmptyFacilityStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center gap-sm rounded-xl border border-dashed border-gray-200 bg-white px-base py-3xl text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <SearchX size={22} className="text-text-secondary" />
      </div>
      <p className="font-body text-body-md font-semibold text-text-primary">
        No facilities match your search
      </p>
      <p className="max-w-[400px] font-body text-body-sm text-text-secondary">
        Try a different name, state, or facility type — or clear your filters to
        see all facilities.
      </p>
      {onClearFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-xs font-body text-body-sm font-semibold text-green-700 underline underline-offset-2 hover:text-green-900"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
