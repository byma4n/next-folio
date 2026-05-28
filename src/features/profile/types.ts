/** Public types for the `profile` feature. */

export type Skill = {
  readonly name: string;
  readonly category?: string;
};

export type EmploymentType =
  | "Full-time"
  | "Part-time"
  | "Freelance"
  | "Contract"
  | "Internship";

export type Experience = {
  readonly id: string;
  readonly company: string;
  readonly role: string;
  readonly employmentType: EmploymentType;
  readonly location?: string;
  /** ISO date — when the role started. */
  readonly startDate: string;
  /** ISO date, or `null` if the role is current. */
  readonly endDate: string | null;
  /** One-paragraph summary of the role. */
  readonly description?: string;
  /** Achievement / responsibility bullets. */
  readonly bullets?: readonly string[];
  /** Tech/tools used in this role. */
  readonly tags?: readonly string[];
  readonly companyUrl?: string;
};

export type Profile = {
  readonly id: string;
  readonly name: string;
  readonly handle: string;
  /** Short occupation/role label. */
  readonly title: string;
  readonly avatarUrl: string;
  readonly coverUrl: string;
  /** Short tagline shown under the handle in the header. */
  readonly bio: string;
  readonly location: string;
  readonly verified?: boolean;
  /** Long-form "About me" content as paragraphs. */
  readonly about: readonly string[];
  /** Skills/tools shown as chips. */
  readonly skills: readonly Skill[];
  /** Work history, newest first. */
  readonly experiences: readonly Experience[];
};
