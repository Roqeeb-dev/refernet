import {
  FileCheck2,
  Info,
  Smartphone,
  CheckCircle2,
  Lightbulb,
  Paperclip,
  ClipboardCheck,
} from "lucide-react";
import InfoCard from "./InfoCard";
import InlineNoteCard from "./InlineNoteCard";
import NumberedStepsCard from "./NumberedStepCard";
import AvailabilityKeyCard from "./AvailabilityKeyCard";

export type Tone = "default" | "success" | "info" | "warning";

export const TONE_STYLES: Record<
  Tone,
  { border: string; bg: string; iconColor: string; titleColor: string }
> = {
  default: {
    border: "border-gray-100",
    bg: "bg-white",
    iconColor: "text-text-secondary",
    titleColor: "text-text-primary",
  },
  success: {
    border: "border-green-100",
    bg: "bg-green-50",
    iconColor: "text-green-700",
    titleColor: "text-green-900",
  },
  info: {
    border: "border-info/20",
    bg: "bg-info-light",
    iconColor: "text-info",
    titleColor: "text-info",
  },
  warning: {
    border: "border-paper/20",
    bg: "bg-paper-light",
    iconColor: "text-paper",
    titleColor: "text-paper",
  },
};

function UploadSidebar() {
  return (
    <>
      <InfoCard icon={FileCheck2} title="Accepted Formats">
        Upload PDF, JPG, or PNG files up to 5MB. Ensure the form is fully
        visible and all handwriting is legible.
      </InfoCard>
      <InfoCard icon={Info} title="ReferNet Template">
        If your facility does not have a standard paper form, use the ReferNet
        template — it is accepted at all registered facilities in the network.
      </InfoCard>
      <InfoCard icon={Smartphone} title="Mobile Tip">
        On a mobile device, tap &lsquo;Browse files&rsquo; then choose
        &lsquo;Take Photo&rsquo; to photograph the referral form directly with
        your camera.
      </InfoCard>
      <InfoCard
        icon={CheckCircle2}
        title="What Happens to the Upload?"
        tone="success"
      >
        The uploaded form is stored securely and shared only with the receiving
        facility&apos;s authorised staff, alongside your referral record.
      </InfoCard>
    </>
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
      <InlineNoteCard icon={Paperclip} tone="info">
        Your uploaded document will be visible to the receiving facility
        immediately after submission.
      </InlineNoteCard>
      <InfoCard icon={ClipboardCheck} title="Review Carefully">
        Confirm the facility selection and uploaded document before submitting.
      </InfoCard>
      <NumberedStepsCard
        title="What Happens Next"
        tone="success"
        steps={[
          "Document attached to digital referral record",
          "Receiving facility notified and can view form",
          "Confirm patient arrival to close the referral loop",
        ]}
      />
    </>
  );
}

const SIDEBAR_BY_STEP: Record<string, React.ComponentType> = {
  upload: UploadSidebar,
  "select-facility": SelectFacilitySidebar,
  review: ReviewSidebar,
};

export default function PaperBridgeSidebar({ step }: { step: string }) {
  const Content = SIDEBAR_BY_STEP[step] ?? UploadSidebar;

  return (
    <aside className="flex min-w-[260px] max-w-[320px] flex-[1_1_260px] flex-col gap-base">
      <Content />
    </aside>
  );
}
