import { useCallback, useEffect, useState } from "react";
import {
  getMyFacility,
  updateFacilityAvailability,
  type FacilityRegistration,
} from "@/services/facility.service";
import type { FacilityAvailabilityStatus as AvailabilityStatus } from "@/lib/facility";

interface UseFacilityResult {
  facility: FacilityRegistration | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateStatus: (
    status: AvailabilityStatus,
    note?: string,
  ) => Promise<{ error: string | null }>;
  isUpdatingStatus: boolean;
}

export function useFacility(): UseFacilityResult {
  const [facility, setFacility] = useState<FacilityRegistration | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const fetchFacility = useCallback(async () => {
    setIsLoading(true);
    const { data, error: fetchError } = await getMyFacility();
    setFacility(data);
    setError(fetchError);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchFacility();
  }, [fetchFacility]);

  const updateStatus = useCallback(
    async (status: AvailabilityStatus, note?: string) => {
      if (!facility) {
        return { error: "No facility loaded yet." };
      }

      setIsUpdatingStatus(true);
      const { data, error: updateError } = await updateFacilityAvailability(
        facility.id,
        status,
        note,
      );
      setIsUpdatingStatus(false);

      if (updateError) {
        return { error: updateError };
      }

      // Reflect the confirmed server state, not an optimistic guess.
      setFacility(data);
      return { error: null };
    },
    [facility],
  );

  return {
    facility,
    isLoading,
    error,
    refetch: fetchFacility,
    updateStatus,
    isUpdatingStatus,
  };
}
