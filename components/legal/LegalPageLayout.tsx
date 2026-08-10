import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
}

export default function LegalPageLayout({
  title,
  lastUpdated,
  intro,
  sections,
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-dvh bg-white">
      <div className="mx-auto max-w-[500px] px-base py-2xl">
        <Link
          href="/"
          className="mb-lg inline-flex items-center gap-xs font-body text-body-sm font-medium text-text-secondary transition-colors hover:text-green-700"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <h1 className="mb-xs font-display text-display-lg font-bold text-green-900">
          {title}
        </h1>
        <p className="mb-xl font-body text-body-sm text-text-secondary">
          Last updated: {lastUpdated}
        </p>

        {intro && (
          <p className="mb-xl font-body text-body-lg text-text-secondary">
            {intro}
          </p>
        )}

        <div className="flex flex-col gap-xl">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-sm font-display text-heading-md font-bold text-text-primary">
                {section.heading}
              </h2>
              <div className="flex flex-col gap-sm">
                {section.paragraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className="font-body text-body-md leading-relaxed text-text-secondary"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-xs flex flex-col gap-xs pl-lg">
                    {section.list.map((item, i) => (
                      <li
                        key={i}
                        className="list-disc font-body text-body-md leading-relaxed text-text-secondary"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
