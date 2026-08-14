import { TONE_STYLES } from "./PaperBridgeSidebar";
import type { Tone } from "./PaperBridgeSidebar";

export default function InlineNoteCard({
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
