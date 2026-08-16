"use client";

import Logo from "@/components/shared/Logo";

interface MetricBadge {
  label: string;
}

interface AuthLeftPanelProps {
  badgeText?: string;
  title: string;
  subtitle: string;
  metrics?: MetricBadge[];
}

export default function AuthLeftPanel({
  badgeText = "INTERNAL OPERATIONS",
  title = "Admin Portal",
  subtitle = "ReferNet Operations",
  metrics = [
    { label: "48 facilities registered" },
    { label: "7 pending verification" },
    { label: "312 referrals this month" },
  ],
}: AuthLeftPanelProps) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#06321F] p-xl text-white">
      {/* Background Decorative Graphic Swirls */}
      <div className="absolute -right-16 -top-16 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

      {/* Top Logo */}
      <div className="relative z-10">
        <Logo variant="inverse" className="h-8" />
      </div>

      {/* Center Content — Bold & High-Contrast Typography */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center px-md">
        {badgeText && (
          <span className="inline-flex items-center gap-xs rounded-full bg-emerald-900/80 px-md py-1 font-body text-caption font-extrabold tracking-wider text-emerald-300 border border-emerald-600/50 uppercase">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {badgeText}
          </span>
        )}

        <h1 className="mt-md font-heading text-heading-xl font-extrabold text-white tracking-tight leading-none">
          {title}
        </h1>

        <p className="mt-sm font-body text-body-md font-bold text-emerald-200">
          {subtitle}
        </p>
      </div>

      {/* Bottom Metrics Pills — High Contrast & Bolder Text */}
      {metrics && metrics.length > 0 && (
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-xs pb-sm">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="rounded-full bg-emerald-900/60 px-md py-xs border border-emerald-600/40 font-body text-caption font-bold text-white backdrop-blur-md shadow-xs"
            >
              {metric.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
