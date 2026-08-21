"use client";

import { Loader2, AlertTriangle, RefreshCw, UserX } from "lucide-react";
import Button from "@/components/shared/Button";

export function AdminLoadingState() {
  return (
    <div className="flex h-64 w-full flex-col items-center justify-center gap-xs">
      <Loader2 className="h-8 w-8 animate-spin text-emerald-800" />
      <p className="text-[12px] font-medium text-text-secondary">
        Loading admin accounts...
      </p>
    </div>
  );
}

export function AdminErrorState({
  errorMsg,
  onRetry,
}: {
  errorMsg: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex h-64 w-full flex-col items-center justify-center gap-sm text-center">
      <AlertTriangle className="h-10 w-10 text-red-500" />
      <div>
        <p className="text-body-xs font-bold text-text-primary">
          Failed to load accounts
        </p>
        <p className="text-caption text-text-secondary">{errorMsg}</p>
      </div>
      <Button
        variant="secondary"
        onClick={onRetry}
        className="flex items-center gap-xs text-[11px]"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        Retry
      </Button>
    </div>
  );
}

export function AdminEmptyState({ searchQuery }: { searchQuery?: string }) {
  return (
    <div className="flex h-64 w-full flex-col items-center justify-center gap-xs text-center">
      <UserX className="h-10 w-10 text-text-disabled" />
      <p className="text-body-xs font-bold text-text-primary">
        No Admin Accounts Found
      </p>
      <p className="text-caption text-text-secondary">
        {searchQuery
          ? `No administrators match "${searchQuery}".`
          : "There are currently no administrator profiles registered."}
      </p>
    </div>
  );
}
