"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

interface ReferralErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ReferralErrorState({
  message = "Failed to load referrals. Please check your network connection.",
  onRetry,
}: ReferralErrorStateProps) {
  return (
    <div className="relative flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/30 py-[56px] px-[24px] text-center shadow-2xs backdrop-blur-xs">
      {/* Red Alert Ring */}
      <div className="relative mb-[16px] flex h-[64px] w-[64px] items-center justify-center rounded-full bg-red-100/60 ring-8 ring-red-50/50">
        <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-red-500 text-white shadow-2xs">
          <AlertCircle className="h-[22px] w-[22px]" />
        </div>
      </div>

      {/* Title */}
      <h3 className="font-heading text-[15px] font-bold tracking-tight text-gray-900">
        Unable to load data
      </h3>

      {/* Message */}
      <p className="mt-[6px] max-w-[340px] font-body text-[12px] leading-[18px] text-gray-600">
        {message}
      </p>

      {/* Retry Trigger */}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-[18px] inline-flex items-center gap-[6px] rounded-xl border border-red-200 bg-white px-[14px] py-[7px] font-body text-[11px] font-bold text-red-600 shadow-2xs hover:bg-red-50 hover:border-red-300 transition-colors cursor-pointer"
        >
          <RefreshCw className="h-[12px] w-[12px]" />
          Try again
        </button>
      )}
    </div>
  );
}
