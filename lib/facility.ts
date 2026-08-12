export type FacilityAvailabilityStatus =
  | "accepting"
  | "limited"
  | "emergency_only"
  | "unavailable";

export interface FacilityAvailabilityOption {
  value: FacilityAvailabilityStatus;
  label: string;
  longLabel: string;
  dotColor: string;
  bgColor: string;
  textColor: string;
  selectable: boolean;
}

export const FACILITY_AVAILABILITY_OPTIONS: FacilityAvailabilityOption[] = [
  {
    value: "accepting",
    label: "Accepting",
    longLabel: "Accepting Referrals",
    dotColor: "bg-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    selectable: true,
  },
  {
    value: "limited",
    label: "Limited Capacity",
    longLabel: "Limited Capacity",
    dotColor: "bg-urgent",
    bgColor: "bg-urgent-light",
    textColor: "text-urgent",
    selectable: true,
  },
  {
    value: "emergency_only",
    label: "Emergency Only",
    longLabel: "Emergency Only",
    dotColor: "bg-status-emergency-only",
    bgColor: "bg-status-emergency-only/10",
    textColor: "text-status-emergency-only",
    selectable: true,
  },
  {
    value: "unavailable",
    label: "Unavailable",
    longLabel: "Unavailable",
    dotColor: "bg-gray-400",
    bgColor: "bg-gray-100",
    textColor: "text-text-secondary",
    selectable: false,
  },
];

export function getFacilityAvailabilityOption(
  value: FacilityAvailabilityStatus,
): FacilityAvailabilityOption {
  return (
    FACILITY_AVAILABILITY_OPTIONS.find((option) => option.value === value) ??
    FACILITY_AVAILABILITY_OPTIONS[0]
  );
}

export type FacilityType =
  | "primary_health_centre"
  | "general_hospital"
  | "specialist_hospital"
  | "tertiary_hospital";

export interface FacilityTypeOption {
  value: FacilityType;
  label: string;
}

export const FACILITY_TYPE_OPTIONS: FacilityTypeOption[] = [
  { value: "primary_health_centre", label: "Primary Health Centre" },
  { value: "general_hospital", label: "General Hospital" },
  { value: "specialist_hospital", label: "Specialist Hospital" },
  { value: "tertiary_hospital", label: "Tertiary Hospital" },
];

export function getFacilityTypeLabel(value: FacilityType): string {
  return (
    FACILITY_TYPE_OPTIONS.find((option) => option.value === value)?.label ??
    value
  );
}

export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  distanceKm: number;
  address: string;
  updatedMinutesAgo: number;
  status: FacilityAvailabilityStatus;
  note?: string;
}
