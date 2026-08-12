"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import Button from "@/components/shared/Button";
import { RECOMMENDATIONS } from "@/lib/recommendationData";

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasRedFlag = searchParams!.get("hasRedFlag") === "true";
  const careType = hasRedFlag ? "tertiary" : "phc";
  const config = RECOMMENDATIONS[careType];

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <main className="w-full flex justify-center items-center py-6 px-4">
      <div className="w-full max-w-[640px] bg-white rounded-2xl p-5 sm:p-8 border border-slate-100 shadow-sm space-y-4">
        <div
          className={`w-full rounded-2xl p-5 sm:p-6 ${config.accentBg} space-y-4`}
        >
          <span
            className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${config.accentBadgeBg} ${config.accentText}`}
          >
            {config.badge}
          </span>

          <div>
            <h1
              className={`text-2xl sm:text-3xl font-serif font-bold ${config.accentText}`}
            >
              {config.title}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-600 mt-0.5">
              {config.subtitle}
            </p>
          </div>

          {/* White Reason Box */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-100/50 shadow-2xs">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              WE RECOMMEND STARTING HERE BECAUSE...
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {config.reason}
            </p>
          </div>
        </div>

        {/* ACCORDION BOX */}
        <div className="w-full border border-slate-200/80 rounded-xl overflow-hidden bg-white">
          <button
            type="button"
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-slate-800 hover:bg-slate-50 transition"
          >
            <span>{config.accordionQuestion}</span>
            {isAccordionOpen ? (
              <ChevronUp className="h-4 w-4 text-slate-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-500" />
            )}
          </button>

          {isAccordionOpen && (
            <div className="px-4 pb-4 pt-1 border-t border-slate-100 text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed bg-slate-50/30">
              {config.accordionAnswer.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          )}
        </div>

        <div className="w-full border border-slate-200/80 rounded-xl p-4 sm:p-5 bg-white">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
            SERVICES AVAILABLE AT THIS LEVEL
          </span>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            {config.services.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-slate-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full border border-slate-200/80 rounded-xl p-4 sm:p-5 bg-white">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            WHAT TO EXPECT
          </span>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {config.whatToExpect}
          </p>
        </div>

        <div className="w-full bg-slate-50/70 border border-slate-100 rounded-xl p-4">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            IF YOU NEED HIGHER-LEVEL CARE
          </span>
          <p className="text-xs text-slate-600 leading-relaxed">
            {config.higherLevelCare}
          </p>
        </div>

        <div className="pt-2 space-y-2.5">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => router.push(`/facilities?type=${config.type}`)}
            className="!bg-[#2D8A56] hover:!bg-[#236e44]"
          >
            {config.primaryButtonText}
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => router.push("/find-care/guided-care")}
            className="!border-slate-200 !text-slate-700 hover:!bg-slate-50"
          >
            Start Over
          </Button>
        </div>

        <p className="text-[11px] text-center text-slate-400 leading-normal px-4 pt-1">
          This tool provides guidance only and does not replace professional
          medical advice. Always consult a healthcare provider for diagnosis and
          treatment.
        </p>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-slate-400">
          Loading recommendation...
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
