interface LogoProps {
  className?: string;
  variant?: "default" | "inverse";
}

export default function Logo({
  className = "",
  variant = "default",
}: LogoProps) {
  const iconColorClass =
    variant === "inverse" ? "text-green-500" : "text-green-700";
  const textColorClass =
    variant === "inverse" ? "text-text-inverse" : "text-green-900";

  return (
    <span className={`inline-flex items-center gap-xs ${className}`}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className={iconColorClass}
      >
        <path
          d="M12 2L22 20H2L12 2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={`font-display text-heading-md font-semibold ${textColorClass}`}
      >
        ReferNet
      </span>
    </span>
  );
}
