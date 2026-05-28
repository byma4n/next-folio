import { User } from "lucide-react";

import type { Profile } from "../types";

/**
 * "About" section.
 * Pure presentation; receives the `about` slice of the profile.
 */
export function ProfileAboutSection({
  about,
}: {
  about: Profile["about"];
}) {
  if (about.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
        <User className="size-4" aria-hidden />
        About
      </h2>
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-foreground">
        {about.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
