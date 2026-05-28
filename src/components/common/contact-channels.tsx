import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
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

/**
 * Big primary cards for the Contact page.
 *
 * Each card surfaces a single channel and the action you'd take.
 * Channels with no configured handle render nothing — the layout
 * always reflects what's actually reachable.
 */
export function ContactPrimaryChannels({
  greeting,
}: {
  greeting?: string;
}) {
  const { whatsapp, whatsappGreeting, socials } = siteConfig.contact;
  const message = greeting ?? whatsappGreeting;
  const waHref = buildWhatsAppUrl(whatsapp, message);
  const emailHref = mailtoUrl(socials.email);

  if (!waHref && !emailHref) return null;

  return (
    <div className="flex flex-col gap-3">
      {waHref && (
        <ChannelCard
          href={waHref}
          icon={faWhatsapp}
          accentClass="bg-[#25D366] text-white"
          title="WhatsApp"
          subtitle="Send a direct message"
          external
        />
      )}
      {emailHref && (
        <ChannelCard
          href={emailHref}
          icon={faEnvelope}
          accentClass="bg-sky-500 text-white"
          title="Email"
          subtitle={socials.email}
        />
      )}
    </div>
  );
}

/**
 * Compact icon row for the secondary social links.
 */
export function ContactSocialChannels() {
  const links = buildSocialLinks();
  if (links.length === 0) return null;

  return (
    <ul
      aria-label="Social links"
      className="grid grid-cols-3 gap-3 sm:grid-cols-6"
    >
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-card p-3 text-muted-foreground transition-colors hover:border-border hover:text-foreground"
          >
            <FontAwesomeIcon
              icon={link.icon}
              className={cn("size-5", link.hoverClass)}
              aria-hidden
            />
            <span className="text-xs">{link.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

type ChannelCardProps = {
  href: string;
  icon: IconDefinition;
  accentClass: string;
  title: string;
  subtitle: string;
  external?: boolean;
};

function ChannelCard({
  href,
  icon,
  accentClass,
  title,
  subtitle,
  external,
}: ChannelCardProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-border"
    >
      <span
        className={cn(
          "inline-flex size-11 shrink-0 items-center justify-center rounded-full",
          accentClass,
        )}
      >
        <FontAwesomeIcon icon={icon} className="size-5" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <FontAwesomeIcon
        icon={faArrowUpRightFromSquare}
        className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
        aria-hidden
      />
    </a>
  );
}

type SocialLink = {
  readonly id: string;
  readonly label: string;
  readonly icon: IconDefinition;
  readonly href: string;
  readonly hoverClass: string;
};

function buildSocialLinks(): readonly SocialLink[] {
  const { socials } = siteConfig.contact;

  const candidates: ReadonlyArray<
    Omit<SocialLink, "href"> & { href: string | null }
  > = [
    {
      id: "facebook",
      label: "Facebook",
      icon: faFacebook,
      href: facebookUrl(socials.facebook),
      hoverClass: "group-hover:text-[#1877F2]",
    },
    {
      id: "instagram",
      label: "Instagram",
      icon: faInstagram,
      href: instagramUrl(socials.instagram),
      hoverClass: "group-hover:text-[#E4405F]",
    },
    {
      id: "x",
      label: "X",
      icon: faXTwitter,
      href: xUrl(socials.x),
      hoverClass: "group-hover:text-foreground",
    },
    {
      id: "threads",
      label: "Threads",
      icon: faThreads,
      href: threadsUrl(socials.threads),
      hoverClass: "group-hover:text-foreground",
    },
    {
      id: "tiktok",
      label: "TikTok",
      icon: faTiktok,
      href: tiktokUrl(socials.tiktok),
      hoverClass: "group-hover:text-foreground",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: faLinkedinIn,
      href: linkedinUrl(socials.linkedin),
      hoverClass: "group-hover:text-[#0A66C2]",
    },
    {
      id: "github",
      label: "GitHub",
      icon: faGithub,
      href: githubUrl(socials.github),
      hoverClass: "group-hover:text-foreground",
    },
  ];

  return candidates
    .filter((c): c is typeof c & { href: string } => c.href !== null)
    .map(({ href, ...rest }) => ({ ...rest, href }));
}
