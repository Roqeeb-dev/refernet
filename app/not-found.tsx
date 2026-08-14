"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Stethoscope, ArrowLeft, Home, FileQuestion } from "lucide-react";
import Button from "@/components/shared/Button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-50/60 p-base text-center">
      {/* Subtle Animated Background Pulse Grid */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-[500px] w-[500px] rounded-full bg-emerald-200 blur-3xl"
        />
      </div>

      {/* Main Card Content — FIXED WIDTH & FLEX SPACING */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 mx-auto flex w-full max-w-[500px] flex-col items-center rounded-2xl border border-gray-100 bg-white p-lg md:p-xl shadow-xs"
      >
        {/* Animated Medical Icon Badge */}
        <motion.div
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="relative mb-md flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 shadow-xs border border-emerald-100"
        >
          <Stethoscope className="h-10 w-10 stroke-[1.75]" />

          {/* Floating Subtle Question Badge */}
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700 border border-amber-200"
          >
            <FileQuestion size={16} className="stroke-[2.5]" />
          </motion.div>
        </motion.div>

        {/* 404 Subtitle Tag */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block rounded-full bg-emerald-100/60 px-md py-[3px] font-body text-caption font-bold tracking-wider text-emerald-800 uppercase"
        >
          Error 404 · Page Not Found
        </motion.span>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-base font-heading text-heading-md font-bold text-text-primary"
        >
          Referral Route Missing
        </motion.h1>

        {/* Description Text — Fixed Width Constraints */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-xs w-full font-body text-body-xs text-text-secondary leading-normal text-center"
        >
          The page or referral record you are looking for does not exist or may
          have been transferred to another facility. Please check the reference
          ID or return to your dashboard.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-lg flex w-full flex-col gap-sm sm:flex-row"
        >
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center gap-xs border-gray-200 text-text-primary hover:bg-gray-50"
          >
            <ArrowLeft size={16} /> Go Back
          </Button>

          <Link href="/dashboard" className="w-full">
            <Button
              variant="primary"
              className="w-full flex items-center justify-center gap-xs bg-emerald-700 hover:bg-emerald-800 text-white"
            >
              <Home size={16} /> Dashboard
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer System Brand Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-lg font-body text-caption font-semibold text-text-disabled"
      >
        ReferNet Nigeria · National Electronic Referral System
      </motion.p>
    </div>
  );
}
