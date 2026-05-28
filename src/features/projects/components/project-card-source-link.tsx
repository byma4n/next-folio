"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

/**
 * Source-link pill rendered inside the demo link of a project card.
 *
 * HTML disallows nesting `<a>` elements, so this pill is a focusable
 * span that opens the repo via `window.open` while stopping the
 * outer link's navigation.
 *
 * Lives in its own file so the parent card can stay a server
 * component — only this little island needs `'use client'`.
 */
export function ProjectCardSourceLink({
  repoUrl,
  title,
}: {
  repoUrl: string;
  title: string;
}) {
  function open(event: React.SyntheticEvent) {
    event.preventDefault();
    event.stopPropagation();
    window.open(repoUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <span
      role="link"
      tabIndex={0}
      aria-label={`View source code for ${title}`}
      onClick={open}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") open(event);
      }}
      className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      <FontAwesomeIcon icon={faGithub} className="size-3" aria-hidden />
      Source
    </span>
  );
}
