"use client";

import { useRouter } from "next/navigation";
import SymptomSelector from "@/components/guided-care/SymptomSelector";

export default function GuidedCarePage() {
  const router = useRouter();

  const handleContinue = (selectedSymptomKey: string) => {
    router.push(
      `/find-care/guided-care/assessment?symptom=${selectedSymptomKey}&step=1`,
    );
  };

  return <SymptomSelector onContinue={handleContinue} />;
}
