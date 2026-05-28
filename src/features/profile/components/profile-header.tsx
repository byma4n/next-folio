import Image from "next/image";
import { Briefcase, BadgeCheck, MapPin } from "lucide-react";

import type { Profile } from "../types";

/**
 * Full-width profile header used at the top of profile-style pages.
 *
 * The `action` slot is rendered in two positions:
 *   - Desktop (≥sm): top-right, next to the avatar.
 *   - Mobile: as a full-width row under the meta line, so wide
 *     actions like a social-links bar can lay out comfortably.
 */
export function ProfileHeader({
  profile,
  action,
}: {
  profile: Profile;
  action?: React.ReactNode;
}) {
  return (
    <section className="w-full">
      <ProfileCover coverUrl={profile.coverUrl} alt={`${profile.name} cover`} />

      <div className="relative px-1">
        <div className="-mt-12 flex items-end justify-between gap-4">
          <ProfileAvatar src={profile.avatarUrl} alt={profile.name} />
          {action ? (
            <div className="hidden shrink-0 sm:block">{action}</div>
          ) : null}
        </div>

        <ProfileIdentity profile={profile} />

        {action ? (
          <div className="mt-4 border-t border-border/60 pt-3 sm:hidden">
            {action}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProfileCover({
  coverUrl,
  alt,
}: {
  coverUrl: string;
  alt: string;
}) {
  return (
    <div className="relative aspect-[16/7] w-full overflow-hidden rounded-md bg-muted">
      <Image
        src={coverUrl}
        alt={alt}
        fill
        priority
        sizes="(min-width: 1024px) 720px, 100vw"
        className="object-cover"
      />
    </div>
  );
}

function ProfileAvatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl ring-4 ring-background">
      <Image src={src} alt={alt} fill sizes="96px" className="object-cover" />
    </div>
  );
}

function ProfileIdentity({ profile }: { profile: Profile }) {
  return (
    <div className="mt-3 flex flex-col gap-2">
      <div>
        <h2 className="text-lg font-semibold leading-tight text-foreground">
          {profile.name}
        </h2>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>@{profile.handle}</span>
          {profile.verified && (
            <BadgeCheck
              className="size-4 text-sky-500"
              aria-label="Verified"
            />
          )}
        </p>
      </div>

      <p className="text-sm text-foreground">{profile.bio}</p>

      <ProfileMetaRow profile={profile} />
    </div>
  );
}

function ProfileMetaRow({ profile }: { profile: Profile }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
      <li className="inline-flex items-center gap-1.5">
        <Briefcase className="size-3.5" aria-hidden />
        <span>{profile.title}</span>
      </li>
      <li className="inline-flex items-center gap-1.5">
        <MapPin className="size-3.5" aria-hidden />
        <span>{profile.location}</span>
      </li>
    </ul>
  );
}
