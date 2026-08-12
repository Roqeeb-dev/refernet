import {
  FileCheck2,
  Info,
  Smartphone,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

function InfoCard({
  icon: Icon,
  title,
  children,
  highlighted = false,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-base ${
        highlighted
          ? "border-green-100 bg-green-50"
          : "border-gray-100 bg-white"
      }`}
    >
      <div className="mb-xs flex items-center gap-xs">
        <Icon
          size={14}
          className={highlighted ? "text-green-700" : "text-text-secondary"}
        />
        <p className="font-body text-body-sm font-semibold text-text-primary">
          {title}
        </p>
      </div>
      <p className="font-body text-caption text-text-secondary">{children}</p>
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
        highlighted
      >
        The uploaded form is stored securely and shared only with the receiving
        facility&apos;s authorised staff, alongside your referral record.
      </InfoCard>
    </>
  );
}

function AvailabilityKeyCard() {
  const items = [
    { color: "bg-green-500", label: "Accepting" },
    { color: "bg-urgent", label: "Limited Capacity" },
    { color: "bg-status-emergency-only", label: "Emergency Only" },
    { color: "bg-gray-400", label: "Unavailable", note: "Cannot be selected" },
  ];

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-base">
      <p className="mb-sm font-body text-body-sm font-semibold text-text-primary">
        Availability Key
      </p>
      <div className="flex flex-col gap-sm">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-xs">
            <span className={`h-2 w-2 shrink-0 rounded-full ${item.color}`} />
            <span className="font-body text-caption text-text-primary">
              {item.label}
            </span>
            {item.note && (
              <span className="ml-auto font-body text-caption text-text-disabled">
                {item.note}
              </span>
            )}
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
      <InfoCard icon={Lightbulb} title="Tip">
        Select the closest facility that can accept your referral. For EMERGENCY
        cases, prioritise the nearest accepting facility.
      </InfoCard>
    </>
  );
}

function ReviewSidebar() {
  return (
    <InfoCard icon={Info} title="Before You Submit">
      Double-check the receiving facility and uploaded document. Once submitted,
      the facility is notified immediately.
    </InfoCard>
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
    <aside className="flex min-w-[260px] flex-[1_1_260px] flex-col gap-base">
      <Content />
    </aside>
  );
}
