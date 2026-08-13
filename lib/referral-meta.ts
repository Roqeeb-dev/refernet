export type ReferralStatusValue =
  | "new"
  | "accepted"
  | "arrived"
  | "closed"
  | "declined";

export interface ReferralStatusOption {
  value: ReferralStatusValue;
  label: string;
  dotColor: string;
  textColor: string;
}

export const REFERRAL_STATUS_OPTIONS: ReferralStatusOption[] = [
  { value: "new", label: "New", dotColor: "bg-info", textColor: "text-info" },
  {
    value: "accepted",
    label: "Accepted",
    dotColor: "bg-green-500",
    textColor: "text-green-700",
  },
  {
    value: "arrived",
    label: "Arrived",
    dotColor: "bg-purple",
    textColor: "text-purple",
  },
  {
    value: "closed",
    label: "Closed",
    dotColor: "bg-gray-400",
    textColor: "text-text-secondary",
  },
  {
    value: "declined",
    label: "Declined",
    dotColor: "bg-emergency",
    textColor: "text-emergency",
  },
];

export function getReferralStatusOption(
  value: ReferralStatusValue,
): ReferralStatusOption {
  return (
    REFERRAL_STATUS_OPTIONS.find((o) => o.value === value) ??
    REFERRAL_STATUS_OPTIONS[0]
  );
}

export type UrgencyValue = "emergency" | "critical" | "urgent" | "routine";

export interface UrgencyOption {
  value: UrgencyValue;
  label: string;
  dotColor: string;
  textColor: string;
}

export const URGENCY_OPTIONS: UrgencyOption[] = [
  {
    value: "emergency",
    label: "Emergency",
    dotColor: "bg-urgency-emergency",
    textColor: "text-urgency-emergency",
  },
  {
    value: "critical",
    label: "Critical",
    dotColor: "bg-urgency-critical",
    textColor: "text-urgency-critical",
  },
  {
    value: "urgent",
    label: "Urgent",
    dotColor: "bg-urgency-urgent",
    textColor: "text-urgency-urgent",
  },
  {
    value: "routine",
    label: "Routine",
    dotColor: "bg-urgency-routine",
    textColor: "text-urgency-routine",
  },
];

export function getUrgencyOption(value: UrgencyValue): UrgencyOption {
  return URGENCY_OPTIONS.find((o) => o.value === value) ?? URGENCY_OPTIONS[3];
}
