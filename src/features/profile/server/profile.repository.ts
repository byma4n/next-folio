import { profileData } from "@/data/profile";

import type { Profile } from "../types";

/**
 * Profile data access.
 *
 * Reads from `src/data/profile.ts` — pure static data, no database.
 * Async signature is preserved so consumers can swap in a real
 * source later (e.g. fetch from a CMS) without touching the call
 * site.
 */
export async function getCurrentProfile(): Promise<Profile> {
  return profileData;
}
