import React from "react";
import { Building2, Lock, Info, Lightbulb, ClipboardCheck } from "lucide-react";
import InfoCard from "./InfoCard";
import NumberedStepsCard from "./NumberedStepCard";
import AvailabilityKeyCard from "./AvailabilityKeyCard";

function PatientInfoSidebar() {
  return (
    <>
      <InfoCard icon={Building2} title="Referring Facility" tone="info">
        <p className="font-semibold">Lagos University Teaching Hospital</p>
        <p className="text-text-secondary">+234 812 345 6789</p>
      </InfoCard>

      <InfoCard icon={Lock} title="Patient Privacy" tone="info">
        Patient data is encrypted in transit and at rest. Only authorised
        personnel at the receiving facility can view this referral.
      </InfoCard>

      <InfoCard icon={Info} title="NHIA Number" tone="info">
        Entering the patient's NHIA number enables faster pre-authorisation at
        the receiving facility.
      </InfoCard>
    </>
  );
}

function ClinicalInfoSidebar() {
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-base shadow-xs">
      <h3 className="mb-sm font-body text-body-sm font-bold text-text-primary">
        Urgency Guide
      </h3>
      <div className="flex flex-col gap-xs">
        <div className="rounded-md bg-red-50 p-xs text-caption">
          <span className="font-bold text-red-700">● Emergency</span>
          <p className="text-red-600">
            Life-threatening, immediate action required!
          </p>
        </div>
        <div className="rounded-md bg-orange-50 p-xs text-caption">
          <span className="font-bold text-orange-700">● Critical</span>
          <p className="text-orange-600">
            Severe condition, urgent attention needed
          </p>
        </div>
        <div className="rounded-md bg-yellow-50 p-xs text-caption">
          <span className="font-bold text-yellow-700">● Urgent</span>
          <p className="text-yellow-600">
            Condition could deteriorate, respond soon
          </p>
        </div>
        <div className="rounded-md bg-green-50 p-xs text-caption">
          <span className="font-bold text-green-700">● Routine</span>
          <p className="text-green-600">
            Stable, scheduled or non-urgent transfer
          </p>
        </div>
      </div>
    </div>
  );
}

function SelectFacilitySidebar() {
  return (
    <>
      <AvailabilityKeyCard />
      <InfoCard icon={Lightbulb} title="Tip" tone="warning">
        Select the closest facility that can accept your referral. For EMERGENCY
        cases, prioritise the nearest accepting facility.
      </InfoCard>
    </>
  );
}

function ReviewSidebar() {
  return (
    <>
      <InfoCard icon={ClipboardCheck} title="Review Carefully">
        Confirm the facility selection and uploaded document before submitting.
      </InfoCard>
      <NumberedStepsCard
        title="What Happens Next"
        tone="success"
        steps={[
          "Referral sent instantly to receiving facility",
          "Facility reviews and accepts or declines",
          "You are notified of the decision",
          "Patient transfer is coordinated",
        ]}
      />
    </>
  );
}

const SIDEBAR_BY_STEP: Record<string, React.ComponentType> = {
  "patient-info": PatientInfoSidebar,
  "clinical-info": ClinicalInfoSidebar,
  "select-facility": SelectFacilitySidebar,
  review: ReviewSidebar,
};

export default function DigitalReferralSidebar({ step }: { step: string }) {
  const Content = SIDEBAR_BY_STEP[step] ?? PatientInfoSidebar;

  return (
    <aside className="flex min-w-[260px] max-w-[320px] flex-[1_1_260px] flex-col gap-base">
      <Content />
    </aside>
  );
}
