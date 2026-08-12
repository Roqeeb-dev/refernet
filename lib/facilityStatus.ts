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

export type FacilityAvailability =
  | "accepting"
  | "limited"
  | "emergency-only"
  | "unavailable";

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

export interface FacilityAvailabilityOption {
  value: FacilityAvailability;
  label: string;
  dotColor: string;
  bg: string;
  text: string;
  selectable: boolean;
}

export const FACILITY_AVAILABILITY_OPTIONS: FacilityAvailabilityOption[] = [
  {
    value: "accepting",
    label: "Accepting",
    dotColor: "bg-green-500",
    bg: "bg-green-50",
    text: "text-green-700",
    selectable: true,
  },
  {
    value: "limited",
    label: "Limited Capacity",
    dotColor: "bg-urgent",
    bg: "bg-urgent-light",
    text: "text-urgent",
    selectable: true,
  },
  {
    value: "emergency-only",
    label: "Emergency Only",
    dotColor: "bg-status-emergency-only",
    bg: "bg-status-emergency-only/10",
    text: "text-status-emergency-only",
    selectable: true,
  },
  {
    value: "unavailable",
    label: "Unavailable",
    dotColor: "bg-gray-400",
    bg: "bg-gray-100",
    text: "text-text-secondary",
    selectable: false,
  },
];

export function getFacilityAvailabilityOption(
  value: FacilityAvailability,
): FacilityAvailabilityOption {
  return (
    FACILITY_AVAILABILITY_OPTIONS.find((option) => option.value === value) ??
    FACILITY_AVAILABILITY_OPTIONS[0]
  );
}
