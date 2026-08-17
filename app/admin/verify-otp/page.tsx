"use client";

import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck } from "lucide-react";
import Button from "@/components/shared/Button";

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timer, setTimer] = useState<number>(58);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer logic
  useEffect(() => {
    if (timer <= 0) return;
    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  // Handle single character input & auto-tab
  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Focus next input field
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Handle full code paste (e.g. paste "123456")
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pasteData)) return;

    const digits = pasteData.slice(0, 6).split("");
    const newOtp = [...otp];
    digits.forEach((digit, i) => {
      if (i < 6) newOtp[i] = digit;
    });
    setOtp(newOtp);

    // Focus the box following the pasted digits
    const nextIndex = Math.min(digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(60);
    // Trigger resend API call here
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = otp.join("");
    if (fullCode.length < 6) return;

    setIsSubmitting(true);
    try {
      console.log("Verifying OTP:", fullCode);
      // Trigger authentication verification logic here
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCodeComplete = otp.every((digit) => digit !== "");

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-gray-50 p-base">
      <div className="flex w-full max-w-[500px] flex-col items-center justify-center rounded-2xl bg-white p-xl text-center border border-gray-100 shadow-sm">
        {/* Shield Icon Badge */}
        <div className="mb-md flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-xs">
          <ShieldCheck className="h-7 w-7 stroke-[2]" />
        </div>

        {/* Heading & Subtitle */}
        <h1 className="font-heading text-heading-md font-bold text-text-primary">
          Verify your identity
        </h1>

        <p className="mt-xs font-body text-body-xs text-text-secondary leading-normal">
          A 6-digit code has been sent to the phone number registered to this
          account.
        </p>

        {/* Phone Number Display */}
        <p className="mt-xs font-mono text-body-xs font-bold text-text-primary tracking-wider">
          Sent to +234 *** *** 4521
        </p>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="mt-lg w-full flex flex-col items-center gap-lg"
        >
          {/* OTP Input Boxes */}
          <div
            className="flex items-center justify-center gap-xs sm:gap-sm"
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="h-12 w-11 sm:h-14 sm:w-12 rounded-xl border border-gray-200 bg-white text-center font-mono text-heading-xs font-bold text-text-primary shadow-2xs outline-none transition-all focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
              />
            ))}
          </div>

          {/* Verify Button */}
          <Button
            type="submit"
            variant="primary"
            disabled={!isCodeComplete || isSubmitting}
            className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-sm rounded-xl font-body text-body-xs font-bold transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </Button>

          {/* Resend & Demo Hint */}
          <div className="flex flex-col items-center gap-2xs">
            {timer > 0 ? (
              <p className="font-body text-caption font-medium text-text-disabled">
                Resend code in{" "}
                <span className="font-bold text-text-secondary">{timer}s</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="font-body text-caption font-bold text-emerald-800 hover:text-emerald-900 hover:underline"
              >
                Resend code
              </button>
            )}

            <p className="font-body text-caption text-gray-400">
              Hint for demo: enter{" "}
              <span className="font-mono font-semibold">123456</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
