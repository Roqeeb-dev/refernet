import Link from "next/link";
import { ArrowLeft, MapPin, ClipboardList, ShieldCheck } from "lucide-react";

const STATS = [
  {
    value: "81.25%",
    label:
      "of providers surveyed had sent a patient without confirming the receiving facility had capacity",
  },
  {
    value: "56.25%",
    label: "had experienced a patient being turned away on arrival",
  },
  {
    value: "0",
    label:
      "of the providers surveyed reported using a digital referral coordination system",
  },
];

const PILLARS = [
  {
    icon: MapPin,
    title: "Find the right facility",
    body: "Emergency Mode and Guided Care Navigation help patients and caregivers identify an appropriate facility based on location, urgency, and real-time availability — no medical knowledge required.",
  },
  {
    icon: ClipboardList,
    title: "Coordinate referrals digitally",
    body: "The Referral Portal replaces fragmented paper and phone-call coordination with a structured workflow, so essential clinical information travels with the patient.",
  },
  {
    icon: ShieldCheck,
    title: "Built for accountability",
    body: "Every referral maintains a timestamped audit trail — from creation through acceptance, arrival, outcome, and closure — so facilities have real visibility into every handoff.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-dvh bg-white">
      {/* Hero */}
      <section className="bg-green-900 px-base py-3xl text-center sm:px-xl">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="mb-lg inline-flex items-center gap-xs font-body text-body-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
          <h1 className="mb-base font-display text-display-lg font-bold text-white">
            Helping Nigerians reach the right care, the first time
          </h1>
          <p className="font-body text-body-lg text-white/80">
            ReferNet is a digital healthcare coordination platform built for
            Nigeria&apos;s fragmented healthcare environment — helping patients
            find appropriate facilities, and helping facilities coordinate
            referrals safely.
          </p>
        </div>
      </section>

      {/* The problem, in numbers */}
      <section className="px-base py-2xl sm:px-xl">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-xs text-center font-display text-heading-lg font-bold text-green-900">
            The problem isn&apos;t missing paperwork
          </h2>
          <p className="mx-auto mb-xl max-w-6xl text-center font-body text-body-md text-text-secondary">
            Discovery research with 16 healthcare providers across 11 Nigerian
            states surfaced a coordination gap, not a documentation gap.
          </p>
          <div className="grid gap-lg sm:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg bg-green-50 p-lg text-center"
              >
                <p className="mb-xs font-display text-display-lg font-bold text-green-700">
                  {stat.value}
                </p>
                <p className="font-body text-body-sm text-text-secondary">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="bg-gray-50 px-base py-2xl sm:px-xl">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-xl text-center font-display text-heading-lg font-bold text-green-900">
            What ReferNet does
          </h2>
          <div className="grid gap-lg sm:grid-cols-3">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="rounded-lg bg-white p-lg">
                <div className="mb-base flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
                  <pillar.icon size={20} className="text-green-700" />
                </div>
                <h3 className="mb-xs font-display text-heading-sm font-bold text-text-primary">
                  {pillar.title}
                </h3>
                <p className="font-body text-body-sm leading-relaxed text-text-secondary">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our position */}
      <section className="px-base py-2xl sm:px-xl">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="mb-base font-display text-heading-lg font-bold text-green-900">
            Navigation support, not a replacement for clinical judgment
          </h2>
          <p className="font-body text-body-md leading-relaxed text-text-secondary">
            ReferNet helps people enter the health system at an appropriate
            level and helps facilities coordinate transfers safely — it does not
            diagnose, and it does not replace professional clinical assessment.
            Where a situation looks urgent, we route people toward emergency
            care rather than asking more questions.
          </p>
        </div>
      </section>
    </div>
  );
}
