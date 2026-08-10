"use client";

import { useEffect } from "react";
import { useRegistrationStore } from "@/store/useRegistrationStore";

export default function RegistrationHydration() {
  useEffect(() => {
    useRegistrationStore.persist.rehydrate();
  }, []);

  return null;
}
