"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminAuditLog, AuditLogFilters } from "@/types/admin-audit";
import { getAuditLogs } from "@/services/admin-audit.service";

export function useAuditLogs(initialFilters?: AuditLogFilters) {
  const [logs, setLogs] = useState<AdminAuditLog[]>([]);
  const [filters, setFilters] = useState<AuditLogFilters>(initialFilters || {});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const { logs: fetchedLogs, error: fetchError } =
      await getAuditLogs(filters);

    if (fetchError) {
      setError(fetchError);
    } else {
      setLogs(fetchedLogs);
    }
    setIsLoading(false);
  }, [filters]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    logs,
    isLoading,
    error,
    filters,
    setFilters,
    refetch: fetchLogs,
  };
}
