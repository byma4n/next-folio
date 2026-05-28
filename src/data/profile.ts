/**
 * Static profile data.
 *
 * Edit this file to customise the "About me" content shown on the
 * home page and the dedicated `/profile` route. Everything is plain
 * TypeScript so the types in `@/features/profile` will catch typos
 * for you at build time.
 */

import type { Profile } from "@/features/profile";

export const profileData: Profile = {
  id: "me",
  name: "Your Name",
  handle: "yourhandle",
  title: "Full Stack Developer",
  /**
   * Use any image URL. The default uses Unsplash placeholders so the
   * template renders out-of-the-box without bundling a real photo.
   * Replace with `/your-avatar.jpg` after dropping a file in
   * `public/`, or any HTTPS URL that's allowed in
   * `next.config.ts > images.remotePatterns`.
   */
  avatarUrl:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
  coverUrl:
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
  bio: "Building things on the web — pragmatically and with care.",
  location: "Remote",
  verified: true,
  about: [
    "Hi, I'm Your Name — a developer who enjoys turning ideas into shipped products. I work across the stack and care about code that's pleasant to read and easy to maintain.",
    "On the frontend I reach for TypeScript, React, Next.js, and Tailwind CSS. On the backend I'm comfortable with Node.js and PostgreSQL, plus whatever else gets the job done.",
    "When I'm not coding I read, take long walks, and tinker with side projects that may or may not see the light of day.",
  ],
  skills: [
    { name: "TypeScript", category: "Language" },
    { name: "JavaScript", category: "Language" },
    { name: "Python", category: "Language" },
    { name: "Go", category: "Language" },
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "HTML", category: "Frontend" },
    { name: "CSS", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Express", category: "Backend" },
    { name: "REST API", category: "Backend" },
    { name: "GraphQL", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MySQL", category: "Database" },
    { name: "Redis", category: "Database" },
    { name: "React Native", category: "Mobile" },
    { name: "Expo", category: "Mobile" },
    { name: "Docker", category: "Tools" },
    { name: "Git", category: "Tools" },
    { name: "Linux", category: "Tools" },
    { name: "Vercel", category: "Tools" },
    { name: "Figma", category: "Design" },
    { name: "Framer", category: "Design" },
  ],
  experiences: [
    {
      id: "current-role",
      company: "Your Current Company",
      role: "Senior Software Engineer",
      employmentType: "Full-time",
      location: "Remote",
      startDate: "2024-01-01",
      endDate: null,
      description:
        "Working on a product team — ship features end-to-end, mentor juniors, and own the frontend codebase.",
      bullets: [
        "Migrated the dashboard from CRA to Next.js App Router with no user-facing downtime.",
        "Cut median page load by 35% via image and bundle work.",
      ],
      tags: ["Next.js", "TypeScript", "PostgreSQL"],
    },
    {
      id: "previous-role",
      company: "A Previous Company",
      role: "Frontend Engineer",
      employmentType: "Full-time",
      location: "Remote",
      startDate: "2022-03-01",
      endDate: "2023-12-31",
      description:
        "Built customer-facing web apps for an early-stage startup. Wore many hats: design, frontend, light backend.",
      tags: ["React", "TypeScript", "Tailwind"],
    },
    {
      id: "freelance",
      company: "Freelance",
      role: "Web Developer",
      employmentType: "Freelance",
      startDate: "2020-06-01",
      endDate: "2022-02-28",
      description:
        "Helped small businesses ship marketing sites and small web apps.",
    },
  ],
};
