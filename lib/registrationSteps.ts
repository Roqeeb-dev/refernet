export interface RegistrationStep {
  number: number;
  label: string;
  path: string;
}

export const REGISTRATION_STEPS: RegistrationStep[] = [
  { number: 1, label: "Basic Details", path: "/register/basic-details" },
  { number: 2, label: "Location", path: "/register/location" },
  { number: 3, label: "Capacity", path: "/register/capacity" },
  { number: 4, label: "Services", path: "/register/services" },
  { number: 5, label: "Documents", path: "/register/documents" },
];

export const TOTAL_REGISTRATION_STEPS = REGISTRATION_STEPS.length;
