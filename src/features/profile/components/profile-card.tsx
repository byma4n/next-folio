import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { Profile } from "../types";

/**
 * Compact profile card used in the sidebar header.
 * Pure presentation — receives a `Profile` and renders it.
 */
export function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <div className="flex items-center gap-3 px-2 py-1">
      <Avatar size="lg">
        <AvatarImage src={profile.avatarUrl} alt={profile.name} />
        <AvatarFallback>{initialsOf(profile.name)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium leading-tight text-foreground">
          {profile.handle}
        </p>
        <p className="truncate text-xs leading-tight text-muted-foreground">
          {profile.title}
        </p>
      </div>
    </div>
  );
}

function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
