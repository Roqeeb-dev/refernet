export default function DotBadge({
  dotColor,
  textColor,
  label,
}: {
  dotColor: string;
  textColor: string;
  label: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-xs font-body text-body-sm font-medium ${textColor}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotColor}`} />
      {label}
    </span>
  );
}
