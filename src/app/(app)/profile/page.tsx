import type { Metadata } from "next";

import { JsonLd } from "@/components/common/json-ld";
import { siteConfig } from "@/config/site";
import {
  getCurrentProfile,
  ProfileAboutSection,
  ProfileExperienceSection,
  ProfileHeader,
  ProfileSkillsSection,
  ProfileSocialLinks,
} from "@/features/profile";
import {
  facebookUrl,
  githubUrl,
  instagramUrl,
  linkedinUrl,
  threadsUrl,
  tiktokUrl,
  xUrl,
} from "@/lib/social-links";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  personJsonLd,
} from "@/lib/seo";

const description = `About ${siteConfig.author.name} — ${siteConfig.author.role}. Experience, skills, and how to get in touch.`;

export const metadata: Metadata = {
  title: "Profile",
  description,
  alternates: { canonical: "/profile" },
  openGraph: {
    title: `Profile · ${siteConfig.name}`,
    description,
    url: absoluteUrl("/profile"),
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `Profile · ${siteConfig.name}`,
    description,
  },
};

/**
 * Profile route — header with social links, About, Skills,
 * Experience.
 */
export default async function ProfilePage() {
  const profile = await getCurrentProfile();

  const sameAs = [
    facebookUrl(siteConfig.contact.socials.facebook),
    instagramUrl(siteConfig.contact.socials.instagram),
    threadsUrl(siteConfig.contact.socials.threads),
    tiktokUrl(siteConfig.contact.socials.tiktok),
    xUrl(siteConfig.contact.socials.x),
    linkedinUrl(siteConfig.contact.socials.linkedin),
    githubUrl(siteConfig.contact.socials.github),
  ].filter((url): url is string => url !== null);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <JsonLd data={personJsonLd({ socialUrls: sameAs })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Profile", url: absoluteUrl("/profile") },
        ])}
      />

      <ProfileHeader
        profile={profile}
        action={<ProfileSocialLinks profileName={profile.name} />}
      />
      <ProfileAboutSection about={profile.about} />
      <ProfileSkillsSection skills={profile.skills} />
      <ProfileExperienceSection experiences={profile.experiences} />
    </div>
  );
}
