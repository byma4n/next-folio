import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedinIn,
  faThreads,
  faTiktok,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  buildWhatsAppUrl,
  facebookUrl,
  githubUrl,
  instagramUrl,
  linkedinUrl,
  mailtoUrl,
  threadsUrl,
  tiktokUrl,
  xUrl,
} from "@/lib/social-links";

type SocialLink = {
  readonly id: string;
  readonly label: string;
  readonly icon: IconDefinition;
  readonly href: string;
  /** Tailwind class for the icon's brand colour on hover. */
  readonly hoverClass: string;
};

/**
 * Renders the user's social links as a tidy row of icon buttons.
 * Empty/missing handles are filtered out automatically.
 */
export function ProfileSocialLinks({
  profileName,
  className,
}: {
  profileName: string;
  className?: string;
}) {
  const links = buildSocialLinks(profileName);
  if (links.length === 0) return null;

  return (
    <ul
      aria-label="Social links"
      className={cn(
        "flex w-full items-center justify-between gap-1 sm:w-auto sm:justify-start",
        className,
      )}
    >
      {links.map((link) => (
        <li key={link.id}>
          <Button
            asChild
            variant="ghost"
            size="icon-lg"
            className="rounded-full"
          >
            <a
              href={link.href}
              target={link.id === "email" ? undefined : "_blank"}
              rel={link.id === "email" ? undefined : "noopener noreferrer"}
              aria-label={link.label}
              title={link.label}
            >
              <FontAwesomeIcon
                icon={link.icon}
                className={cn("size-5 transition-colors", link.hoverClass)}
                aria-hidden
              />
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
}

function buildSocialLinks(profileName: string): readonly SocialLink[] {
  const { whatsapp, whatsappGreeting, socials } = siteConfig.contact;

  const candidates: ReadonlyArray<
    Omit<SocialLink, "href"> & { href: string | null }
  > = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: faWhatsapp,
      href: buildWhatsAppUrl(whatsapp, `${whatsappGreeting} (${profileName})`),
      hoverClass: "group-hover/button:text-[#25D366]",
    },
    {
      id: "facebook",
      label: "Facebook",
      icon: faFacebook,
      href: facebookUrl(socials.facebook),
      hoverClass: "group-hover/button:text-[#1877F2]",
    },
    {
      id: "instagram",
      label: "Instagram",
      icon: faInstagram,
      href: instagramUrl(socials.instagram),
      hoverClass: "group-hover/button:text-[#E4405F]",
    },
    {
      id: "x",
      label: "X",
      icon: faXTwitter,
      href: xUrl(socials.x),
      hoverClass: "group-hover/button:text-foreground",
    },
    {
      id: "threads",
      label: "Threads",
      icon: faThreads,
      href: threadsUrl(socials.threads),
      hoverClass: "group-hover/button:text-foreground",
    },
    {
      id: "tiktok",
      label: "TikTok",
      icon: faTiktok,
      href: tiktokUrl(socials.tiktok),
      hoverClass: "group-hover/button:text-foreground",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: faLinkedinIn,
      href: linkedinUrl(socials.linkedin),
      hoverClass: "group-hover/button:text-[#0A66C2]",
    },
    {
      id: "github",
      label: "GitHub",
      icon: faGithub,
      href: githubUrl(socials.github),
      hoverClass: "group-hover/button:text-foreground",
    },
    {
      id: "email",
      label: "Email",
      icon: faEnvelope,
      href: mailtoUrl(socials.email),
      hoverClass: "group-hover/button:text-sky-500",
    },
  ];

  return candidates
    .filter((c): c is typeof c & { href: string } => c.href !== null)
    .map(({ href, ...rest }) => ({ ...rest, href }));
}
