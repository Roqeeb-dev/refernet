import { useState, useCallback, useEffect } from "react";
import {
  fetchAllFacilities,
  toggleFacilitySuspension,
  AdminFacility,
  FacilityFilters,
} from "@/services/admin-facilities.service";

export function useAdminFacilities(initialFilters: FacilityFilters = {}) {
  const [facilities, setFacilities] = useState<AdminFacility[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const [filters, setFilters] = useState<FacilityFilters>(initialFilters);

  const loadFacilities = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    const { facilities: data, error } = await fetchAllFacilities(filters);
    if (error) {
      setErrorMsg(error);
    } else {
      setFacilities(data);
    }
    setIsLoading(false);
  }, [filters]);

  useEffect(() => {
    loadFacilities();
  }, [loadFacilities]);

  const handleToggleSuspend = async (facility: AdminFacility) => {
    setActionLoadingId(facility.id);
    const { success, error } = await toggleFacilitySuspension(
      facility.id,
      facility.status,
    );
    if (!success) {
      alert(`Error: ${error}`);
    } else {
      await loadFacilities();
    }
    setActionLoadingId(null);
  };

  return {
    facilities,
    isLoading,
    errorMsg,
    actionLoadingId,
    filters,
    setFilters,
    reload: loadFacilities,
    toggleSuspend: handleToggleSuspend,
  };
}
