interface AvailabilityItem {
  value: string;
  label: string;
  dotColor: string;
  bg: string;
  text: string;
  note?: string;
}

const AVAILABILITY_ITEMS: AvailabilityItem[] = [
  {
    value: "accepting",
    label: "Accepting",
    dotColor: "bg-green-500",
    bg: "bg-green-50",
    text: "text-green-700",
  },
  {
    value: "limited",
    label: "Limited Capacity",
    dotColor: "bg-urgent",
    bg: "bg-urgent-light",
    text: "text-urgent",
  },
  {
    value: "emergency-only",
    label: "Emergency Only",
    dotColor: "bg-status-emergency-only",
    bg: "bg-status-emergency-only/10",
    text: "text-status-emergency-only",
  },
  {
    value: "unavailable",
    label: "Unavailable",
    dotColor: "bg-gray-400",
    bg: "bg-gray-100",
    text: "text-text-secondary",
    note: "Cannot be selected",
  },
];

export default function AvailabilityKeyCard() {
  return (
    <div>
      <p className="mb-sm font-body text-body-sm font-bold text-text-primary">
        Availability Key
      </p>
      <div className="flex flex-col gap-xs">
        {AVAILABILITY_ITEMS.map((item) => (
          <div
            key={item.value}
            className={`flex items-center gap-xs rounded-lg px-base py-sm ${item.bg}`}
          >
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${item.dotColor}`}
            />
            <div className="flex flex-col">
              <span
                className={`font-body text-caption font-semibold ${item.text}`}
              >
                {item.label}
              </span>
              {item.note && (
                <span className="font-body text-caption text-text-disabled">
                  {item.note}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
