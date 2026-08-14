"use client";

import { TimelineStep } from "@/lib/referral-types";

export default function ReferralTimelineSidebar({
  timeline,
}: {
  timeline: TimelineStep[];
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-lg shadow-xs">
      <h3 className="font-body text-caption font-bold tracking-wider text-text-disabled uppercase">
        REFERRAL TIMELINE
      </h3>

      <div className="mt-lg flex flex-col space-y-base">
        {timeline.map((step, idx) => {
          const isCompleted = step.status === "completed";
          const isCurrent = step.status === "current";

          return (
            <div key={idx} className="flex gap-base">
              <div className="flex flex-col items-center">
                <div
                  className={`h-4 w-4 rounded-full border-2 ${
                    isCompleted
                      ? "border-emerald-600 bg-emerald-600"
                      : isCurrent
                        ? "border-emerald-600 bg-white"
                        : "border-gray-200 bg-white"
                  }`}
                />
                {idx < timeline.length - 1 && (
                  <div
                    className={`h-full w-[2px] ${
                      isCompleted ? "bg-emerald-600" : "bg-gray-100"
                    }`}
                  />
                )}
              </div>

              <div className="pb-xs">
                <p className="font-body text-body-sm font-bold text-text-primary">
                  {step.title}
                </p>
                <p className="font-body text-caption text-text-disabled">
                  {step.time || "Pending"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
