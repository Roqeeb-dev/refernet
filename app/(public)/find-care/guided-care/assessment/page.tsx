"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SYMPTOMS_DATA, Option } from "@/lib/symptomsData";
import Button from "@/components/shared/Button";

export default function AssessmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read URL params
  const symptomKey = searchParams!.get("symptom") || "";
  const stepParam = parseInt(searchParams!.get("step") || "1", 10);

  // Store selected answers in component state (or sessionStorage / Zustand)
  const [answers, setAnswers] = useState<Record<string, Option>>({});
  const [showRedFlagModal, setShowRedFlagModal] = useState(false);

  // Retrieve current symptom config dynamically from SYMPTOMS_DATA
  const symptomConfig = SYMPTOMS_DATA[symptomKey];

  // Fallback if symptom invalid
  if (!symptomConfig) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-4">Symptom not found.</p>
        <Button onClick={() => router.push("/guided-care")}>Go Back</Button>
      </div>
    );
  }

  const currentStepIndex = stepParam - 1;
  const totalSteps = symptomConfig.questions.length;
  const currentQuestion = symptomConfig.questions[currentStepIndex];

  // Current answer selected for this specific question
  const currentSelectedOption = answers[currentQuestion.id];

  const handleOptionSelect = (option: Option) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
    setShowRedFlagModal(false);
  };

  const handleNext = () => {
    if (currentSelectedOption?.isRedFlag && !showRedFlagModal) {
      setShowRedFlagModal(true);
      return;
    }

    if (stepParam < totalSteps) {
      router.push(
        `/find-care/guided-care/assessment?symptom=${symptomKey}&step=${stepParam + 1}`,
      );
    } else {
      router.push(`/find-care/guided-care/result?symptom=${symptomKey}`);
    }
  };

  const isLastQuestion = stepParam === totalSteps;

  return (
    <main className="w-full flex justify-center items-center py-6 px-4">
      <div className="w-full max-w-[640px] bg-white rounded-2xl p-6 sm:p-10 border border-slate-100 shadow-sm relative">
        {/* Category Header & Step Progress Bar */}
        <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6 border-b pb-3">
          <span>
            {symptomConfig.category} / {symptomConfig.title}
          </span>
          <span>
            {stepParam} / {totalSteps}
          </span>
        </div>

        {/* Dynamic Question Title */}
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#112A12] mb-6">
          {currentQuestion.text}
        </h2>

        {/* Options List */}
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option) => {
            const isSelected = currentSelectedOption?.id === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleOptionSelect(option)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                  isSelected
                    ? "border-[#2D8A56] bg-emerald-50/50 text-[#112A12]"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{option.label}</span>
                <span
                  className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                    isSelected
                      ? "border-[#2D8A56] bg-[#2D8A56]"
                      : "border-slate-300"
                  }`}
                >
                  {isSelected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Immediate Red Flag Warning Banner (As shown in Figma) */}
        {showRedFlagModal && currentSelectedOption?.isRedFlag && (
          <div className="p-4 mb-6 bg-[#FDF2F2] border border-[#FDE8E8] rounded-xl">
            <p className="text-sm font-semibold text-[#D93838] mb-1">
              This response may indicate a serious condition.
            </p>
            <p className="text-xs text-slate-600 mb-3">
              If you are in danger or this is a medical emergency, please call
              199 or go to A&E immediately.
            </p>
            <div className="flex gap-2">
              <Button
                variant="danger"
                size="sm"
                fullWidth
                onClick={() => router.push("/find-care/emergency")}
              >
                Find Emergency Care Now
              </Button>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => {
                  setShowRedFlagModal(false);
                  if (isLastQuestion)
                    router.push(`/guided-care/result?symptom=${symptomKey}`);
                  else
                    router.push(
                      `/guided-care/assessment?symptom=${symptomKey}&step=${stepParam + 1}`,
                    );
                }}
              >
                I understand, continue
              </Button>
            </div>
          </div>
        )}

        {/* Button changes label dynamically from "Next Question" to "See Recommendation" on the last question */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!currentSelectedOption}
          onClick={handleNext}
          className={
            !currentSelectedOption
              ? "!bg-[#EFEFEF] !text-[#A3A3A3] cursor-not-allowed shadow-none"
              : "!bg-[#2D8A56] hover:!bg-[#236e44]"
          }
        >
          {isLastQuestion ? "See Recommendation" : "Next Question"}
        </Button>
      </div>
    </main>
  );
}
