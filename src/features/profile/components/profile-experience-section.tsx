import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";

import type { Experience } from "../types";
import { formatPeriod } from "../lib/format-period";

/**
 * "Experience" section.
 *
 * Renders a vertical timeline. The visual rail (line + dots) is
 * owned by this component so each `ExperienceItem` only needs to
 * focus on the content it displays.
 */
export function ProfileExperienceSection({
  experiences,
}: {
  experiences: readonly Experience[];
}) {
  if (experiences.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
        <Briefcase className="size-4" aria-hidden />
        Experience
      </h2>
      <ol className="relative ml-2 border-l border-border/60">
        {experiences.map((exp) => (
          <ExperienceItem key={exp.id} experience={exp} />
        ))}
      </ol>
    </section>
  );
}

function ExperienceItem({ experience }: { experience: Experience }) {
  const period = formatPeriod(experience.startDate, experience.endDate, {
    locale: siteConfig.locale,
  });
  const isCurrent = experience.endDate === null;

  return (
    <li className="relative pb-6 pl-6 last:pb-0">
      <span
        aria-hidden
        className={
          "absolute -left-[5px] top-1.5 size-2.5 rounded-full ring-4 ring-background " +
          (isCurrent ? "bg-sky-500" : "bg-muted-foreground/60")
        }
      />

      <header className="flex flex-col gap-0.5">
        <h3 className="text-sm font-semibold leading-tight text-foreground">
          {experience.role}
        </h3>
        <p className="text-sm text-muted-foreground">
          <CompanyLabel
            company={experience.company}
            url={experience.companyUrl}
          />
          <span className="mx-1.5">·</span>
          <span>{experience.employmentType}</span>
        </p>
        <p className="text-xs text-muted-foreground">{period}</p>
        {experience.location && (
          <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3" aria-hidden />
            {experience.location}
          </p>
        )}
      </header>

      {experience.description && (
        <p className="mt-2 text-sm leading-relaxed text-foreground">
          {experience.description}
        </p>
      )}

      {experience.bullets && experience.bullets.length > 0 && (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground marker:text-muted-foreground">
          {experience.bullets.map((bullet, idx) => (
            <li key={idx}>{bullet}</li>
          ))}
        </ul>
      )}

      {experience.tags && experience.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {experience.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="secondary" className="text-xs">
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function CompanyLabel({ company, url }: { company: string; url?: string }) {
  if (!url) {
    return <span className="font-medium text-foreground">{company}</span>;
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-medium text-foreground transition-colors hover:text-sky-500"
    >
      {company}
      <ArrowUpRight className="size-3" aria-hidden />
    </a>
  );
}
