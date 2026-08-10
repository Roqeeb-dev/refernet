"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-green-700 text-white hover:bg-green-900 focus-visible:ring-green-500 disabled:bg-green-100 disabled:text-text-disabled",
  secondary:
    "bg-green-50 text-green-900 hover:bg-green-100 focus-visible:ring-green-500 disabled:bg-gray-50 disabled:text-text-disabled",
  outline:
    "bg-transparent text-green-700 border border-green-700 hover:bg-green-50 focus-visible:ring-green-500 disabled:border-gray-200 disabled:text-text-disabled",
  ghost:
    "bg-transparent text-green-700 hover:bg-green-50 focus-visible:ring-green-500 disabled:text-text-disabled",
  danger:
    "bg-emergency text-white hover:opacity-90 focus-visible:ring-emergency disabled:bg-emergency-light disabled:text-text-disabled",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-base text-body-sm",
  md: "h-tap-preferred px-lg text-body-md",
  lg: "h-12 px-xl text-body-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-xs rounded-md font-body font-semibold",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
