import {
  FileCheck2,
  Info,
  Smartphone,
  CheckCircle2,
  Lightbulb,
  Paperclip,
  ClipboardCheck,
} from "lucide-react";

type Tone = "default" | "success" | "info" | "warning";

const TONE_STYLES: Record<
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

/** Icon + bold title + body paragraph. The default building block for most cards. */
function InfoCard({
  icon: Icon,
  title,
  children,
  tone = "default",
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  tone?: Tone;
}) {
  const styles = TONE_STYLES[tone];

  return (
    <div className={`rounded-xl border p-base ${styles.border} ${styles.bg}`}>
      <div className="mb-xs flex items-center gap-xs">
        <Icon size={15} className={styles.iconColor} />
        <p className={`font-body text-body-sm font-bold ${styles.titleColor}`}>
          {title}
        </p>
      </div>
      <p className="font-body text-caption leading-relaxed text-text-secondary">
        {children}
      </p>
    </div>
  );
}

/** Icon + paragraph, no separate title line — for short inline notes. */
function InlineNoteCard({
  icon: Icon,
  children,
  tone = "info",
}: {
  icon: React.ElementType;
  children: React.ReactNode;
  tone?: Tone;
}) {
  const styles = TONE_STYLES[tone];

  return (
    <div
      className={`flex items-start gap-xs rounded-xl border p-base ${styles.border} ${styles.bg}`}
    >
      <Icon size={15} className={`mt-[2px] shrink-0 ${styles.iconColor}`} />
      <p
        className={`font-body text-caption leading-relaxed ${styles.titleColor}`}
      >
        {children}
      </p>
    </div>
  );
}

/** Bold title + numbered step list — for "What Happens Next" style cards. */
function NumberedStepsCard({
  title,
  steps,
  tone = "success",
}: {
  title: string;
  steps: string[];
  tone?: Tone;
}) {
  const styles = TONE_STYLES[tone];

  return (
    <div className={`rounded-xl border p-base ${styles.border} ${styles.bg}`}>
      <p
        className={`mb-sm font-body text-body-sm font-bold ${styles.titleColor}`}
      >
        {title}
      </p>
      <ol className="flex flex-col gap-xs">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-xs">
            <span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 font-body text-caption font-semibold text-green-700">
              {i + 1}
            </span>
            <span className="font-body text-caption leading-relaxed text-text-secondary">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

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

interface AvailabilityItem {
  value: string;
  label: string;
  dotColor: string;
  bg: string;
  text: string;
  note?: string;
}

const AVAILABILITY_ITEMS: AvailabilityItem[] = [
  {
    value: "accepting",
    label: "Accepting",
    dotColor: "bg-green-500",
    bg: "bg-green-50",
    text: "text-green-700",
  },
  {
    value: "limited",
    label: "Limited Capacity",
    dotColor: "bg-urgent",
    bg: "bg-urgent-light",
    text: "text-urgent",
  },
  {
    value: "emergency-only",
    label: "Emergency Only",
    dotColor: "bg-status-emergency-only",
    bg: "bg-status-emergency-only/10",
    text: "text-status-emergency-only",
  },
  {
    value: "unavailable",
    label: "Unavailable",
    dotColor: "bg-gray-400",
    bg: "bg-gray-100",
    text: "text-text-secondary",
    note: "Cannot be selected",
  },
];

function AvailabilityKeyCard() {
  return (
    <div>
      <p className="mb-sm font-body text-body-sm font-bold text-text-primary">
        Availability Key
      </p>
      <div className="flex flex-col gap-xs">
        {AVAILABILITY_ITEMS.map((item) => (
          <div
            key={item.value}
            className={`flex items-center gap-xs rounded-lg px-base py-sm ${item.bg}`}
          >
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${item.dotColor}`}
            />
            <div className="flex flex-col">
              <span
                className={`font-body text-caption font-semibold ${item.text}`}
              >
                {item.label}
              </span>
              {item.note && (
                <span className="font-body text-caption text-text-disabled">
                  {item.note}
                </span>
              )}
            </div>
          </div>
        ))}
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
