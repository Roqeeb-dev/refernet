import { TONE_STYLES } from "./PaperBridgeSidebar";
import type { Tone } from "./PaperBridgeSidebar";

export default function NumberedStepsCard({
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
