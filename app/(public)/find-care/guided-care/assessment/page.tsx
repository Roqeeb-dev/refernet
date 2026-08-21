"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SYMPTOMS_DATA, Option } from "@/lib/symptomsData";
import Button from "@/components/shared/Button";

function AssessmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const symptomKey = searchParams.get("symptom") || "";
  const stepParam = parseInt(searchParams.get("step") || "1", 10);

  const [answers, setAnswers] = useState<Record<string, Option>>({});
  const [showRedFlagModal, setShowRedFlagModal] = useState(false);

  const symptomConfig = SYMPTOMS_DATA[symptomKey];

  if (!symptomConfig) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4 text-red-600">Symptom not found.</p>
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
    <main className="flex w-full items-center justify-center px-4 py-6">
      <div className="relative w-full max-w-[640px] rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-10">
        {/* Category Header & Step Progress Bar */}
        <div className="mb-6 flex items-center justify-between border-b pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <span>
            {symptomConfig.category} / {symptomConfig.title}
          </span>
          <span>
            {stepParam} / {totalSteps}
          </span>
        </div>

        {/* Dynamic Question Title */}
        <h2 className="mb-6 font-serif text-xl font-bold text-[#112A12] sm:text-2xl">
          {currentQuestion.text}
        </h2>

        {/* Options List */}
        <div className="mb-8 space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = currentSelectedOption?.id === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleOptionSelect(option)}
                className={`flex w-full items-center justify-between rounded-xl border p-4 text-left text-sm font-medium transition-all ${
                  isSelected
                    ? "border-[#2D8A56] bg-emerald-50/50 text-[#112A12]"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{option.label}</span>
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border ${
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

        {/* Immediate Red Flag Warning Banner */}
        {showRedFlagModal && currentSelectedOption?.isRedFlag && (
          <div className="mb-6 rounded-xl border border-[#FDE8E8] bg-[#FDF2F2] p-4">
            <p className="mb-1 text-sm font-semibold text-[#D93838]">
              This response may indicate a serious condition.
            </p>
            <p className="mb-3 text-xs text-slate-600">
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
                    router.push(
                      `/find-care/guided-care/result?symptom=${symptomKey}`,
                    );
                  else
                    router.push(
                      `/find-care/guided-care/assessment?symptom=${symptomKey}&step=${stepParam + 1}`,
                    );
                }}
              >
                I understand, continue
              </Button>
            </div>
          </div>
        )}

        {/* Action Button */}
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

// Export default component wrapped in Suspense boundary
export default function AssessmentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[400px] w-full items-center justify-center p-8">
          <div className="text-center font-medium text-slate-500">
            Loading assessment...
          </div>
        </div>
      }
    >
      <AssessmentContent />
    </Suspense>
  );
}
