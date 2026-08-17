import { useCallback, useEffect, useState } from "react";
import {
  fetchFacilities,
  getMyFacility,
  type FacilityRegistration,
} from "@/services/facility.service";
import type {
  Facility,
  FacilityAvailabilityStatus as AvailabilityStatus,
} from "@/lib/facility";
import { useFacilityStatusStore } from "@/store/useFacilityStatusStore";

interface UseFacilityResult {
  facility: FacilityRegistration | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateStatus: (
    status: AvailabilityStatus,
  ) => Promise<{ error: string | null }>;
  isUpdatingStatus: boolean;
}

interface UseFacilitiesResult {
  facilities: Facility[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch and manage the current user's registered facility profile and availability
 */
export function useFacility(): UseFacilityResult {
  const [facility, setFacility] = useState<FacilityRegistration | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { initializeStatus, saveStatus, isUpdating } = useFacilityStatusStore();

  const fetchFacility = useCallback(async () => {
    setIsLoading(true);
    const { data, error: fetchError } = await getMyFacility();
    setFacility(data);
    setError(fetchError);

    // Sync backend state into store on initial load
    if (data?.availability_status) {
      initializeStatus(data.availability_status, data.availability_updated_at);
    }

    setIsLoading(false);
  }, [initializeStatus]);

  useEffect(() => {
    fetchFacility();
  }, [fetchFacility]);

  const updateStatus = useCallback(
    async (status: AvailabilityStatus) => {
      if (!facility?.id) {
        return { error: "No facility loaded yet." };
      }

      // Delegate persistence and state update to the Zustand store
      const result = await saveStatus(facility.id, status);

      if (!result.error) {
        setFacility((prev) =>
          prev ? { ...prev, availability_status: status } : null,
        );
      }

      return result;
    },
    [facility?.id, saveStatus],
  );

  return {
    facility,
    isLoading,
    error,
    refetch: fetchFacility,
    updateStatus,
    isUpdatingStatus: isUpdating,
  };
}

export function useFacilities(): UseFacilitiesResult {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFacilities = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const { data, error: fetchError } = await fetchFacilities();

    if (fetchError) {
      setError(fetchError);
      setFacilities([]);
    } else {
      setFacilities(data ?? []);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadFacilities();
  }, [loadFacilities]);

  return {
    facilities,
    isLoading,
    error,
    refetch: loadFacilities,
  };
}
