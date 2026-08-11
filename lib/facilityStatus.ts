export type FacilityStatusValue =
  | "accepting"
  | "limited"
  | "at_capacity"
  | "offline";

export interface FacilityStatusOption {
  value: FacilityStatusValue;
  label: string;
  dotColor: string;
  textColor: string;
  bgColor: string;
}

export const FACILITY_STATUS_OPTIONS: FacilityStatusOption[] = [
  {
    value: "accepting",
    label: "Accepting Referrals",
    dotColor: "bg-green-500",
    textColor: "text-green-700",
    bgColor: "bg-green-50",
  },
  {
    value: "limited",
    label: "Limited Capacity",
    dotColor: "bg-urgent",
    textColor: "text-urgent",
    bgColor: "bg-urgent-light",
  },
  {
    value: "at_capacity",
    label: "At Capacity",
    dotColor: "bg-emergency",
    textColor: "text-emergency",
    bgColor: "bg-emergency-light",
  },
  {
    value: "offline",
    label: "Offline",
    dotColor: "bg-gray-400",
    textColor: "text-text-secondary",
    bgColor: "bg-gray-100",
  },
];

export function getFacilityStatusOption(
  value: FacilityStatusValue,
): FacilityStatusOption {
  return (
    FACILITY_STATUS_OPTIONS.find((option) => option.value === value) ??
    FACILITY_STATUS_OPTIONS[0]
  );
}
