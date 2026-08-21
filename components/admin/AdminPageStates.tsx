"use client";

import { ReactNode } from "react";
import {
  Loader2,
  AlertTriangle,
  RefreshCw,
  UserX,
  LucideIcon,
} from "lucide-react";
import Button from "@/components/shared/Button";

interface PageLoadingStateProps {
  message?: string;
}

interface PageErrorStateProps {
  title?: string;
  errorMsg: string;
  onRetry: () => void;
}

interface PageEmptyStateProps {
  title?: string;
  description?: string;
  searchQuery?: string;
  icon?: LucideIcon;
  action?: ReactNode;
}

export function PageLoadingState({
  message = "Loading...",
}: PageLoadingStateProps) {
  return (
    <div className="flex h-64 w-full flex-col items-center justify-center gap-xs">
      <Loader2 className="h-8 w-8 animate-spin text-emerald-800" />
      <p className="text-[12px] font-medium text-text-secondary">{message}</p>
    </div>
  );
}

export function PageErrorState({
  title = "Failed to load data",
  errorMsg,
  onRetry,
}: PageErrorStateProps) {
  return (
    <div className="flex h-64 w-full flex-col items-center justify-center gap-sm text-center">
      <AlertTriangle className="h-10 w-10 text-red-500" />
      <div>
        <p className="text-body-xs font-bold text-text-primary">{title}</p>
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

export function PageEmptyState({
  title = "No Data Found",
  description,
  searchQuery,
  icon: Icon = UserX,
  action,
}: PageEmptyStateProps) {
  const defaultDescription = searchQuery
    ? `No results match "${searchQuery}".`
    : "There are currently no records to display.";

  return (
    <div className="flex h-64 w-full flex-col items-center justify-center gap-xs text-center">
      <Icon className="h-10 w-10 text-text-disabled" />
      <p className="text-body-xs font-bold text-text-primary">{title}</p>
      <p className="text-caption text-text-secondary">
        {description || defaultDescription}
      </p>
      {action && <div className="mt-xs">{action}</div>}
    </div>
  );
}

// Backward-compatible aliases so existing code doesn't break
export const AdminLoadingState = (props: { message?: string }) => (
  <PageLoadingState message={props.message || "Loading admin accounts..."} />
);

export const AdminErrorState = (props: {
  errorMsg: string;
  onRetry: () => void;
}) => <PageErrorState title="Failed to load accounts" {...props} />;

export const AdminEmptyState = (props: { searchQuery?: string }) => (
  <PageEmptyState
    title="No Admin Accounts Found"
    searchQuery={props.searchQuery}
  />
);
