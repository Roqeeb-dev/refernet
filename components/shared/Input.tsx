"use client";

import { InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, id, required, className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-xs">
        {label && (
          <label
            htmlFor={inputId}
            className="font-body text-body-sm font-medium text-text-primary"
          >
            {label}
            {required && <span className="text-emergency"> *</span>}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          className={cn(
            "h-tap-preferred w-full rounded-md border bg-white px-base font-body text-caption text-text-primary",
            "placeholder:text-text-disabled",
            "transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500",
            "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-text-disabled",
            error ? "border-emergency focus:ring-emergency" : "border-gray-200",
            className,
          )}
          {...props}
        />

        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="font-body text-body-sm text-emergency"
          >
            {error}
          </p>
        )}
        {!error && helperText && (
          <p
            id={`${inputId}-helper`}
            className="font-body text-body-sm text-text-secondary"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
