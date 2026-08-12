"use client";

import React, { useState } from "react";
import Button from "@/components/shared/Button";
import { SYMPTOMS_DATA } from "@/lib/symptomsData";

interface SymptomSelectorProps {
  onContinue?: (selectedSymptomKey: string, customConcern?: string) => void;
}

export default function SymptomSelector({ onContinue }: SymptomSelectorProps) {
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Get symptoms directly from your config
  const symptomList = Object.values(SYMPTOMS_DATA);

  const handleSymptomSelect = (id: string) => {
    setSelectedSymptom((prev) => (prev === id ? null : id));
  };

  const handleContinue = () => {
    if (selectedSymptom && onContinue) {
      onContinue(selectedSymptom, searchQuery);
    }
  };

  const isContinueActive = Boolean(
    selectedSymptom || searchQuery.trim().length > 0,
  );

  return (
    <main className="w-full flex justify-center items-center py-6 px-4 sm:px-6">
      <div className="w-full max-w-[640px] bg-white rounded-2xl p-6 sm:p-10 border border-slate-100/80 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
        {/* Title & Subtitle */}
        <div className="text-center max-w-[480px] mx-auto mb-8 sm:mb-9">
          <h1 className="text-2xl sm:text-[28px] font-serif font-bold text-[#112A12] leading-tight mb-2.5">
            What brings you here today?
          </h1>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
            A few quick questions will help us recommend the right level of care
            — so you’re seen by the right people, in the right place.
          </p>
        </div>

        {/* Search / Freeform Input */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Describe your main concern, e.g. fever, chest pain"
            className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition"
          />
        </div>

        {/* OR Divider Label */}
        <div className="mb-4">
          <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            OR SELECT A COMMON SYMPTOM
          </span>
        </div>

        {/* Symptom Tag Pills */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {symptomList.map((symptom) => {
            const isSelected = selectedSymptom === symptom.id;
            return (
              <button
                key={symptom.id}
                type="button"
                onClick={() => handleSymptomSelect(symptom.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 border ${
                  isSelected
                    ? "bg-[#2D8A56] text-white border-[#2D8A56] shadow-sm scale-[1.02]"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {symptom.title}
              </button>
            );
          })}
        </div>

        {/* Action Button & Warning Banner */}
        <div className="space-y-3">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            disabled={!isContinueActive}
            onClick={handleContinue}
            className={
              !isContinueActive
                ? "!bg-[#EFEFEF] !text-[#A3A3A3] !border-none cursor-not-allowed shadow-none"
                : "!bg-[#2D8A56] hover:!bg-[#236e44] active:scale-[0.99] transition-all shadow-md shadow-green-900/10"
            }
          >
            Continue
          </Button>

          {/* Emergency Warning Footer Box */}
          <div className="w-full py-3 px-4 bg-[#FDF2F2] border border-[#FDE8E8] rounded-xl text-center">
            <p className="text-xs sm:text-[13px] font-semibold text-[#D93838]">
              If this is a life-threatening emergency, call 199 immediately. Do
              not use this tool.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
