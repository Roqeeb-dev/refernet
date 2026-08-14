import { TONE_STYLES } from "./PaperBridgeSidebar";
import type { Tone } from "./PaperBridgeSidebar";

export default function InfoCard({
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
