export type TimelineType = "work" | "education" | "award";

export interface TimelineItem {
  id: string;
  type: TimelineType;
  current?: boolean;
  highlight?: boolean;
  tags?: string[];
}

export const timeline: TimelineItem[] = [
  { id: "university", type: "education", current: true },
  {
    id: "freelance",
    type: "work",
    current: true,
    tags: ["Minecraft Plugins", "Discord Bots", "Web"],
  },
  { id: "hackathons", type: "award" },
  {
    id: "internships",
    type: "work",
    tags: ["Flutter", "REST API", "Databases"],
  },
  { id: "erasmus", type: "work", tags: ["SEO", "Erasmus+"] },
  { id: "highschool", type: "education", highlight: true },
];

export const stats = ["downloads", "projects", "rating", "grade"] as const;

export const skills = [
  { id: "backend", items: ["Java", "Kotlin", "PHP", "TypeScript"] },
  { id: "frontend", items: ["React", "HTML", "Tailwind"] },
  { id: "mobile", items: ["React Native", "Flutter"] },
  { id: "frameworks", items: ["Next.js", "Laravel", "Prisma"] },
  { id: "minecraft", items: ["Paper", "NMS", "Velocity", "BungeeCord"] },
  { id: "databases", items: ["MySQL", "Postgres", "MongoDB"] },
  { id: "systems", items: ["GitHub", "Docker"] },
] as const;

export const softSkills = [
  "communication",
  "problemSolving",
  "speaking",
  "driven",
] as const;

export const languages = ["italian", "english"] as const;
