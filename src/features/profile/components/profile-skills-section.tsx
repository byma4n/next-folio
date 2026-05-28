import { Code } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Marquee } from "@/components/common/marquee";

import type { Skill } from "../types";

/**
 * "Skills" section.
 * Two counter-rotating marquees of skill chips, split 50/50 so the
 * rows feel balanced rather than mirrored.
 */
export function ProfileSkillsSection({
  skills,
}: {
  skills: readonly Skill[];
}) {
  if (skills.length === 0) return null;

  const [topRow, bottomRow] = splitInHalf(skills);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
        <Code className="size-4" aria-hidden />
        Skills
      </h2>
      <div className="flex flex-col gap-3">
        <Marquee direction="left" speed={35}>
          {topRow.map((skill) => (
            <SkillChip key={skill.name} skill={skill} />
          ))}
        </Marquee>
        <Marquee direction="right" speed={35}>
          {bottomRow.map((skill) => (
            <SkillChip key={skill.name} skill={skill} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function SkillChip({ skill }: { skill: Skill }) {
  return (
    <Badge variant="secondary" className="h-7 px-3 text-sm">
      {skill.name}
    </Badge>
  );
}

function splitInHalf<T>(items: readonly T[]): [readonly T[], readonly T[]] {
  const mid = Math.ceil(items.length / 2);
  return [items.slice(0, mid), items.slice(mid)];
}
