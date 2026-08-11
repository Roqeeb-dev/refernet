import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  sublabel: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  valueColor: string;
}

export default function StatCard({
  label,
  value,
  sublabel,
  icon: Icon,
  iconBg,
  iconColor,
  valueColor,
}: StatCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-lg">
      <div
        className={`mb-base flex h-9 w-9 items-center justify-center rounded-md ${iconBg}`}
      >
        <Icon size={18} className={iconColor} />
      </div>
      <p
        className={`mb-xs font-display text-heading-lg font-bold ${valueColor}`}
      >
        {value}
      </p>
      <p className="font-body text-body-sm font-medium text-text-primary">
        {label}
      </p>
      <p className="font-body text-caption text-text-secondary">{sublabel}</p>
    </div>
  );
}
