import { Share2 } from "lucide-react";

interface LogoProps {
  className?: string;
  variant?: "default" | "inverse";
}

export default function Logo({
  className = "",
  variant = "default",
}: LogoProps) {
  const iconColorClass =
    variant === "inverse" ? "text-green-500" : "text-green-900";
  const textColorClass =
    variant === "inverse" ? "text-text-inverse" : "text-green-900";

  return (
    <span className={`inline-flex items-center gap-xs ${className}`}>
      <Share2
        size={26}
        strokeWidth={2.25}
        fill="currentColor"
        className={`rotate-90 ${iconColorClass}`}
      />
      <span className={`font-body text-heading-md font-bold ${textColorClass}`}>
        ReferNet
      </span>
    </span>
  );
}
